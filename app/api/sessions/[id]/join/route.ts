import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { username } = await request.json();
    console.log("Join session request:", { username, sessionId: params.id });

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Check if user is already in another session
    const existingUserSession = await prisma.userSession.findFirst({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        session: true,
      },
    });

    if (existingUserSession) {
      console.log("User already in session:", existingUserSession);
      return NextResponse.json(
        { error: `You are already in session "${existingUserSession.session.name}". Please leave that session before joining another one.` },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log("Creating new user:", username);
      user = await prisma.user.create({
        data: { username },
      });
    }

    // Check if session exists
    const session = await prisma.session.findUnique({
      where: { id: params.id },
    });

    if (!session) {
      console.log("Session not found:", params.id);
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Create user session
    console.log("Creating user session:", { userId: user.id, sessionId: session.id });
    const userSession = await prisma.userSession.create({
      data: {
        userId: user.id,
        sessionId: session.id,
        isCreator: false,
      },
      include: {
        session: true,
        user: true,
      },
    });

    console.log("Created user session:", userSession);
    return NextResponse.json(userSession);
  } catch (error) {
    console.error("Error joining session:", error);
    return NextResponse.json({ error: "Failed to join session" }, { status: 500 });
  }
}
