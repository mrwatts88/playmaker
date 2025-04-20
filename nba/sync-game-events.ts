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
import { db } from "../db/db";
import { athletes, gameEvents } from "../db/schema/schema";

const ALLOWED_ACTION_TYPES = new Set(["3pt", "2pt", "rebound", "steal", "block", "freethrow", "game", "period"]);

async function main() {
  const gameId = process.argv[2];
  if (!gameId) {
    console.error("Please provide a game ID");
    process.exit(1);
  }

  try {
    // Get the latest action number for this game
    const events = await db.query.gameEvents.findMany({
      where: eq(gameEvents.gameId, gameId),
    });

    // Find the highest action number by parsing them as numbers
    const latestActionNumber = events.length > 0 ? Math.max(...events.map((e) => parseInt(e.id.split("_")[0]))) : 0;

    console.log(`Latest action number in DB: ${latestActionNumber}`);
    console.log(`Syncing events after action number ${latestActionNumber}`);

    const response = await fetch(`https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_${gameId}.json`);
    const data = await response.json();

    if (!data.game || !data.game.actions) {
      console.error("Invalid response format");
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
            gameId,
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
            gameId,
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
          const athleteExists = action.personId
            ? await db.query.athletes.findFirst({
                where: eq(athletes.id, action.personId.toString()),
              })
            : true;

          if (athleteExists) {
            console.log(`Inserting points event for action ${action.actionNumber}`);
            await db
              .insert(gameEvents)
              .values({
                apiId: action.actionNumber.toString(),
                gameId,
                athleteId: action.personId ? action.personId.toString() : null,
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

        // Create assist event if there's an assist and we have the athlete
        if (action.assistPersonId) {
          const assistAthleteExists = await db.query.athletes.findFirst({
            where: eq(athletes.id, action.assistPersonId.toString()),
          });

          if (assistAthleteExists) {
            console.log(`Inserting assist event for action ${action.actionNumber}`);
            await db
              .insert(gameEvents)
              .values({
                apiId: `${action.actionNumber}_assist`,
                gameId,
                athleteId: action.assistPersonId.toString(),
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
        const athleteExists = action.personId
          ? await db.query.athletes.findFirst({
              where: eq(athletes.id, action.personId.toString()),
            })
          : true;

        if (athleteExists) {
          console.log(`Inserting ${eventType} event for action ${action.actionNumber}`);
          await db
            .insert(gameEvents)
            .values({
              apiId: action.actionNumber.toString(),
              gameId,
              athleteId: action.personId ? action.personId.toString() : null,
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

    console.log("Game events synced successfully");
  } catch (error) {
    console.error("Error syncing game events:", error);
    process.exit(1);
  }
}

main();
