import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { username } = await request.json();
    const sessionId = params.id;

    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if user is in the session
    const userSession = await prisma.userSession.findUnique({
      where: {
        userId_sessionId: {
          userId: user.id,
          sessionId,
        },
      },
    });

    if (!userSession) {
      return NextResponse.json({ message: "User is not in this session" }, { status: 400 });
    }

    // Delete the user session
    await prisma.userSession.delete({
      where: {
        userId_sessionId: {
          userId: user.id,
          sessionId,
        },
      },
    });

    return NextResponse.json({ message: "Successfully left session" });
  } catch (error) {
    console.error("Error leaving session:", error);
    return NextResponse.json({ message: "Failed to leave session" }, { status: 500 });
  }
}
