import { contestantIdSchema, submitRosterSchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import { athletes, contestants, rosterMembers } from "@/db/schema/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /contestants/{id}/roster:
 *   post:
 *     summary: Submit drafted roster
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               athleteIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Roster submitted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contestant not found
 *       500:
 *         description: Internal server error
 */
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Validate contestant ID
    const { id } = await context.params;
    const contestantIdResult = contestantIdSchema.safeParse({ id });
    if (!contestantIdResult.success) {
      console.error("Invalid contestant ID:", contestantIdResult.error);
      return NextResponse.json({ error: contestantIdResult.error.issues[0].message }, { status: 400 });
    }

    // Validate request body
    const body = await request.json();
    const result = submitRosterSchema.safeParse(body);

    if (!result.success) {
      console.error("Invalid request body:", result.error);
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    // Check if contestant exists
    const contestant = await db.query.contestants.findFirst({
      where: eq(contestants.id, id),
    });

    if (!contestant) {
      console.error("Contestant not found");
      return NextResponse.json({ error: "Contestant not found" }, { status: 404 });
    }

    // Check if all athletes exist
    const foundAthletes = await db.query.athletes.findMany({
      where: inArray(athletes.id, result.data.athleteIds),
    });

    if (foundAthletes.length !== result.data.athleteIds.length) {
      console.error("One or more athletes not found");
      return NextResponse.json({ error: "One or more athletes not found" }, { status: 404 });
    }

    // Create roster members
    const rosterEntries = result.data.athleteIds.map((athleteId) => ({
      contestantId: contestant.id,
      athleteId,
    }));

    await db.insert(rosterMembers).values(rosterEntries);

    return NextResponse.json({ message: "Roster submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error submitting roster:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
