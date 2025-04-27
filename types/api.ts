import type { Contestant, RosterMember } from "@/types/db";

export type ContestantWithRoster = Contestant & { roster: RosterMember[] };
