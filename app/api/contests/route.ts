import { db } from "@/db/db";
import { contests, leagueType } from "@/db/schema/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const league = searchParams.get("league");

    const query = db.select().from(contests);

    // Only return non-completed contests
    query.where(and(eq(contests.status, "upcoming"), eq(contests.status, "active")));

    // Apply league filter if provided and valid
    if (league) {
      const validLeague = leagueType.enumValues.find((v) => v === league);
      if (validLeague) {
        query.where(eq(contests.league, validLeague));
      }
    }

    query.orderBy(contests.startTime);

    const contestsList = await query;

    return NextResponse.json(contestsList);
  } catch (error) {
    console.error("Error fetching contests:", error);
    return NextResponse.json({ error: "Failed to fetch contests" }, { status: 500 });
  }
}
