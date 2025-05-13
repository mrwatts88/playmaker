"use client";

import { useContestTeams } from "@/app/hooks/useContestTeams";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";

interface ITeam {
  id: string;
  league: string;
  name: string;
}

export default function Draft({
  params,
}: {
  params: Promise<{ contestId: string }>;
}) {
  const router = useRouter();
  const { contestId } = use(params);
  const { teams, isLoading, isError } = useContestTeams(contestId);
  const { user, createAnonymousUser } = useUser();
  // const [roster, setRoster] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FB7B1F]"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading teams</div>
      </div>
    );
  }

  const handleSubmitTeam = async () => {
    setIsSubmitting(true);
    try {
      // Create anonymous user if we don't have one
      let currentUser = user;
      if (!currentUser) {
        try {
          currentUser = await createAnonymousUser();
        } catch (error) {
          console.error("Failed to create anonymous user:", error);
          alert("Failed to create user. Please try again.");
          return;
        }
      }

      // Create contestant by entering contest
      const contestantResponse = await fetch(
        `/api/contests/${contestId}/user/${currentUser.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamId: selectedTeam }),
        }
      );

      if (!contestantResponse.ok) {
        const error = await contestantResponse.json();
        throw new Error(error.error || "Failed to enter contest");
      }

      // Redirect to court page
      router.push(`/contests/${contestId}/court`);
    } catch (error) {
      console.error("Error submitting roster:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to submit roster. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 shadow-sm bg-white">
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href={`/contests/${contestId}`} className="p-2 -m-2">
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
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <span className="font-bold text-xl">DRAFT</span>
              <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mx-auto w-full md:w-[90%] max-w-[1000px] flex-1 overflow-y-auto px-4 mt-10">
        <h1 className="text-2xl font-bold mb-6">Select a Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map((team: ITeam) => (
            <div
              key={team.id}
              className={`
              p-4 rounded-lg cursor-pointer transition-all duration-200
              bg-white shadow-md hover:shadow-lg
              ${
                selectedTeam === team.id
                  ? "border-2 border-[#FB7B1F]"
                  : "border border-gray-200 hover:border-[#FB7B1F]"
              }
            `}
              onClick={() => handleTeamSelect(team.id)}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-2xl font-bold mb-2">{team.name}</div>
                <div className="text-sm text-gray-600 uppercase">
                  {team.league}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <div
        className="sticky bottom-0 px-4 py-3 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <button
          onClick={handleSubmitTeam}
          disabled={isSubmitting || selectedTeam === null}
          className={`block w-full max-w-md mx-auto text-center rounded-lg px-6 py-3 text-lg font-semibold cursor-pointer ${
            isSubmitting || selectedTeam === null
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#FB7B1F] text-white hover:bg-[#ea6a0e]"
          }`}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
}
