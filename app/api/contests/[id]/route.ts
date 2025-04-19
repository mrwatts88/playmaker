import { db } from "@/db/db";
import { contests } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const contest = await db.query.contests.findFirst({
      where: eq(contests.id, id),
    });

    if (!contest) {
      console.error("Contest not found");
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }

    return NextResponse.json(contest);
  } catch (error) {
    console.error("Error fetching contest:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
