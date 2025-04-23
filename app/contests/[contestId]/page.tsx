"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type BadgeType = "top_scorer" | "perfect_draft" | "streak_5" | "streak_3";

// Mock data for games
const games = [
  {
    id: 1,
    homeTeam: {
      name: "Boston Celtics",
      shortName: "BOS",
      logo: "https://i.pravatar.cc/300?u=celtics",
      record: "42-12",
    },
    awayTeam: {
      name: "Los Angeles Lakers",
      shortName: "LAL",
      logo: "https://i.pravatar.cc/300?u=lakers",
      record: "30-26",
    },
    time: "7:30 PM EST",
    date: "Feb 20",
  },
  {
    id: 2,
    homeTeam: {
      name: "Golden State Warriors",
      shortName: "GSW",
      logo: "https://i.pravatar.cc/300?u=warriors",
      record: "28-26",
    },
    awayTeam: {
      name: "Phoenix Suns",
      shortName: "PHX",
      logo: "https://i.pravatar.cc/300?u=suns",
      record: "32-22",
    },
    time: "10:00 PM EST",
    date: "Feb 20",
  },
  {
    id: 3,
    homeTeam: {
      name: "Milwaukee Bucks",
      shortName: "MIL",
      logo: "https://i.pravatar.cc/300?u=bucks",
      record: "35-21",
    },
    awayTeam: {
      name: "Miami Heat",
      shortName: "MIA",
      logo: "https://i.pravatar.cc/300?u=heat",
      record: "29-25",
    },
    time: "8:00 PM EST",
    date: "Feb 21",
  },
  {
    id: 4,
    homeTeam: {
      name: "Dallas Mavericks",
      shortName: "DAL",
      logo: "https://i.pravatar.cc/300?u=mavs",
      record: "32-23",
    },
    awayTeam: {
      name: "Denver Nuggets",
      shortName: "DEN",
      logo: "https://i.pravatar.cc/300?u=nuggets",
      record: "36-19",
    },
    time: "9:30 PM EST",
    date: "Feb 21",
  },
  {
    id: 5,
    homeTeam: {
      name: "New York Knicks",
      shortName: "NYK",
      logo: "https://i.pravatar.cc/300?u=knicks",
      record: "33-22",
    },
    awayTeam: {
      name: "Philadelphia 76ers",
      shortName: "PHI",
      logo: "https://i.pravatar.cc/300?u=sixers",
      record: "32-22",
    },
    time: "7:30 PM EST",
    date: "Feb 22",
  },
];

// Mock data for contestants
const contestants = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/300?u=john",
    wins: 12,
    rank: 1,
    badges: ["top_scorer", "streak_3"] as BadgeType[],
  },
  {
    id: 2,
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/300?u=mike",
    wins: 0,
    rank: 3,
    badges: [] as BadgeType[],
  },
  {
    id: 3,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/300?u=jane",
    wins: 8,
    rank: 2,
    badges: ["top_scorer", "perfect_draft", , "streak_5"] as BadgeType[],
  },
];

// Badge icons mapping
const badgeIcons: Record<BadgeType, React.ReactElement> = {
  top_scorer: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-yellow-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
      />
    </svg>
  ),
  perfect_draft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-green-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
      />
    </svg>
  ),
  streak_5: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-orange-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  streak_3: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-orange-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
};

export default function ContestLobby({ params }: { params: Promise<{ contestId: string }> }) {
  const { contestId } = use(params);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/contests" className="p-2 -m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex items-center">
            <span className="font-bold text-xl">DRAFT</span>
            <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Contest Info */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Contest Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600">Entry Fee</p>
                <p className="font-semibold">$100</p>
              </div>
              <div>
                <p className="text-gray-600">Prize Pool</p>
                <p className="font-semibold">$1,000</p>
              </div>
              <div>
                <p className="text-gray-600">Start Time</p>
                <p className="font-semibold">7:30 PM EST</p>
              </div>
              <div>
                <p className="text-gray-600">Entries</p>
                <p className="font-semibold">10/20</p>
              </div>
            </div>
          </div>

          {/* Games Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="text-xl font-semibold mb-4">Games</h2>
            <div className="space-y-4">
              {games.map((game) => (
                <div key={game.id} className="grid grid-cols-3 items-center p-2 hover:bg-gray-50 rounded-lg">
                  {/* Home Team */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image src={game.homeTeam.logo} alt={game.homeTeam.name} fill className="object-cover rounded-full" />
                    </div>
                    <div>
                      <p className="font-medium hidden md:block">{game.homeTeam.name}</p>
                      <p className="font-medium md:hidden">{game.homeTeam.shortName}</p>
                      <p className="text-sm text-gray-600">{game.homeTeam.record}</p>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-600">VS</p>
                    <p className="text-sm font-medium">{game.time}</p>
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-3 justify-end">
                    <div>
                      <p className="font-medium text-right hidden md:block">{game.awayTeam.name}</p>
                      <p className="font-medium text-right md:hidden">{game.awayTeam.shortName}</p>
                      <p className="text-sm text-gray-600 text-right">{game.awayTeam.record}</p>
                    </div>
                    <div className="relative w-12 h-12">
                      <Image src={game.awayTeam.logo} alt={game.awayTeam.name} fill className="object-cover rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contestants Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Contestants</h2>
            <div className="space-y-4">
              {contestants.map((contestant) => (
                <div key={contestant.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image src={contestant.avatar} alt={contestant.name} fill className="object-cover rounded-full" />
                    </div>
                    <div>
                      <p className="font-medium">{contestant.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {contestant.badges.map((badge) => (
                            <div key={badge} className="bg-gray-100 p-1 rounded-full">
                              {badgeIcons[badge]}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 font-medium">{contestant.wins > 0 ? `${contestant.wins} Wins` : "New Contestant"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 py-3 px-4" style={{ backgroundColor: "var(--background-color)" }}>
        <Link
          href={`/contests/${contestId}/draft`}
          className="block w-full text-center rounded-lg bg-[#FB7B1F] text-white px-6 py-3 text-lg font-semibold"
        >
          ENTER CONTEST
        </Link>
      </div>
    </div>
  );
}
