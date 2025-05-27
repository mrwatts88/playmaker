/**
 * NBA Game Events Sync Script
 *
 * This script syncs NBA game events (points, rebounds, assists, steals, blocks) from the NBA stats API
 * for a given game and calculates XP for contestants based on these events.
 *
 * It performs the following operations:
 *
 * 1. Fetches play-by-play data from the NBA stats API for the specified game ID
 * 2. For each action in the play-by-play data:
 *    - Maps NBA action types to our game event types (points, rebounds, assists, steals, blocks)
 *    - Creates game events in the database for relevant actions
 *    - Sets appropriate values for each event type (e.g., points scored, number of rebounds)
 * 3. Calculates and updates contestant XP based on:
 *    - Contestant's enrolled game
 *    - Contestant's team
 *    - Contestant's active boosts (team and athlete types)
 *    - Game events matching the contestant's interests
 *
 * The script tracks processed events to prevent duplicate XP calculations on subsequent runs.
 *
 * Usage:
 * npm run nba:sync-game-events GAME_ID
 * Example: npm run nba:sync-game-events 0022300001
 */
import { eq, and, inArray } from "drizzle-orm";
import { db } from "../../db/db";
import {
  gameEvents,
  contestants,
  contestGames,
  processedGameEvents,
} from "../../db/schema/schema";

// Mapping of event types to stat types for XP calculations
const eventToStatMapping: Record<string, string> = {
  points: "points",
  rebounds: "rebounds",
  assists: "assists",
  steals: "steals",
  blocks: "blocks",
};

const ALLOWED_ACTION_TYPES = new Set([
  "3pt",
  "2pt",
  "rebound",
  "steal",
  "block",
  "freethrow",
  "game",
  "period",
]);

// Track processed events to avoid duplicate XP calculations
interface ProcessedEvent {
  eventId: string;
  contestantId: string;
}

async function main() {
  const gameId = process.argv[2];
  if (!gameId) {
    console.error("Please provide a game ID");
    process.exit(1);
  }

  try {
    // First, get the game's UUID from the API ID
    const game = await db.query.games.findFirst({
      where: (games, { eq, and }) =>
        and(
          eq(games.apiId, gameId),
          eq(games.dataSource, "nbacom"),
          eq(games.league, "nba")
        ),
    });

    if (!game) {
      console.error(
        `Game with API ID ${gameId} not found in database. Please sync the game first using the sync-lineups script.`
      );
      process.exit(1);
    }

    // Get the latest action number for this game
    const events = await db.query.gameEvents.findMany({
      where: eq(gameEvents.gameId, game.id),
    });

    // Find the highest action number by parsing them as numbers
    const latestActionNumber =
      events.length > 0
        ? Math.max(...events.map((e) => parseInt(e.apiId.split("_")[0])))
        : 0;

    console.log(`Latest action number in DB: ${latestActionNumber}`);
    console.log(`Syncing events after action number ${latestActionNumber}`);

    let response;
    try {
      response = await fetch(
        `https://cdn.nba.com/static/json/liveData/playbyplay/playbyplay_${gameId}.json`
      );
    } catch (error) {
      console.error(
        "Network error while fetching game data from NBA API:",
        error
      );
      process.exit(1);
    }

    if (response.status === 404) {
      console.error(
        `Game ${gameId} not found in NBA API. The game may not exist or may not have started yet.`
      );
      process.exit(1);
    }

    if (response.status === 403) {
      console.error(`Game ${gameId} has not started yet.`);
      process.exit(1);
    }

    if (!response.ok) {
      console.error(
        `Failed to fetch game data from NBA API. Status: ${response.status}`
      );
      process.exit(1);
    }

    const data = await response.json();

    if (!data.game || !data.game.actions) {
      console.error("Invalid response format from NBA API");
      process.exit(1);
    }

    console.log(`Total actions in API response: ${data.game.actions.length}`);
    console.log(`First action number: ${data.game.actions[0]?.actionNumber}`);
    console.log(
      `Last action number: ${
        data.game.actions[data.game.actions.length - 1]?.actionNumber
      }`
    );

    // Process each action that's newer than our latest event
    const newGameEvents: (typeof gameEvents.$inferSelect)[] = [];

    for (const action of data.game.actions) {
      if (parseInt(action.actionNumber) <= latestActionNumber) {
        continue;
      }

      console.log(
        `Processing action ${action.actionNumber} (${
          action.actionType
        }) - athlete: ${action.personId || "none"}`
      );

      // Skip if action type is not in our allowlist
      if (!ALLOWED_ACTION_TYPES.has(action.actionType)) {
        continue;
      }

      // Handle game state events
      if (action.actionType === "game" && action.subType === "end") {
        console.log(
          `Inserting gameend event for action ${action.actionNumber}`
        );
        const result = await db
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
          .onConflictDoNothing()
          .returning();

        if (result.length > 0) {
          newGameEvents.push(result[0]);
        }
        continue;
      }

      if (
        action.actionType === "period" &&
        action.subType === "start" &&
        action.period === 1
      ) {
        console.log(
          `Inserting gamestart event for action ${action.actionNumber}`
        );
        const result = await db
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
          .onConflictDoNothing()
          .returning();

        if (result.length > 0) {
          newGameEvents.push(result[0]);
        }
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
            console.log(
              `Inserting points event without athlete for action ${action.actionNumber}`
            );
            const result = await db
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
              .onConflictDoNothing()
              .returning();

            if (result.length > 0) {
              newGameEvents.push(result[0]);
            }
          } else {
            const athlete = await db.query.athletes.findFirst({
              where: (athletes, { eq, and }) =>
                and(
                  eq(athletes.apiId, action.personId.toString()),
                  eq(athletes.dataSource, "nbacom"),
                  eq(athletes.league, "nba")
                ),
            });

            if (athlete) {
              console.log(
                `Inserting points event for action ${action.actionNumber}`
              );
              const result = await db
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
                .onConflictDoNothing()
                .returning();

              if (result.length > 0) {
                newGameEvents.push(result[0]);
              }
            } else {
              console.log(
                `Skipping points event for action ${action.actionNumber} - athlete ${action.personId} not found`
              );
            }
          }
        }

        // Create assist event if there's an assist and we have the athlete
        if (action.assistPersonId) {
          const assistAthlete = await db.query.athletes.findFirst({
            where: (athletes, { eq, and }) =>
              and(
                eq(athletes.apiId, action.assistPersonId.toString()),
                eq(athletes.dataSource, "nbacom"),
                eq(athletes.league, "nba")
              ),
          });

          if (assistAthlete) {
            console.log(
              `Inserting assist event for action ${action.actionNumber}`
            );
            const result = await db
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
              .onConflictDoNothing()
              .returning();

            if (result.length > 0) {
              newGameEvents.push(result[0]);
            }
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
          console.log(
            `Inserting ${eventType} event without athlete for action ${action.actionNumber}`
          );
          const result = await db
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
            .onConflictDoNothing()
            .returning();

          if (result.length > 0) {
            newGameEvents.push(result[0]);
          }
        } else {
          const athlete = await db.query.athletes.findFirst({
            where: (athletes, { eq, and }) =>
              and(
                eq(athletes.apiId, action.personId.toString()),
                eq(athletes.dataSource, "nbacom"),
                eq(athletes.league, "nba")
              ),
          });

          if (athlete) {
            console.log(
              `Inserting ${eventType} event for action ${action.actionNumber}`
            );
            const result = await db
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
              .onConflictDoNothing()
              .returning();

            if (result.length > 0) {
              newGameEvents.push(result[0]);
            }
          } else {
            console.log(
              `Skipping ${eventType} event for action ${action.actionNumber} - athlete ${action.personId} not found in database`
            );
          }
        }
      }
    }

    // Calculate XP for contestants based on new game events
    if (newGameEvents.length > 0) {
      console.log(
        `Processing XP calculations for ${newGameEvents.length} new game events`
      );
      await calculateContestantXP(game.id, newGameEvents);
    } else {
      console.log("No new game events to process for XP calculations");
    }

    console.log(
      "Game events synced and XP calculations completed successfully"
    );
  } catch (error) {
    console.error("Error syncing game events:", error);
    process.exit(1);
  }
}

/**
 * Calculate and update XP for contestants based on game events
 *
 * @param gameId - UUID of the game
 * @param newGameEvents - Array of newly processed game events
 */
async function calculateContestantXP(
  gameId: string,
  newGameEvents: (typeof gameEvents.$inferSelect)[]
) {
  try {
    const contestsWithGame = await db.query.contestGames.findMany({
      where: eq(contestGames.gameId, gameId),
      with: {
        contest: true,
      },
    });

    if (contestsWithGame.length === 0) {
      console.log(`No contests found for game ID ${gameId}`);
      return;
    }

    const contestIds = contestsWithGame.map((cg) => cg.contestId);
    console.log(
      `Found ${
        contestIds.length
      } contests for game ID ${gameId}: ${contestIds.join(", ")}`
    );

    // Get all contestants for these contests
    const allContestants = await db.query.contestants.findMany({
      where: inArray(contestants.contestId, contestIds),
    });

    if (allContestants.length === 0) {
      console.log(`No contestants found for the contests`);
      return;
    }

    console.log(
      `Found ${allContestants.length} contestants to process for XP calculations`
    );

    const now = new Date();
    const contestantBoostsData = await db.query.contestantBoosts.findMany({
      where: (cb, { inArray, or, isNull, gt }) =>
        and(
          inArray(
            cb.contestantId,
            allContestants.map((c) => c.id)
          ),
          or(isNull(cb.expiresAt), gt(cb.expiresAt, now))
        ),
      with: {
        boost: true,
        contestant: true,
      },
    });

    const athletesData = await db.query.athletes.findMany({
      where: (a, { eq }) => eq(a.league, "nba"),
      with: {
        team: true,
      },
    });

    const athleteMap = new Map(
      athletesData.map((athlete) => [athlete.id, athlete])
    );

    const alreadyProcessedEvents = await db.query.processedGameEvents.findMany({
      where: (pge, { eq }) => eq(pge.gameId, gameId),
    });

    const processedSet = new Set(
      alreadyProcessedEvents.map((pe) => `${pe.gameEventId}-${pe.contestantId}`)
    );

    const processedEvents: ProcessedEvent[] = [];
    const xpUpdates: Record<string, number> = {};
    const newProcessedGameEvents: {
      gameEventId: string;
      contestantId: string;
      gameId: string;
      processedAt: Date;
    }[] = [];

    for (const gameEvent of newGameEvents) {
      if (
        !gameEvent.eventType ||
        !eventToStatMapping[gameEvent.eventType] ||
        (gameEvent.eventType !== "points" &&
          gameEvent.eventType !== "rebounds" &&
          gameEvent.eventType !== "assists" &&
          gameEvent.eventType !== "steals" &&
          gameEvent.eventType !== "blocks")
      ) {
        continue;
      }

      const athlete = gameEvent.athleteId
        ? athleteMap.get(gameEvent.athleteId)
        : null;
      if (!athlete) {
        continue;
      }

      const correspondingStat = eventToStatMapping[gameEvent.eventType];

      for (const contestant of allContestants) {
        const contestWithGame = contestsWithGame.find(
          (cg) => cg.contestId === contestant.contestId
        );
        if (!contestWithGame) {
          continue;
        }

        if (contestant.teamId !== athlete.teamId) {
          continue; 
        }

        const processedKey = `${gameEvent.id}-${contestant.id}`;
        if (processedSet.has(processedKey)) {
          console.log(
            `Skipping already processed event ${gameEvent.id} for contestant ${contestant.id}`
          );
          continue;
        }

        processedEvents.push({
          eventId: gameEvent.id,
          contestantId: contestant.id,
        });

        newProcessedGameEvents.push({
          gameEventId: gameEvent.id,
          contestantId: contestant.id,
          gameId: gameId,
          processedAt: new Date(),
        });

        if (!xpUpdates[contestant.id]) {
          xpUpdates[contestant.id] = 0;
        }

        let totalXpForEvent = 0;

        const teamBoosts = contestantBoostsData.find(
          (cb) =>
            cb.contestantId === contestant.id &&
            cb.boost.type === "team" &&
            cb.boost.stat === correspondingStat
        );

        if (teamBoosts) {
          const boostValue =
            parseFloat(teamBoosts?.boost.value ?? "".toString()) || 0;
          const xpToAdd = boostValue * (gameEvent.value ?? 1);
          totalXpForEvent += xpToAdd;
          console.log(
            `Adding ${xpToAdd} XP to contestant ${contestant.id} for team boost on ${gameEvent.eventType} event id ${gameEvent.id}`
          );
        }

        const athleteBoost = contestantBoostsData.find(
          (cb) =>
            cb.contestantId === contestant.id &&
            cb.boost.type === "athlete" &&
            cb.boost.name === athlete.name &&
            cb.boost.stat === correspondingStat
        );

        if (athleteBoost) {
          const boostValue =
            parseFloat((athleteBoost.boost.value ?? "").toString()) || 0;
          const xpToAdd = boostValue * (gameEvent.value ?? 1);
          totalXpForEvent += xpToAdd;
          console.log(
            `Adding ${xpToAdd} XP to contestant ${contestant.id} for athlete boost on ${gameEvent.eventType}, athlete name is ${athleteBoost.boost.name} with event id ${gameEvent.id}`
          );
        }

        xpUpdates[contestant.id] += totalXpForEvent;
      }
    }

    if (newProcessedGameEvents.length > 0) {
      console.log(
        `Recording ${newProcessedGameEvents.length} new processed event records`
      );
      await db.insert(processedGameEvents).values(newProcessedGameEvents);
    }

    for (const [contestantId, xpToAdd] of Object.entries(xpUpdates)) {
      if (xpToAdd > 0) {
        console.log(`Updating contestant ${contestantId} with ${xpToAdd} XP`);
        const currentContestant = await db.query.contestants.findFirst({
          where: eq(contestants.id, contestantId),
        });

        if (currentContestant) {
          await db
            .update(contestants)
            .set({
              totalXp: currentContestant.totalXp + xpToAdd,
              spendableXp: currentContestant.spendableXp + xpToAdd,
              updatedAt: new Date(),
            })
            .where(eq(contestants.id, contestantId));
        }
      }
    }

    console.log(
      `XP calculations completed for ${processedEvents.length} event-contestant combinations`
    );
  } catch (error) {
    console.error("Error calculating contestant XP:", error);
    throw error;
  }
}

main();
