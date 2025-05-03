import { contestIdSchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import { contestGames, contests } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Contests
 *     description: Contest management endpoints
 *
 * /api/contests/{id}/draftable-athletes:
 *   get:
 *     tags: [Contests]
 *     summary: Get draftable athletes for a contest
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of teams
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

    // Check if contest exists
    const contest = await db.query.contests.findFirst({
      where: eq(contests.id, id),
    });

    if (!contest) {
      console.error("Contest not found");
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }

    // get all teams for the contest. contest has games with have a hometeam and away team reference
    const contestGamesWithGamesWithTeams = await db.query.contestGames.findMany({
      where: eq(contestGames.contestId, id),
      with: {
        game: {
          with: {
            homeTeam: true,
            awayTeam: true,
          },
        },
      },
    });

    const teams = contestGamesWithGamesWithTeams
      .map((cg) => {
        return [cg.game.homeTeam, cg.game.awayTeam];
      })
      .flatMap((t) => t);

    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching draftable athletes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
