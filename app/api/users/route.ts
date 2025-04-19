import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema/schema";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      console.error("Name is required");
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [user] = await db.insert(users).values({ name }).returning();

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
