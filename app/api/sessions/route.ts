import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSessionCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// GET /api/sessions - List active sessions
export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        userSessions: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json({ message: "Failed to fetch sessions" }, { status: 500 });
  }
}

// POST /api/sessions - Create a new session
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);

    const { name, username } = body;

    if (!name) {
      return NextResponse.json({ message: "Session name is required" }, { status: 400 });
    }

    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log("Creating new user:", username);
      user = await prisma.user.create({
        data: { username },
      });
    }

    // Generate a unique session code
    let sessionCode = generateSessionCode();
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5;

    while (!isUnique && attempts < maxAttempts) {
      const existingSession = await prisma.session.findUnique({
        where: { sessionCode },
      });
      if (!existingSession) {
        isUnique = true;
      } else {
        sessionCode = generateSessionCode();
      }
      attempts++;
    }

    if (!isUnique) {
      throw new Error("Failed to generate a unique session code");
    }

    console.log("Creating session with:", { name, sessionCode, username });

    // Create session with auto-generated code
    const session = await prisma.session.create({
      data: {
        name,
        sessionCode,
        status: "WAITING",
        startTime: new Date(),
        userSessions: {
          create: {
            userId: user.id,
          },
        },
      },
      include: {
        userSessions: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log("Session created successfully:", session);
    return NextResponse.json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      {
        message: "Failed to create session",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
