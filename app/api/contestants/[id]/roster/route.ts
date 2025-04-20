import { contestantIdSchema, submitRosterSchema } from "@/app/api/schemas";
import { getDraftableAthletes } from "@/app/service/contest";
import { db } from "@/db/db";
import { athletes, contestants, rosterMembers } from "@/db/schema/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

type ContestantWithRoster = typeof contestants.$inferSelect & {
  roster: (typeof rosterMembers.$inferSelect)[];
};

/**
 * @swagger
 * tags:
 *   - name: Contestants
 *     description: Contestant management endpoints
 *
 * /api/contestants/{id}/roster:
 *   post:
 *     tags: [Contestants]
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
    const contestant = (await db.query.contestants.findFirst({
      where: eq(contestants.id, id),
      with: {
        roster: true,
      },
    })) as ContestantWithRoster | undefined;

    if (!contestant) {
      console.error("Contestant not found");
      return NextResponse.json({ error: "Contestant not found" }, { status: 404 });
    }

    // Check if contestant already has a roster
    if (contestant.roster.length > 0) {
      console.error("Roster already submitted");
      return NextResponse.json({ error: "Roster already submitted" }, { status: 400 });
    }

    // Check if all athletes exist
    const existingAthletes = await db.query.athletes.findMany({
      where: inArray(athletes.id, result.data.athleteIds),
    });

    if (existingAthletes.length !== result.data.athleteIds.length) {
      console.error("One or more athletes not found");
      return NextResponse.json({ error: "One or more athletes not found" }, { status: 404 });
    }

    // Get draftable athletes for this contest
    const draftableAthletes = await getDraftableAthletes(contestant.contestId);
    const draftableAthleteIds = new Set(draftableAthletes.map((athlete) => athlete.id));

    // Check if all submitted athletes are draftable
    const invalidAthletes = result.data.athleteIds.filter((id) => !draftableAthleteIds.has(id));
    if (invalidAthletes.length > 0) {
      console.error("One or more athletes are not draftable in this contest");
      return NextResponse.json({ error: "One or more athletes are not draftable in this contest" }, { status: 400 });
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
