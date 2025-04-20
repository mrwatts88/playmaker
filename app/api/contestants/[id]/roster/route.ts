import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/db";
import { athletes, contestants, rosterMembers, teams } from "@/db/schema/schema";
import { eq, inArray } from "drizzle-orm";
import { getDraftableAthletes } from "@/app/service/contest";

const contestantIdSchema = z.object({
  id: z.string().uuid(),
});

const rosterSchema = z.object({
  athleteIds: z.array(z.string()).length(5),
});

type ContestantWithRoster = typeof contestants.$inferSelect & {
  roster: (typeof rosterMembers.$inferSelect)[];
};

type AthleteWithTeam = typeof athletes.$inferSelect & {
  team: typeof teams.$inferSelect;
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
 *         description: Internal Server Error
 */
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const contestantIdResult = contestantIdSchema.safeParse({ id: params.id });
    if (!contestantIdResult.success) {
      console.error("Invalid contestant ID:", contestantIdResult.error);
      return NextResponse.json({ error: contestantIdResult.error.issues[0].message }, { status: 400 });
    }

    const body = await request.json();
    const result = rosterSchema.safeParse(body);

    if (!result.success) {
      console.error("Invalid request body:", result.error);
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    // Check if contestant exists
    const contestant = (await db.query.contestants.findFirst({
      where: eq(contestants.id, contestantIdResult.data.id),
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
      console.error("Contestant already has a roster");
      return NextResponse.json({ error: "Contestant already has a roster" }, { status: 400 });
    }

    // Check if athlete IDs are valid UUIDs
    const invalidAthleteIds = result.data.athleteIds.filter((id) => !z.string().min(1).safeParse(id).success);
    if (invalidAthleteIds.length > 0) {
      console.error("Invalid athlete IDs");
      return NextResponse.json({ error: "Invalid athlete IDs" }, { status: 400 });
    }

    // Check if athletes exist
    const existingAthletes = (await db.query.athletes.findMany({
      where: inArray(athletes.id, result.data.athleteIds),
      with: {
        team: true,
      },
    })) as AthleteWithTeam[];

    if (existingAthletes.length !== result.data.athleteIds.length) {
      console.error("One or more athletes not found, or duplicate athlete IDs");
      return NextResponse.json({ error: "One or more athletes not found, or duplicate athlete IDs" }, { status: 404 });
    }

    // Get draftable athletes for the contest
    const draftableAthletes = await getDraftableAthletes(contestant.contestId);
    const draftableAthleteIds = new Set(draftableAthletes.map((athlete) => athlete.id));

    // Check if all athletes are draftable in this contest
    const invalidAthletes = existingAthletes.filter((athlete) => !draftableAthleteIds.has(athlete.id));
    if (invalidAthletes.length > 0) {
      console.error("One or more athletes not in contest");
      return NextResponse.json({ error: "One or more athletes not in contest" }, { status: 400 });
    }

    // Create roster members
    const rosterEntries: (typeof rosterMembers.$inferInsert)[] = result.data.athleteIds.map((athleteId) => ({
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
