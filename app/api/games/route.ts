import { db } from "@/db/db";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Games
 *     description: Games management endpoints
 *
 * /api/games:
 *   get:
 *     tags: [Games]
 *     summary: List available games
 *     responses:
 *       200:
 *         description: List of games
 *       500:
 *         description: Internal Server Error
 */
export async function GET() {
  try {
    const allGames = await db.query.games.findMany();
    if (!allGames) {
      return NextResponse.json({ error: "No games found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: allGames,
      count: allGames.length,
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
