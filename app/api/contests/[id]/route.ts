import { contestIdSchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import { contests } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Contests
 *     description: Contest management endpoints
 *
 * /api/contests/{id}:
 *   get:
 *     tags: [Contests]
 *     summary: Get contest details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest details
 *       404:
 *         description: Contest not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const result = contestIdSchema.safeParse({ id });

  if (!result.success) {
    console.error("Invalid request parameters");
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    );
  }

  try {
    const contest = await db.query.contests.findFirst({
      where: eq(contests.id, result.data.id),
    });

    if (!contest) {
      console.error("Contest not found");
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }

    return NextResponse.json(contest);
  } catch (error) {
    console.error("Error fetching contest:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
