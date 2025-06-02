import { calculateContestantXP } from "@/service/processEvents";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { gameId, eventToProcess } = body;

    const calculateXP = await calculateContestantXP(gameId, eventToProcess);
    return NextResponse.json(calculateXP, { status: 200 });
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
