import { z } from "zod";

// UUID validation
export const uuidSchema = z.string().uuid();

// User schemas
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const userIdSchema = z.object({
  id: uuidSchema,
});

// Contest schemas
export const contestIdSchema = z.object({
  id: uuidSchema,
});

export const contestQuerySchema = z.object({
  league: z.enum(["nba", "nfl", "nhl", "mlb"]).optional(),
});
