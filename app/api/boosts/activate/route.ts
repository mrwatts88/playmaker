import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/boosts/activate - Activate a boost for a player
export async function POST(request: Request) {
  try {
    const { playerId, boostId } = await request.json();
    if (!playerId || !boostId) {
      return NextResponse.json({ error: "Player ID and Boost ID are required" }, { status: 400 });
    }

    // Get player with userSession
    const player = await prisma.player.findUnique({
      where: { id: playerId },
      include: {
        userSession: true,
      },
    });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // Get boost details
    const boost = await prisma.boost.findUnique({
      where: { id: boostId },
    });

    if (!boost) {
      return NextResponse.json({ error: "Boost not found" }, { status: 404 });
    }

    // Check if player has enough XP
    if (player.xp < boost.cost) {
      return NextResponse.json({ error: "Insufficient XP" }, { status: 400 });
    }

    // Create active boost and deduct XP in a transaction
    const result = await prisma.$transaction([
      prisma.activeBoost.create({
        data: {
          playerId: player.id,
          boostId: boost.id,
          userSessionId: player.userSession.id,
          endTime: new Date(Date.now() + boost.duration * 1000),
        },
      }),
      prisma.player.update({
        where: { id: player.id },
        data: { xp: { decrement: boost.cost } },
      }),
    ]);

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error activating boost:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
