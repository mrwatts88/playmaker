import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/boosts/available - Get all available boosts
export async function GET() {
  try {
    const availableBoosts = await prisma.boost.findMany();

    return NextResponse.json(availableBoosts);
  } catch (error) {
    console.error("Error fetching available boosts:", error);
    return NextResponse.json({ error: "Failed to fetch available boosts" }, { status: 500 });
  }
}
