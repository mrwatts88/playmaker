import { contestIdSchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import { contestGames } from "@/db/schema/schema";
import { calculateContestantXP } from "@/service/processEvents";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const contestIdResult = contestIdSchema.safeParse({ id });
    if (!contestIdResult.success) {
      console.error("Invalid contest ID:", contestIdResult.error);
      return NextResponse.json(
        { error: contestIdResult.error.issues[0].message },
        { status: 400 }
      );
    }
    const body = await request.json();

    const { eventToProcess } = body;

    const contestGameList = await db.query.contestGames.findMany({
      where: eq(contestGames.contestId, id),
      with: {
        game: true,
      },
    });
    await Promise.all(
      contestGameList.map((contestGame) =>
        calculateContestantXP(contestGame.gameId, eventToProcess)
      )
    );

    // const calculateXP = await calculateContestantXP(gameId, eventToProcess);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error creating contest:", error);
    if (
      error instanceof Error &&
      error.message.includes("Error calculating contestant XP")
    ) {
      return NextResponse.json(
        { error: "Error calculating contestant XP" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
