import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const { username } = await request.json();
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    // Create new user
    const user = await prisma.user.create({
      data: { username },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// GET /api/users?username=xxx - Get user by username
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to get user:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}
