/**
 * NBA Game Events Sync Script
 *
 * This script syncs NBA game events (points, rebounds, assists, steals, blocks) from the NBA stats API
 * for a given game. It performs the following following operations:
 *
 * 1. Fetches play-by-play data from the NBA stats API for the specified game ID
 * 2. For each action in the play-by-play data:
 *    - Maps NBA action types to our game event types (points, rebounds, assists, steals, blocks)
 *    - Creates game events in the database for relevant actions
 *    - Sets appropriate values for each event type (e.g., points scored, number of rebounds)
 *
 * The script handles:
 * - Converting NBA action types to our event types
 * - Setting appropriate values for each event type
 * - Maintaining data consistency with the database schema
 *
 * Usage:
 * npm run nba:sync-game-events GAME_ID
 * Example: npm run nba:sync-game-events 0022300001
 */
import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { gameEvents } from "../../db/schema/schema";

const ALLOWED_ACTION_TYPES = new Set(["3pt", "2pt", "rebound", "steal", "block", "freethrow", "game", "period"]);

async function main() {
  const gameId = process.argv[2];
  if (!gameId) {
    console.error("Please provide a game ID");
    process.exit(1);
  }

  try {
    // First, get the game's UUID from the API ID
    const game = await db.query.games.findFirst({
      where: (games, { eq, and }) => and(eq(games.apiId, gameId), eq(games.dataSource, "nbacom"), eq(games.league, "nba")),
    });

    if (!game) {
      console.error(`Game with API ID ${gameId} not found in database. Please sync the game first using the sync-lineups script.`);
      process.exit(1);
    }

    // Get the latest action number for this game
    const events = await db.query.gameEvents.findMany({
      where: eq(gameEvents.gameId, game.id),
    });

    // Find the highest action number by parsing them as numbers
    const latestActionNumber = events.length > 0 ? Math.max(...events.map((e) => parseInt(e.apiId.split("_")[0]))) : 0;

    console.log(`Latest action number in DB: ${latestActionNumber}`);
    console.log(`Syncing events after action number ${latestActionNumber}`);

    let response;
    try {
      response = await fetch(`https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_${gameId}.json`);
    } catch (error) {
      console.error("Network error while fetching game data from NBA API:", error);
      process.exit(1);
    }

    if (response.status === 404) {
      console.error(`Game ${gameId} not found in NBA API. The game may not exist or may not have started yet.`);
      process.exit(1);
    }

    if (response.status === 403) {
      console.error(`Game ${gameId} has not started yet.`);
      process.exit(1);
    }

    if (!response.ok) {
      console.error(`Failed to fetch game data from NBA API. Status: ${response.status}`);
      process.exit(1);
    }

    const data = await response.json();

    if (!data.game || !data.game.actions) {
      console.error("Invalid response format from NBA API");
      process.exit(1);
    }

    console.log(`Total actions in API response: ${data.game.actions.length}`);
    console.log(`First action number: ${data.game.actions[0]?.actionNumber}`);
    console.log(`Last action number: ${data.game.actions[data.game.actions.length - 1]?.actionNumber}`);

    // Process each action that's newer than our latest event
    for (const action of data.game.actions) {
      if (parseInt(action.actionNumber) <= latestActionNumber) {
        continue;
      }

      console.log(`Processing action ${action.actionNumber} (${action.actionType}) - athlete: ${action.personId || "none"}`);

      // Skip if action type is not in our allowlist
      if (!ALLOWED_ACTION_TYPES.has(action.actionType)) {
        continue;
      }

      // Handle game state events
      if (action.actionType === "game" && action.subType === "end") {
        console.log(`Inserting gameend event for action ${action.actionNumber}`);
        await db
          .insert(gameEvents)
          .values({
            apiId: action.actionNumber.toString(),
            gameId: game.id,
            athleteId: null,
            eventType: "gameend",
            value: 1,
            dataSource: "nbacom",
            league: "nba",
          })
          .onConflictDoNothing();
        continue;
      }

      if (action.actionType === "period" && action.subType === "start" && action.period === 1) {
        console.log(`Inserting gamestart event for action ${action.actionNumber}`);
        await db
          .insert(gameEvents)
          .values({
            apiId: action.actionNumber.toString(),
            gameId: game.id,
            athleteId: null,
            eventType: "gamestart",
            value: 1,
            dataSource: "nbacom",
            league: "nba",
          })
          .onConflictDoNothing();
        continue;
      }

      // Handle shot made events
      if (action.shotResult === "Made") {
        // Create points event
        let pointsValue = 0;
        switch (action.actionType) {
          case "2pt":
            pointsValue = 2;
            break;
          case "3pt":
            pointsValue = 3;
            break;
          case "freethrow":
            pointsValue = 1;
            break;
        }

        if (pointsValue > 0) {
          if (!action.personId) {
            // Handle points event without an athlete
            console.log(`Inserting points event without athlete for action ${action.actionNumber}`);
            await db
              .insert(gameEvents)
              .values({
                apiId: action.actionNumber.toString(),
                gameId: game.id,
                athleteId: null,
                eventType: "points",
                value: pointsValue,
                dataSource: "nbacom",
                league: "nba",
              })
              .onConflictDoNothing();
          } else {
            const athlete = await db.query.athletes.findFirst({
              where: (athletes, { eq, and }) =>
                and(eq(athletes.apiId, action.personId.toString()), eq(athletes.dataSource, "nbacom"), eq(athletes.league, "nba")),
            });

            if (athlete) {
              console.log(`Inserting points event for action ${action.actionNumber}`);
              await db
                .insert(gameEvents)
                .values({
                  apiId: action.actionNumber.toString(),
                  gameId: game.id,
                  athleteId: athlete.id,
                  eventType: "points",
                  value: pointsValue,
                  dataSource: "nbacom",
                  league: "nba",
                })
                .onConflictDoNothing();
            } else {
              console.log(`Skipping points event for action ${action.actionNumber} - athlete ${action.personId} not found`);
            }
          }
        }

        // Create assist event if there's an assist and we have the athlete
        if (action.assistPersonId) {
          const assistAthlete = await db.query.athletes.findFirst({
            where: (athletes, { eq, and }) =>
              and(eq(athletes.apiId, action.assistPersonId.toString()), eq(athletes.dataSource, "nbacom"), eq(athletes.league, "nba")),
          });

          if (assistAthlete) {
            console.log(`Inserting assist event for action ${action.actionNumber}`);
            await db
              .insert(gameEvents)
              .values({
                apiId: `${action.actionNumber}_assist`,
                gameId: game.id,
                athleteId: assistAthlete.id,
                eventType: "assists",
                value: 1,
                dataSource: "nbacom",
                league: "nba",
              })
              .onConflictDoNothing();
          }
        }
      }

      // Handle other event types
      let eventType: "rebounds" | "steals" | "blocks" | null = null;
      let value = 0;

      switch (action.actionType) {
        case "rebound":
          eventType = "rebounds";
          value = 1;
          break;
        case "steal":
          eventType = "steals";
          value = 1;
          break;
        case "block":
          eventType = "blocks";
          value = 1;
          break;
      }

      if (eventType) {
        if (!action.personId) {
          // Handle event without an athlete
          console.log(`Inserting ${eventType} event without athlete for action ${action.actionNumber}`);
          await db
            .insert(gameEvents)
            .values({
              apiId: action.actionNumber.toString(),
              gameId: game.id,
              athleteId: null,
              eventType,
              value,
              dataSource: "nbacom",
              league: "nba",
            })
            .onConflictDoNothing();
        } else {
          const athlete = await db.query.athletes.findFirst({
            where: (athletes, { eq, and }) =>
              and(eq(athletes.apiId, action.personId.toString()), eq(athletes.dataSource, "nbacom"), eq(athletes.league, "nba")),
          });

          if (athlete) {
            console.log(`Inserting ${eventType} event for action ${action.actionNumber}`);
            await db
              .insert(gameEvents)
              .values({
                apiId: action.actionNumber.toString(),
                gameId: game.id,
                athleteId: athlete.id,
                eventType,
                value,
                dataSource: "nbacom",
                league: "nba",
              })
              .onConflictDoNothing();
          } else {
            console.log(`Skipping ${eventType} event for action ${action.actionNumber} - athlete ${action.personId} not found in database`);
          }
        }
      }
    }

    console.log("Game events synced successfully");
  } catch (error) {
    console.error("Error syncing game events:", error);
    process.exit(1);
  }
}

main();
