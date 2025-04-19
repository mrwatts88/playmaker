import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/players/available - Get all available players
export async function GET() {
  try {
    const availablePlayers = await prisma.availablePlayer.findMany();

    return NextResponse.json(availablePlayers);
  } catch (error) {
    console.error("Error fetching available players:", error);
    return NextResponse.json({ error: "Failed to fetch available players" }, { status: 500 });
  }
}
