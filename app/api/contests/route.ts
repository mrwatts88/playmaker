import { contestQuerySchema } from "@/app/api/schemas";
import { createContestWithGames } from "@/service/contest";
import { db } from "@/db/db";
import { contests } from "@/db/schema/schema";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const createContestSchema = z.object({
  name: z.string(),
  gameIds: z.array(z.string()),
  league: z.enum(["nba", "nfl", "nhl", "mlb"]),
});

/**
 * @swagger
 * tags:
 *   - name: Contests
 *     description: Contest management endpoints
 *
 * /api/contests:
 *   get:
 *     tags: [Contests]
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
 *         description: Internal Server Error
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

    // Return upcoming or active contests
    query.where(or(eq(contests.status, "upcoming"), eq(contests.status, "active")));

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

/**
 * @swagger
 * /api/contests:
 *   post:
 *     tags: [Contests]
 *     summary: Create a new contest with specified games
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - gameIds
 *               - league
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the contest
 *               gameIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of game IDs to include in the contest
 *               league:
 *                 type: string
 *                 enum: [nba, nfl, nhl, mlb]
 *                 description: League type for the contest
 *     responses:
 *       201:
 *         description: Contest created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 gameIds:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request (invalid game IDs, league mismatch, etc.)
 *       404:
 *         description: One or more games not found
 *       500:
 *         description: Internal Server Error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = createContestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, gameIds, league } = result.data;

    const contest = await createContestWithGames(name, gameIds, league);

    return NextResponse.json(contest, { status: 201 });
  } catch (error) {
    console.error("Error creating contest:", error);
    if (error instanceof Error) {
      if (error.message === "One or more games not found") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message === "One or more games belong to a different league") {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
