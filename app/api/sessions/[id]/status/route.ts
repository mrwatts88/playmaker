import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/sessions/[id]/status - Update session status
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status } = body;
    const { id } = params;

    if (!status) {
      return Response.json({ error: "Status is required" }, { status: 400 });
    }

    // Validate status transition
    const session = await prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      return Response.json({ error: "Session not found" }, { status: 404 });
    }

    const validTransitions: Record<string, string[]> = {
      waiting: ["drafting"],
      drafting: ["active"],
      active: ["completed"],
      completed: [],
    };

    if (!validTransitions[session.status]?.includes(status)) {
      return Response.json({ error: "Invalid status transition" }, { status: 400 });
    }

    // Update session status
    const updatedSession = await prisma.session.update({
      where: { id },
      data: { status },
      include: {
        userSessions: {
          include: {
            user: true,
          },
        },
      },
    });

    return Response.json(updatedSession);
  } catch (error) {
    console.error("Failed to update session status:", error);
    return Response.json({ error: "Failed to update session status" }, { status: 500 });
  }
}
