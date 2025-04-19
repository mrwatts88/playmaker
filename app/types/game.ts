export type GameStatus = "waiting" | "drafting" | "active" | "completed";

export type StatCategory = "points" | "assists" | "rebounds" | "steals" | "blocks";

export type PlayerBoost = {
  id: string;
  name: string;
  multiplier: number;
  startTime: Date;
  duration: number;
};

export type DraftPlayer = {
  id: string;
  name: string;
  team: string;
  position: string;
  stats: Partial<Record<StatCategory, number>>;
};

export type GamePlayer = {
  id: string;
  name: string;
  team: string;
  position: string;
  active: boolean;
  xp: number;
  statMultipliers: Partial<Record<StatCategory, number>>;
  activeBoosts: PlayerBoost[];
};
