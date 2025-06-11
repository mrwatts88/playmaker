import { contestIdSchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import {
  contestGames,
  contests,
  gameEvents,
  processedGameEvents,
} from "@/db/schema/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Contests
 *     description: Contest management endpoints
 *
 * /api/contests/{id}/events:
 *   get:
 *     tags: [Contests]
 *     summary: Get latest contest game events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Latest game events
 *       404:
 *         description: Contest events not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Validate contest ID
    const { id } = await context.params;
    const contestIdResult = contestIdSchema.safeParse({ id });
    if (!contestIdResult.success) {
      console.error("Invalid contest ID:", contestIdResult.error);
      return NextResponse.json(
        { error: contestIdResult.error.issues[0].message },
        { status: 400 }
      );
    }

    // Get contest details
    const contest = await db.query.contests.findFirst({
      where: eq(contests.id, id),
    });

    if (!contest) {
      console.error("Contest not found");
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }
    const allContests = await db.query.contestGames.findMany({
      where: eq(contestGames.contestId, id),
    });

    const gameIds: string[] = allContests.map(
      (contestGame) => contestGame.gameId
    );

    if (gameIds.length === 0) {
      return NextResponse.json({
        message: "No games found for this contest",
        latestEvents: [],
      });
    }

    const latestProcessedEvents = await db.query.processedGameEvents.findMany({
      orderBy: [desc(processedGameEvents.processedAt)],
      limit: 3,
    });

    const gameEventIds = latestProcessedEvents.map(
      (event) => event.gameEventId
    );
    const latestEvents = await db.query.gameEvents.findMany({
      where: inArray(gameEvents.id, gameEventIds),
      with: {
        athlete: true,
      },
    });

    return NextResponse.json(latestEvents);
  } catch (error) {
    console.error("Error fetching contest game state:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
