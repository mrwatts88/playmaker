import { db } from "@/db/db";
import {
  athletes,
  boosts,
  contestantBoosts,
  contestants,
} from "@/db/schema/schema";
import { and, eq, inArray, ne, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Contestants
 *     description: Contestant management endpoints
 *
 * /api/contestants/{id}/boost:
 *   get:
 *     tags: [Contestants]
 *     summary: Get full contestant state (polling)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contestant info
 *       404:
 *         description: Contestant not found
 *       500:
 *         description: Internal Server Error
 */

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const contestant = await db.query.contestants.findFirst({
      where: eq(contestants.id, id),
    });

    if (!contestant) {
      return NextResponse.json(
        { error: "Contestant not found" },
        { status: 404 }
      );
    }
    const teamAthletes = await db.query.athletes.findMany({
      where: eq(athletes.teamId, contestant.teamId),
      columns: {
        name: true,
      },
    });

    const athleteNames = teamAthletes.map((athlete) => athlete.name);

    let athleteBoosts: (typeof boosts.$inferSelect)[] = [];

    if (athleteNames.length > 0) {
      athleteBoosts = await db.query.boosts.findMany({
        where: and(
          eq(boosts.type, "athlete"),
          inArray(boosts.name, athleteNames)
        ),
        orderBy: sql`RANDOM()`,
        limit: 3,
      });
    }

    const teamBoosts = await db.query.boosts.findMany({
      where: and(eq(boosts.type, "team"), ne(boosts.cost, 0)),
      orderBy: sql`RANDOM()`,
      limit: 6 - athleteBoosts.length,
    });

    const randomBoosts = [...teamBoosts, ...athleteBoosts];

    return NextResponse.json(randomBoosts);
  } catch (error) {
    console.error("Error fetching random boosts:", error);
    return NextResponse.json(
      { error: "Failed to fetch random boosts" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { boostId } = body;

    if (!boostId) {
      return NextResponse.json(
        { error: "boostId is required in request body" },
        { status: 400 }
      );
    }

    const contestant = await db.query.contestants.findFirst({
      where: eq(contestants.id, id),
    });

    if (!contestant) {
      return NextResponse.json(
        { error: "Contestant not found" },
        { status: 404 }
      );
    }

    const contestantBoost = await db.query.contestantBoosts.findFirst({
      where: and(
        eq(contestantBoosts.contestantId, id),
        eq(contestantBoosts.boostId, boostId)
      ),
    });

    if (!contestantBoost) {
      return NextResponse.json(
        { error: "Boost not found or already inactive" },
        { status: 404 }
      );
    }

    // Soft delete by marking as inactive
    // await db
    //   .update(contestantBoosts)
    //   .set({
    //     active: false,
    //   })
    //   .where(eq(contestantBoosts.id, contestantBoost.id));

    await db
      .delete(contestantBoosts)
      .where(eq(contestantBoosts.id, contestantBoost.id));

    return NextResponse.json({
      success: true,
      message: "Boost removed successfully",
    });
  } catch (error) {
    console.error("Error deleting contestant boost:", error);
    return NextResponse.json(
      { error: "Failed to delete boost" },
      { status: 500 }
    );
  }
}
