import { db } from "@/db/db";
import {
  boosts,
  contestantBoosts,
  contestants,
} from "@/db/schema/schema";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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