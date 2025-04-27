import type { InferModel } from "drizzle-orm";
import {
  teams,
  athletes,
  boosts,
  games,
  gameEvents,
  contests,
  contestGames,
  users,
  contestants,
  rosterMembers,
  contestantBoosts,
  contestBoosts,
} from "@/db/schema/schema";

export type Team = InferModel<typeof teams>;
export type Athlete = InferModel<typeof athletes>;
export type Boost = InferModel<typeof boosts>;
export type Game = InferModel<typeof games>;
export type GameEvent = InferModel<typeof gameEvents>;
export type Contest = InferModel<typeof contests>;
export type ContestGame = InferModel<typeof contestGames>;
export type User = InferModel<typeof users>;
export type Contestant = InferModel<typeof contestants>;
export type RosterMember = InferModel<typeof rosterMembers>;
export type ContestantBoost = InferModel<typeof contestantBoosts>;
export type ContestBoost = InferModel<typeof contestBoosts>;
