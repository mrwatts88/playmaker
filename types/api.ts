import type { Contestant as DbContestant, Athlete as DbAthlete, Team } from "@/types/db";

export type Athlete = DbAthlete & { team?: Team };
export type Contestant = DbContestant;
