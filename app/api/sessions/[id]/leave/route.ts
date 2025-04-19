import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the session
    const session = await prisma.session.findUnique({
      where: { id: params.id },
      include: {
        userSessions: {
          where: { userId: user.id },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Delete the user's session
    await prisma.userSession.deleteMany({
      where: {
        userId: user.id,
        sessionId: params.id,
      },
    });

    return NextResponse.json({ message: "Successfully left session" });
  } catch (error) {
    console.error("Error leaving session:", error);
    return NextResponse.json({ error: "Failed to leave session" }, { status: 500 });
  }
}
