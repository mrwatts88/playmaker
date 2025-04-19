import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { userIdSchema } from "@/app/api/schemas";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = userIdSchema.safeParse({ id });

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, result.data.id),
    });

    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
