import { athletes, boosts, contestantBoosts, contestants, contestGames, contests, gameEvents, games, teams, users } from "@/db/schema/schema";
import type { InferModel } from "drizzle-orm";

export type Team = InferModel<typeof teams>;
export type Athlete = InferModel<typeof athletes>;
export type Boost = InferModel<typeof boosts>;
export type Game = InferModel<typeof games>;
export type GameEvent = InferModel<typeof gameEvents>;
export type Contest = InferModel<typeof contests>;
export type ContestGame = InferModel<typeof contestGames>;
export type User = InferModel<typeof users>;
export type Contestant = InferModel<typeof contestants>;
export type ContestantBoost = InferModel<typeof contestantBoosts>;
