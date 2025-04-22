import { contestIdSchema } from "@/app/api/schemas";
import { getDraftableAthletes } from "@/service/contest";
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
 * /api/contests/{id}/draftable-athletes:
 *   get:
 *     tags: [Contests]
 *     summary: Get draftable athletes for a contest
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of athletes
 *       404:
 *         description: Contest not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Validate contest ID
    const { id } = await context.params;
    const contestIdResult = contestIdSchema.safeParse({ id });
    if (!contestIdResult.success) {
      console.error("Invalid contest ID:", contestIdResult.error);
      return NextResponse.json({ error: contestIdResult.error.issues[0].message }, { status: 400 });
    }

    // Check if contest exists
    const contest = await db.query.contests.findFirst({
      where: eq(contests.id, id),
    });

    if (!contest) {
      console.error("Contest not found");
      return NextResponse.json({ error: "Contest not found" }, { status: 404 });
    }

    const draftableAthletes = await getDraftableAthletes(id);
    return NextResponse.json(draftableAthletes);
  } catch (error) {
    console.error("Error fetching draftable athletes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
