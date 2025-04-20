import { config } from "dotenv";
config();

import { db } from "@/db/db";
import { contestGames, contests, games, teams } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

const baseUrl = "https://cdn.nba.com/static/json/liveData";

// https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_0022000180.json
const playByPlayUrl = (gameId: string) => `${baseUrl}/playbyplay/playbyplay_${gameId}.json`;

// https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json
const todayScoreboardUrl = `${baseUrl}/scoreboard/todaysScoreboard_00.json`;

interface NBATeam {
  teamId: number;
  teamName: string;
}

interface NBAGame {
  gameId: string;
  gameStatus: number;
  gameStatusText: string;
  gameTimeUTC: string;
  homeTeam: NBATeam;
  awayTeam: NBATeam;
}

interface NBAScoreboard {
  scoreboard: {
    games: NBAGame[];
  };
}

const getGameStatus = (gameStatus: number): "upcoming" | "active" | "completed" => {
  // NBA API status codes:
  // 1 = Not Started
  // 2 = In Progress
  // 3 = Final
  if (gameStatus === 2) return "active";
  if (gameStatus === 3) return "completed";
  return "upcoming";
};

const isInTimeSlot = (utcTime: string, startHour: number, endHour: number): boolean => {
  const date = new Date(utcTime);
  // Convert UTC to CT by subtracting 6 hours
  const centralTime = new Date(date.getTime() - 6 * 60 * 60 * 1000);

  // Get hours and minutes in CT
  const hour = centralTime.getUTCHours();
  const minutes = centralTime.getUTCMinutes();
  const totalMinutes = hour * 60 + minutes;

  const startMinutes = startHour * 60 + 30;
  const endMinutes = endHour * 60 + 30;

  console.log(`Game time (CT): ${hour}:${minutes}`);
  console.log(`Total minutes: ${totalMinutes}`);
  console.log(`Slot range: ${startMinutes} to ${endMinutes}`);
  console.log(`In slot: ${totalMinutes >= startMinutes && totalMinutes < endMinutes}`);

  return totalMinutes >= startMinutes && totalMinutes < endMinutes;
};

const upsertContests = async () => {
  try {
    const response = await fetch(todayScoreboardUrl);
    const data: NBAScoreboard = await response.json();

    // Group games by time slot
    const earlyGames: NBAGame[] = [];
    const lateGames: NBAGame[] = [];

    console.log("data.scoreboard.games.length", data.scoreboard.games.length);
    console.log(
      "Game statuses:",
      data.scoreboard.games.map((g) => ({ status: g.gameStatus, time: g.gameTimeUTC }))
    );

    // Sort by start time ascending (aka earliest game first)
    const sortedFilteredGames = data.scoreboard.games
      .filter((g) => g.gameStatus !== 3)
      .sort((a, b) => new Date(a.gameTimeUTC).getTime() - new Date(b.gameTimeUTC).getTime());

    console.log("sortedFilteredGames.length", sortedFilteredGames.length);

    /* Insert teams if they don't exist. Do we want to keep this long term? */
    // First, collect all unique teams
    const uniqueTeams = new Set<NBATeam>();
    for (const game of sortedFilteredGames) {
      uniqueTeams.add(game.homeTeam);
      uniqueTeams.add(game.awayTeam);
    }

    // Insert teams if they don't exist
    for (const team of uniqueTeams) {
      await db
        .insert(teams)
        .values({
          id: team.teamId.toString(),
          name: team.teamName,
          league: "nba",
        })
        .onConflictDoNothing();
    }
    /* End of insert teams if they don't exist */

    for (const game of sortedFilteredGames) {
      // 3 = completed so we don't want to include them
      if (isInTimeSlot(game.gameTimeUTC, 17, 20)) {
        earlyGames.push(game);
      } else if (isInTimeSlot(game.gameTimeUTC, 20, 22)) {
        lateGames.push(game);
      }
    }

    console.log("earlyGames.length", earlyGames.length);
    console.log("lateGames.length", lateGames.length);

    // Create contests and games for each time slot
    if (earlyGames.length > 0) {
      await createContestWithGames("Early Evening NBA Games", earlyGames);
    }

    if (lateGames.length > 0) {
      await createContestWithGames("Late Evening NBA Games", lateGames);
    }
  } catch (error) {
    console.error("Error upserting contests:", error);
  }
};

const createContestWithGames = async (contestName: string, nbaGames: NBAGame[]) => {
  // Check if game already exists, this means we've already ran the script for this day
  const existingGames = await db.query.games.findMany({
    where: eq(games.id, nbaGames[0].gameId),
  });

  if (existingGames.length > 0) {
    console.log("Games already exist for today, skipping contest creation");
    return;
  }

  console.log("creating contest");

  // Create contest
  const [contest] = await db
    .insert(contests)
    .values({
      name: contestName,
      league: "nba",
      status: nbaGames.some((game) => game.gameStatus === 2) ? "active" : "upcoming",
      startTime: new Date(nbaGames[0].gameTimeUTC),
    })
    .returning();

  // Create games and contest games
  for (const nbaGame of nbaGames) {
    console.log("creating game");
    const [gameRecord] = await db
      .insert(games)
      .values({
        id: nbaGame.gameId,
        name: `${nbaGame.awayTeam.teamName} @ ${nbaGame.homeTeam.teamName}`,
        startTime: new Date(nbaGame.gameTimeUTC),
        status: getGameStatus(nbaGame.gameStatus),
        homeTeamId: nbaGame.homeTeam.teamId.toString(),
        awayTeamId: nbaGame.awayTeam.teamId.toString(),
      })
      .returning();

    console.log("creating contest game");
    // Create contest game
    await db.insert(contestGames).values({
      gameId: gameRecord.id,
      contestId: contest.id,
    });
  }
};

upsertContests().then(() => {
  console.log("upsertContests done");
});
