import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/players/draft - Draft a player
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userSessionId, availablePlayerId } = body;

    if (!userSessionId || !availablePlayerId) {
      return Response.json({ error: "User session ID and available player ID are required" }, { status: 400 });
    }

    // Get user session and check if they have enough money
    const userSession = await prisma.userSession.findUnique({
      where: { id: userSessionId },
      include: {
        session: true,
        players: true,
      },
    });

    if (!userSession) {
      return Response.json({ error: "User session not found" }, { status: 404 });
    }

    if (userSession.session.status !== "drafting") {
      return Response.json({ error: "Session is not in drafting phase" }, { status: 400 });
    }

    // Get available player and check price
    const availablePlayer = await prisma.availablePlayer.findUnique({
      where: { id: availablePlayerId },
    });

    if (!availablePlayer) {
      return Response.json({ error: "Available player not found" }, { status: 404 });
    }

    if (userSession.money < availablePlayer.price) {
      return Response.json({ error: "Not enough money to draft this player" }, { status: 400 });
    }

    // Check if user already has this player
    const existingPlayer = await prisma.player.findUnique({
      where: {
        userSessionId_availablePlayerId: {
          userSessionId,
          availablePlayerId,
        },
      },
    });

    if (existingPlayer) {
      return Response.json({ error: "Player already drafted" }, { status: 400 });
    }

    // Draft the player
    const [player] = await prisma.$transaction([
      prisma.player.create({
        data: {
          name: availablePlayer.name,
          team: availablePlayer.team,
          position: availablePlayer.position,
          userSessionId,
          availablePlayerId,
          statCategoryXp: {}, // Initialize with no multipliers
          boosts: {}, // Initialize with no boosts
        },
      }),
      prisma.userSession.update({
        where: { id: userSessionId },
        data: {
          money: {
            decrement: availablePlayer.price,
          },
        },
      }),
    ]);

    return Response.json(player);
  } catch (error) {
    console.error("Failed to draft player:", error);
    return Response.json({ error: "Failed to draft player" }, { status: 500 });
  }
}
