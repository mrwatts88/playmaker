import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/players/available - Get all available players
export async function GET(request: NextRequest) {
  try {
    const players = await prisma.availablePlayer.findMany({
      orderBy: {
        price: "desc",
      },
    });

    return Response.json(players);
  } catch (error) {
    console.error("Failed to fetch available players:", error);
    return Response.json({ error: "Failed to fetch available players" }, { status: 500 });
  }
}
