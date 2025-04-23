"use client";

import Link from "next/link";
import { FaBasketballBall, FaFootballBall, FaBaseballBall } from "react-icons/fa";

interface Contest {
  id: number;
  entries: number;
  maxEntries: number;
  entryFee: number;
  league: "NBA" | "NFL" | "MLB";
  teams: string[];
}

const contests: Contest[] = [
  {
    id: 1,
    entries: 5,
    maxEntries: 6,
    entryFee: 10,
    league: "NBA",
    teams: ["CHI", "BKN", "LAL", "GSW"],
  },
  {
    id: 2,
    entries: 1,
    maxEntries: 6,
    entryFee: 5,
    league: "NFL",
    teams: ["TB", "DAL", "BUF", "KC"],
  },
  {
    id: 3,
    entries: 5,
    maxEntries: 6,
    entryFee: 20,
    league: "MLB",
    teams: ["NYY", "BOS", "LAD", "HOU"],
  },
  {
    id: 4,
    entries: 5,
    maxEntries: 6,
    entryFee: 3,
    league: "NFL",
    teams: ["SF", "PHI", "BAL", "CIN"],
  },
  {
    id: 5,
    entries: 2,
    maxEntries: 6,
    entryFee: 3,
    league: "NFL",
    teams: ["SF", "PHI", "BAL", "CIN"],
  },
  {
    id: 6,
    entries: 3,
    maxEntries: 6,
    entryFee: 3,
    league: "NFL",
    teams: ["SF", "PHI", "BAL", "CIN"],
  },
];
const getLeagueIcon = (league: string) => {
  switch (league) {
    case "NBA":
      return FaBasketballBall;
    case "NFL":
      return FaFootballBall;
    case "MLB":
      return FaBaseballBall;
    default:
      return FaBasketballBall;
  }
};

export default function Contests() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 shadow-sm bg-white">
        <div className="flex items-center p-4">
          <span className="font-bold text-xl">DRAFT</span>
          <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
        </div>
        <div className="flex">
          <button className={`flex-1 pb-2 pt-3 text-center font-medium text-[#FB7B1F] border-t-1 border-t-gray-200 border-b-2 border-b-[#FB7B1F]`}>
            CURRENT CONTESTS
          </button>
        </div>
      </div>

      {/* Contest List */}
      <div className="flex-1 p-4" style={{ backgroundColor: "var(--background-color)" }}>
        <div className="flex flex-col gap-3">
          {contests.map((contest) => {
            const LeagueIcon = getLeagueIcon(contest.league);
            return (
              <Link key={contest.id} href={`/contests/${contest.id}`} className="block bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-lg font-semibold mb-2">Contest {contest.id}</div>
                    <div className="flex gap-2 mb-2">
                      {contest.teams.map((team, index) => (
                        <div key={index} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <LeagueIcon className="w-4 h-4 text-gray-600" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">
                        {contest.entries}/{contest.maxEntries}
                      </span>
                      <span className="text-gray-600">{contest.league}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="bg-[#FB7B1F] text-white px-4 py-2 rounded font-semibold">ENTER</button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
