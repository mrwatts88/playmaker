import { contestantIdSchema } from "@/app/api/schemas";
import { db } from "@/db/db";
import { contestants } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Contestants
 *     description: Contestant management endpoints
 *
 * /api/contestants/{id}:
 *   get:
 *     tags: [Contestants]
 *     summary: Get contestant by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contestant details
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contestant not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const contestantIdResult = contestantIdSchema.safeParse({ id: params.id });
    if (!contestantIdResult.success) {
      console.error("Invalid contestant ID:", contestantIdResult.error);
      return NextResponse.json({ error: contestantIdResult.error.issues[0].message }, { status: 400 });
    }

    const contestant = await db.query.contestants.findFirst({
      where: eq(contestants.id, contestantIdResult.data.id),
      with: {
        roster: {
          with: {
            athlete: {
              with: {
                team: true,
              },
            },
          },
        },
      },
    });

    if (!contestant) {
      console.error("Contestant not found");
      return NextResponse.json({ error: "Contestant not found" }, { status: 404 });
    }

    return NextResponse.json(contestant);
  } catch (error) {
    console.error("Error fetching contestant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
