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
import {
  contestants,
  contestGames,
  processedGameEvents,
} from "../db/schema/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
console.log(process.env.DATABASE_URL, "dB url");

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

const eventToStatMapping: Record<string, string> = {
  points: "points",
  rebounds: "rebounds",
  assists: "assists",
  steals: "steals",
  blocks: "blocks",
};

interface ProcessedEvent {
  eventId: string;
  contestantId: string;
}

export async function calculateContestantXP(
  gameId: string,
  eventToProcess: number
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

    const alreadyProcessedEvents = await db.query.processedGameEvents.findMany({
      where: (pge, { eq }) => eq(pge.gameId, gameId),
    });

    const processedGameEventIds = new Set(
      alreadyProcessedEvents.map((pe) => pe.gameEventId)
    );

    const allGameEvents = await db.query.gameEvents.findMany({
      where: (ge, { eq, and, notInArray, ne }) =>
        and(
          eq(ge.gameId, gameId),
          ne(ge.eventType, "gamestart"),
          processedGameEventIds.size > 0
            ? notInArray(ge.id, Array.from(processedGameEventIds))
            : undefined
        ),
      orderBy: (ge, { asc }) => [asc(ge.createdAt), asc(ge.id)], // Ensure consistent ordering
    });

    console.log(
      `Found ${allGameEvents.length} unprocessed game events for game ID ${gameId}`
    );

    if (allGameEvents.length === 0) {
      console.log(`No unprocessed game events found for game ID ${gameId}`);
      return {
        processed: 0,
        remaining: 0,
        totalXpAwarded: 0,
      };
    }

    const eventsToProcess = allGameEvents.slice(0, eventToProcess);
    console.log(
      `Processing ${eventsToProcess.length} events out of ${allGameEvents.length} available`
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

    let totalXpAwarded = 0;

    for (const gameEvent of eventsToProcess) {
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
      console.log(gameEvent, "single game Event");

      const athlete = gameEvent?.athleteId
        ? athleteMap.get(gameEvent?.athleteId)
        : null;
      // if (!athlete) {
      //   continue;
      // }
      console.log(athlete, "athlete");

      const correspondingStat = eventToStatMapping[gameEvent.eventType];

      for (const contestant of allContestants) {
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
        const contestWithGame = contestsWithGame.find(
          (cg) => cg.contestId === contestant.contestId
        );
        if (!contestWithGame) {
          continue;
        }

        if (contestant.teamId !== athlete?.teamId) {
          continue;
        }

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
            cb.boost.name === athlete?.name &&
            cb.boost.stat === correspondingStat
        );

        if (athlete && athleteBoost) {
          const boostValue =
            parseFloat((athleteBoost.boost.value ?? "").toString()) || 0;
          const xpToAdd = boostValue * (gameEvent.value ?? 1);
          totalXpForEvent += xpToAdd;
          console.log(
            `Adding ${xpToAdd} XP to contestant ${contestant.id} for athlete boost on ${gameEvent.eventType}, athlete name is ${athleteBoost.boost.name} with event id ${gameEvent.id}`
          );
        }

        xpUpdates[contestant.id] += totalXpForEvent;
        totalXpAwarded += totalXpForEvent;
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

    const remainingEvents = allGameEvents.length - eventsToProcess.length;

    console.log(
      `XP calculations completed. Processed: ${eventsToProcess.length} events, Remaining: ${remainingEvents} events, Total XP awarded: ${totalXpAwarded}`
    );

    return {
      processed: eventsToProcess.length,
      remaining: remainingEvents,
      totalXpAwarded: totalXpAwarded,
      processedEventContestantCombinations: processedEvents.length,
    };
  } catch (error) {
    console.error("Error calculating contestant XP:", error);
    throw error;
  }
}
