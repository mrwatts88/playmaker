import { NextRequest } from "next/server";
import { GET } from "@/app/api/users/[id]/route";
import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

describe("GET /api/users/{id}", () => {
  // Store original db.query.users.findFirst
  const originalFindFirst = db.query.users.findFirst;

  // Restore original function after all tests
  afterAll(() => {
    db.query.users.findFirst = originalFindFirst;
  });

  // Restore original function after each test
  afterEach(() => {
    db.query.users.findFirst = originalFindFirst;
  });

  it("should return user details", async () => {
    // Create a test user
    const [user] = await db
      .insert(users)
      .values({
        name: "Test User",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/users/123");
    const response = await GET(request, { params: Promise.resolve({ id: user.id }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      id: user.id,
      name: "Test User",
    });

    // Clean up
    await db.delete(users).where(eq(users.id, user.id));
  });

  it("should return 404 if user not found", async () => {
    const request = new NextRequest("http://localhost:3000/api/users/123");
    const response = await GET(request, {
      params: Promise.resolve({ id: "00000000-0000-4000-a000-000000000000" }),
    });
    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid ID format", async () => {
    const request = new NextRequest("http://localhost:3000/api/users/123");
    const response = await GET(request, { params: Promise.resolve({ id: "invalid-id" }) });
    expect(response.status).toBe(400);
  });

  it("should return 500 for database errors", async () => {
    // Mock db.query.users.findFirst to throw an error
    db.query.users.findFirst = jest.fn().mockRejectedValue(new Error("Database error"));

    const request = new NextRequest("http://localhost:3000/api/users/123");
    const response = await GET(request, {
      params: Promise.resolve({ id: "00000000-0000-4000-a000-000000000000" }),
    });

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Internal Server Error" });
  });
});
