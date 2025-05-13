"use client";

import { useContest } from "@/app/hooks/useContest";
import Link from "next/link";
import { use } from "react";

export default function ContestLobby({
  params,
}: {
  params: Promise<{ contestId: string }>;
}) {
  const { contestId } = use(params);
  const { contest, isLoading, isError } = useContest(contestId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FB7B1F]"></div>
      </div>
    );
  }

  if (isError || !contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading contest</div>
      </div>
    );
  }

  const {
    name,
    league,
    status,
    startTime,
    games = [],
    contestants = [],
  } = contest;

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          <div className="flex items-center">
            <span className="font-bold text-xl">DRAFT</span>
            <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mx-auto w-full md:w-[70%] max-w-[1000px] flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Contest Info */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600">League</p>
                <p className="font-semibold">{league.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-semibold capitalize">{status}</p>
              </div>
              <div>
                <p className="text-gray-600">Start Time</p>
                <p className="font-semibold">
                  {new Date(startTime).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Contestants</p>
                <p className="font-semibold">{contestants.length}</p>
              </div>
            </div>
          </div>

          {/* Games Section */}
          {games.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h2 className="text-xl font-semibold mb-4">Games</h2>
              <div className="space-y-4">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="grid grid-cols-3 items-center p-2 hover:bg-gray-50 rounded-lg"
                  >
                    {/* Game Info */}
                    <div className="col-span-2">
                      <p className="font-medium">{game.name}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        {game.status}
                      </p>
                    </div>

                    {/* Time */}
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(game.startTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contestants Section */}
          {contestants.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Contestants</h2>
              <div className="space-y-4">
                {contestants.map((contestant) => (
                  <div
                    key={contestant.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{contestant.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="sticky bottom-0 py-3 px-4 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <Link
          href={`/contests/${contestId}/draft`}
          className="block w-full max-w-md mx-auto text-center rounded-lg bg-[#FB7B1F] text-white px-6 py-3 text-lg font-semibold"
        >
          ENTER CONTEST
        </Link>
      </div>
    </div>
  );
}
