import { contestIdSchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import { contestantBoosts, contestants, contestGames, contests, gameEvents, teams } from "@/db/schema/schema";
import { and, desc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Contests
 *     description: Contest management endpoints
 *
 * /api/contests/{id}/game:
 *   get:
 *     tags: [Contests]
 *     summary: Get full contest state (polling)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest state including contestants, event feed, and boosts
 *       404:
 *         description: Contest not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Validate contest ID
    const { id } = await context.params;
    const contestIdResult = contestIdSchema.safeParse({ id });
    if (!contestIdResult.success) {
      console.error("Invalid contest ID:", contestIdResult.error);
      return NextResponse.json({ error: contestIdResult.error.issues[0].message }, { status: 400 });
    }

    // Get contest details
    const contest = await db.query.contests.findFirst({
      where: eq(contests.id, id),
    });

    if (!contest) {
      console.error("Contest not found");
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }

    // Get all contestants for this contest
    const contestantList = await db.query.contestants.findMany({
      where: eq(contestants.contestId, id),
    });

    // Get all contest games
    const contestGameList = await db.query.contestGames.findMany({
      where: eq(contestGames.contestId, id),
      with: {
        game: true,
      },
    });

    // Get all game events for these games
    const gameEventList = await db.query.gameEvents.findMany({
      where: and(
        inArray(
          gameEvents.gameId,
          contestGameList.map((cg) => cg.gameId)
        )
      ),
      orderBy: [desc(gameEvents.createdAt)],
      limit: 20,
    });

    // For each contestant, get their team and boosts
    const contestantsWithDetails = await Promise.all(
      contestantList.map(async (contestant) => {
        const [team, currentBoosts] = await Promise.all([
          // Get team
          db.query.teams.findFirst({
            where: eq(teams.id, contestant.teamId),
          }),
          // Get boosts
          db.query.contestantBoosts.findMany({
            where: eq(contestantBoosts.contestantId, contestant.id),
            with: {
              boost: true,
            },
          }),
        ]);

        return {
          ...contestant,
          team,
          currentBoosts: currentBoosts.map((cb) => cb.boost),
        };
      })
    );

    // Construct the response
    const response = {
      ...contest,
      contestants: contestantsWithDetails,
      eventHistory: gameEventList,
      games: contestGameList.map((cg) => cg.game),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching contest game state:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
