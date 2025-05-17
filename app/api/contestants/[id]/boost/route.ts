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

/**
 * @swagger
 * /api/contestants/{id}/boost:
 *   post:
 *     tags: [Contestants]
 *     summary: Used for buying contestant boost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - boostIds
 *             properties:
 *               gameIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of boost IDs to include to contestant current boost
 *     responses:
 *       201:
 *         description: Boost added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 gameIds:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request (Insufficiant XP.)
 *       404:
 *         description: BoostIds not found
 *       500:
 *         description: Internal Server Error
 */

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    if (!body.boostIds || !Array.isArray(body.boostIds)) {
      return NextResponse.json(
        { error: "boostIds array is required" },
        { status: 400 }
      );
    }

    const boostIds = body.boostIds as string[];
    if (boostIds.length === 0) {
      return NextResponse.json(
        { error: "No boosts selected for purchase" },
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

    const selectedBoosts = await db.query.boosts.findMany({
      where: inArray(boosts.id, boostIds),
    });

    if (selectedBoosts.length !== boostIds.length) {
      return NextResponse.json(
        { error: "One or more boosts not found" },
        { status: 404 }
      );
    }

    const totalCost = selectedBoosts.reduce(
      (sum, boost) => sum + (boost.cost || 0),
      0
    );

    if (contestant.spendableXp < totalCost) {
      return NextResponse.json(
        {
          error: "Insufficient XP",
          required: totalCost,
          available: contestant.spendableXp,
        },
        { status: 400 }
      );
    }

    await db
      .update(contestants)
      .set({
        spendableXp: contestant.spendableXp - totalCost,
        updatedAt: new Date(),
      })
      .where(eq(contestants.id, id));

    if (selectedBoosts.length > 0) {
      const boostRecords = selectedBoosts.map((boost) => ({
        contestantId: id,
        boostId: boost.id,
        createdAt: new Date(),
        // expiresAt: boost.duration ? new Date(Date.now() + boost.duration * 1000) : null,
      }));

      await db.insert(contestantBoosts).values(boostRecords);
    }

    return NextResponse.json({
      success: true,
      message: "Boosts purchased successfully",
      boosts: selectedBoosts,
      costPaid: totalCost,
      remainingXp: contestant.spendableXp - totalCost,
    });
  } catch (error) {
    console.error("Error purchasing boosts:", error);
    return NextResponse.json(
      { error: "Failed to purchase boosts" },
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
