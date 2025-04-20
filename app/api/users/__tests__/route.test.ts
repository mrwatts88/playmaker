import { NextRequest } from "next/server";
import { POST } from "@/app/api/users/route";
import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

describe("POST /api/users", () => {
  // Store original db.insert
  const originalInsert = db.insert;

  // Restore original db.insert after all tests
  afterAll(() => {
    db.insert = originalInsert;
  });

  // Restore original db.insert after each test
  afterEach(() => {
    db.insert = originalInsert;
  });

  it("should create a new user", async () => {
    const request = new NextRequest("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toMatchObject({
      name: "Test User",
    });

    // Clean up
    await db.delete(users).where(eq(users.id, data.id));
  });

  it("should return 400 if name is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        // Missing name
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("should return 400 if name is empty", async () => {
    const request = new NextRequest("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("should return 500 for database errors", async () => {
    // Mock db.insert to throw an error
    db.insert = jest.fn().mockImplementation(() => {
      throw new Error("Database error");
    });

    const request = new NextRequest("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Internal Server Error" });
  });
});
