import { contestQuerySchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import { contests } from "@/db/schema/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/contests:
 *   get:
 *     summary: List available contests
 *     parameters:
 *       - name: league
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of contests
 *       500:
 *         description: Internal server error
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const result = contestQuerySchema.safeParse(queryParams);
    if (!result.success) {
      console.error("Invalid query parameters");
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const query = db.select().from(contests);

    // Only return non-completed contests
    query.where(and(eq(contests.status, "upcoming"), eq(contests.status, "active")));

    // Apply league filter if provided
    if (result.data.league) {
      query.where(eq(contests.league, result.data.league));
    }

    query.orderBy(contests.startTime);

    const contestsList = await query;

    return NextResponse.json(contestsList);
  } catch (error) {
    console.error("Error fetching contests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
