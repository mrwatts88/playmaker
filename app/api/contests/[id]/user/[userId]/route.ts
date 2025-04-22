import { enterContestSchema } from "@/app/api/schemas";
import { leagueStatPower, startingContestantXp } from "@/constants/statPower";
import { db } from "@/db/db";
import { contestants, contests, users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Contests
 *     description: Contest management endpoints
 *
 * /api/contests/{id}/user/{userId}:
 *   post:
 *     tags: [Contests]
 *     summary: Enter a contest
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Contestant created
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contest or user not found
 *       500:
 *         description: Internal Server Error
 */
export async function POST(request: Request, context: { params: Promise<{ id: string; userId: string }> }) {
  const { id, userId } = await context.params;
  const result = enterContestSchema.safeParse({ id, userId });

  if (!result.success) {
    console.error("Invalid request parameters");
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  try {
    // Check if contest exists and is joinable
    const contest = await db.query.contests.findFirst({
      where: eq(contests.id, result.data.id),
    });

    if (!contest) {
      console.error("Contest not found");
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }

    if (contest.status !== "upcoming") {
      console.error("Contest is not joinable");
      return NextResponse.json({ error: "Contest is not joinable" }, { status: 400 });
    }

    // Check if user exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, result.data.userId),
    });

    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create contestant - let the unique constraint handle duplicates
    const [contestant] = await db
      .insert(contestants)
      .values({
        userId: result.data.userId,
        name: user.name,
        contestId: result.data.id,
        totalXp: startingContestantXp,
        spendableXp: startingContestantXp,
        statPower: leagueStatPower[contest.league],
      })
      .returning();

    return NextResponse.json(contestant, { status: 201 });
  } catch (error) {
    // Check if error is due to unique constraint violation
    if (error instanceof Error && error.message.includes("unique constraint")) {
      return NextResponse.json({ error: "User already in this contest" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
