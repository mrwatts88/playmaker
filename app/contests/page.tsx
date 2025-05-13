"use client";

import { useContests } from "@/app/hooks/useContests";
import { useUser } from "@/app/hooks/useUser";
import Link from "next/link";
import {
  FaBasketballBall,
  FaFootballBall,
  FaBaseballBall,
} from "react-icons/fa";

const getLeagueIcon = (league: string) => {
  switch (league.toUpperCase()) {
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
  const {
    contests,
    isLoading: isContestsLoading,
    isError: isContestsError,
  } = useContests();
  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser();
  console.log(user,"user")

  if (isContestsLoading || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FB7B1F]"></div>
      </div>
    );
  }

  if (isContestsError || isUserError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading data</div>
      </div>
    );
  }

  const userContestIds = new Set(
    user?.contestants?.map((c) => c.contestId) || []
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 shadow-sm bg-white">
        <div className="flex items-center p-4">
          <span className="font-bold text-xl">DRAFT</span>
          <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
        </div>
        <div className="flex">
          <button
            className={`flex-1 pb-2 pt-3 text-center font-medium text-[#FB7B1F] border-t-1 border-t-gray-200 border-b-2 border-b-[#FB7B1F]`}
          >
            CURRENT CONTESTS
          </button>
        </div>
      </div>

      {/* Contest List */}
      <div
        className="flex-1 p-4 mx-auto w-full md:w-[70%] max-w-[1000px]"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="flex flex-col gap-3">
          {contests?.map((contest) => {
            const LeagueIcon = getLeagueIcon(contest.league);
            const isUserInContest = userContestIds.has(contest.id);

            return (
              <Link
                key={contest.id}
                href={`/contests/${contest.id}${
                  isUserInContest ? "/court" : ""
                }`}
                className="block bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-lg font-semibold mb-2">
                      {contest.name}
                    </div>
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <LeagueIcon className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{contest.status}</span>
                      <span className="text-gray-600">
                        {contest.league.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className={`${
                        isUserInContest ? "bg-green-600" : "bg-[#FB7B1F]"
                      } text-white px-4 py-2 rounded font-semibold cursor-pointer`}
                    >
                      {isUserInContest ? "GO TO ROOM" : "ENTER"}
                    </button>
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
