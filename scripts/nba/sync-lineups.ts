/**
 * NBA Lineups Sync Script
 *
 * This script syncs NBA teams, players, and games from the NBA stats API for a given date.
 * It performs the following operations:
 *
 * 1. Fetches lineup data from the NBA stats API for the specified date
 * 2. For each game in the lineup data:
 *    - Creates/updates teams in the database if they don't exist
 *    - Creates/updates players in the database if they don't exist (only starters are synced)
 *    - Creates/updates games in the database if they don't exist
 *
 * The script handles:
 * - Skipping completed games
 * - Parsing game times from status text
 * - Setting appropriate game statuses (upcoming/active/completed)
 * - Maintaining data consistency with the database schema
 *
 * Note: All game times are stored in Eastern Time (ET) as per NBA standard.
 *
 * Usage:
 * npm run nba:sync-lineups YYYYMMDD
 * Example: npm run nba:sync-lineups 20250419
 *
 * Note: The script requires a valid NBA stats API endpoint and proper database configuration.
 */
import { config } from "dotenv";
config();

import { db } from "@/db/db";
import { athletes, games, teams } from "@/db/schema/schema";

interface NBAPlayer {
  personId: number;
  teamId: number;
  firstName: string;
  lastName: string;
  playerName: string;
  lineupStatus: string;
  position: string;
  rosterStatus: "Active" | "Inactive";
  timestamp: string;
}

interface NBATeam {
  teamId: number;
  teamAbbreviation: string;
  players: NBAPlayer[];
}

interface NBAGame {
  gameId: string;
  gameStatus: number;
  gameStatusText: string;
  homeTeam: NBATeam;
  awayTeam: NBATeam;
}

interface NBALineupsResponse {
  games: NBAGame[];
}

const getGameStatus = (
  gameStatus: number
): "upcoming" | "active" | "completed" => {
  // NBA API status codes:
  // 1 = Not Started
  // 2 = In Progress
  // 3 = Final
  if (gameStatus === 2) return "active";
  if (gameStatus === 3) return "completed";
  return "upcoming";
};

const parseGameTime = (statusText: string, gameDate: string): Date | null => {
  // Example: "1:00 pm ET"
  const match = statusText.match(/(\d+):(\d+)\s+(am|pm)\s+ET/);
  if (!match) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, hours, minutes, period] = match;
  let hour = parseInt(hours);
  if (period === "pm" && hour !== 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;

  // Parse the game date (YYYYMMDD)
  const year = parseInt(gameDate.substring(0, 4));
  const month = parseInt(gameDate.substring(4, 6)) - 1; // JavaScript months are 0-indexed
  const day = parseInt(gameDate.substring(6, 8));

  // Create date in ET
  const date = new Date(
    Date.UTC(year, month, day, hour + 4, parseInt(minutes), 0, 0)
  ); // ET is UTC-4
  return date;
};

export const syncLineups = async (date: string) => {
  try {
    const url = `https://stats.nba.com/js/data/leaders/00_daily_lineups_${date}.json`;
    const response = await fetch(url);
    const data: NBALineupsResponse = await response.json();

    // Process each game
    for (const game of data.games) {
      // Skip if game is final or doesn't have a valid start time
      if (
        game.gameStatus === 3 ||
        !game.gameStatusText ||
        game.gameStatusText.includes("Final")
      ) {
        console.log(`Skipping game ${game.gameId} - ${game.gameStatusText}`);
        continue;
      }

      const startTime = parseGameTime(game.gameStatusText, date);
      if (!startTime) {
        console.log(
          `Skipping game ${game.gameId} - invalid start time: ${game.gameStatusText}`
        );
        continue;
      }

      // Create teams if they don't exist and get their UUIDs
      const teamUuids: Record<number, string> = {};
      for (const team of [game.homeTeam, game.awayTeam]) {
        const [dbTeam] = await db
          .insert(teams)
          .values({
            apiId: team.teamId.toString(),
            name: team.teamAbbreviation,
            league: "nba",
            dataSource: "nbacom",
          })
          .onConflictDoNothing()
          .returning();

        if (dbTeam) {
          teamUuids[team.teamId] = dbTeam.id;
        } else {
          // If team already exists, get its UUID
          const existingTeam = await db.query.teams.findFirst({
            where: (teams, { eq, and }) =>
              and(
                eq(teams.apiId, team.teamId.toString()),
                eq(teams.league, "nba"),
                eq(teams.dataSource, "nbacom")
              ),
          });
          if (existingTeam) {
            teamUuids[team.teamId] = existingTeam.id;
          }
        }

        // Create players if they don't exist
        for (const player of team.players) {
          await db
            .insert(athletes)
            .values({
              apiId: player.personId.toString(),
              name: player.playerName,
              teamId: teamUuids[team.teamId],
              position: player.position || "",
              dataSource: "nbacom",
              league: "nba",
            })
            .onConflictDoNothing();
        }
      }

      // Create game if it doesn't exist
      await db
        .insert(games)
        .values({
          apiId: game.gameId,
          name: `${game.awayTeam.teamAbbreviation} @ ${game.homeTeam.teamAbbreviation}`,
          startTime,
          status: getGameStatus(game.gameStatus),
          homeTeamId: teamUuids[game.homeTeam.teamId],
          awayTeamId: teamUuids[game.awayTeam.teamId],
          dataSource: "nbacom",
          league: "nba",
        })
        .onConflictDoNothing();
    }

    console.log(`Successfully synced lineups for ${date}`);
  } catch (error) {
    console.error("Error syncing lineups:", error);
    throw error;
  }
};

// Get date from command line arguments
const date = process.argv[2];
if (!date) {
  console.error("Please provide a date in YYYYMMDD format");
  process.exit(1);
}

// Validate date format
if (!/^\d{8}$/.test(date)) {
  console.error("Date must be in YYYYMMDD format");
  process.exit(1);
}

syncLineups(date)
  .then(() => {
    console.log("Done");
  })
  .catch((error) => {
    console.error("Failed to sync lineups:", error);
    process.exit(1);
  });
