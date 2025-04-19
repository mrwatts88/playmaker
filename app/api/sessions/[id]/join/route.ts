import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { username } = await request.json();
    const sessionId = params.id;

    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    // Get or create user
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username },
    });

    // Check if session exists
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ message: "Session not found" }, { status: 404 });
    }

    // Check if user is already in the session
    const existingUserSession = await prisma.userSession.findUnique({
      where: {
        userId_sessionId: {
          userId: user.id,
          sessionId,
        },
      },
    });

    if (existingUserSession) {
      return NextResponse.json({ message: "User already in session" }, { status: 400 });
    }

    // Add user to session
    const userSession = await prisma.userSession.create({
      data: {
        userId: user.id,
        sessionId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(userSession);
  } catch (error) {
    console.error("Error joining session:", error);
    return NextResponse.json({ message: "Failed to join session" }, { status: 500 });
  }
}
