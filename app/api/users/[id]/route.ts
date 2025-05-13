import { db } from "@/db/db";
import { contestants, users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { userIdSchema } from "@/app/api/schemas";

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const result = userIdSchema.safeParse({ id });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    );
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const contestant = await db.query.contestants.findMany({
      where: eq(contestants.userId, id),
    });

    return NextResponse.json({ ...user, contestants: contestant || [] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
