import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/boosts/available - Get 3 random available boosts
export async function GET(request: NextRequest) {
  try {
    // Get all boosts first
    const allBoosts = await prisma.boost.findMany();

    // Randomly select 3 boosts
    const randomBoosts = allBoosts.sort(() => Math.random() - 0.5).slice(0, 3);

    return Response.json(randomBoosts);
  } catch (error) {
    console.error("Failed to fetch available boosts:", error);
    return Response.json({ error: "Failed to fetch available boosts" }, { status: 500 });
  }
}
