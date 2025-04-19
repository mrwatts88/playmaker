import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/sessions/join - Join an existing session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, sessionCode } = body;

    if (!userId || !sessionCode) {
      return Response.json({ error: "User ID and session code are required" }, { status: 400 });
    }

    // Find session and check if it exists
    const session = await prisma.session.findUnique({
      where: {
        sessionCode: sessionCode.toUpperCase(),
      },
    });

    if (!session) {
      return Response.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.status !== "waiting") {
      return Response.json({ error: "Session has already started or completed" }, { status: 400 });
    }

    // Check if user is already in session
    const existingUserSession = await prisma.userSession.findUnique({
      where: {
        userId_sessionId: {
          userId,
          sessionId: session.id,
        },
      },
    });

    if (existingUserSession) {
      return Response.json({ error: "User already in session" }, { status: 400 });
    }

    // Join session
    const userSession = await prisma.userSession.create({
      data: {
        userId,
        sessionId: session.id,
      },
      include: {
        user: true,
        session: true,
      },
    });

    return Response.json(userSession);
  } catch (error) {
    console.error("Failed to join session:", error);
    return Response.json({ error: "Failed to join session" }, { status: 500 });
  }
}
