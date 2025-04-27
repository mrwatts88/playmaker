import type { Contestant, RosterMember as DbRosterMember, Athlete as DbAthlete, Team } from "@/types/db";

export type Athlete = DbAthlete & { team?: Team };
export type RosterMember = DbRosterMember & { athlete: Athlete };
export type ContestantWithRoster = Contestant & { roster: RosterMember[] };
