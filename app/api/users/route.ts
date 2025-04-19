import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { createUserSchema } from "../schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const [user] = await db
      .insert(users)
      .values({
        name: result.data.name,
      })
      .returning();

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
