import { z } from "zod";

// User schemas
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const userIdSchema = z.object({
  id: z.string().uuid("User ID must be a valid UUID"),
});

// Contest schemas
export const contestIdSchema = z.object({
  id: z.string().uuid("Contest ID must be a valid UUID"),
});

export const contestantIdSchema = z.object({
  id: z.string().uuid("Contestant ID must be a valid UUID"),
});

export const contestQuerySchema = z.object({
  league: z
    .enum(["nba", "nfl", "nhl", "mlb"], {
      errorMap: () => ({ message: "League must be one of: nba, nfl, nhl, mlb" }),
    })
    .optional(),
});

export const enterContestSchema = z.object({
  id: z.string().uuid("Contest ID must be a valid UUID"),
  userId: z.string().uuid("User ID must be a valid UUID"),
});

export const submitRosterSchema = z.object({
  athleteIds: z.array(z.string().min(1, "Athlete ID must not be empty")).length(5, "Exactly 5 athletes are required"),
});

export const uuidSchema = z.string().uuid();
