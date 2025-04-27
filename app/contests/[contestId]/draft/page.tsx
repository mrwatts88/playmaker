"use client";

import DraftPlayerCard from "@/components/DraftPlayerCard";
import { useDraftableAthletes } from "@/app/hooks/useDraftableAthletes";
import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";

type Tab = "pool" | "roster";

export default function Draft({ params }: { params: Promise<{ contestId: string }> }) {
  const router = useRouter();
  const { contestId } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>("pool");
  const { athletes, isLoading: isLoadingAthletes, isError: athletesError } = useDraftableAthletes(contestId);
  const { user, createAnonymousUser } = useUser();
  const [roster, setRoster] = useState<string[]>([]); // Array of athlete IDs in roster
  const [draftBalance, setDraftBalance] = useState<number>(500); // Initial draft balance of $500
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Loading state
  if (isLoadingAthletes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FB7B1F]"></div>
      </div>
    );
  }

  // Error state
  if (athletesError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading athletes</div>
      </div>
    );
  }

  const rosterAthletes = athletes.filter((athlete) => roster.includes(athlete.id));
  const poolAthletes = athletes.filter((athlete) => !roster.includes(athlete.id));

  const handleAddToRoster = (athleteId: string) => {
    const athlete = athletes.find((a) => a.id === athleteId);
    if (!athlete) return;

    // Check if roster is already at max capacity
    if (roster.length >= 5) {
      return;
    }

    // Check if adding the athlete would exceed the draft balance
    if (draftBalance - athlete.cost < 0) {
      return;
    }

    setRoster((prev) => [...prev, athleteId]);
    setDraftBalance((prev) => prev - athlete.cost);
  };

  const handleRemoveFromRoster = (athleteId: string) => {
    const athlete = athletes.find((a) => a.id === athleteId);
    if (!athlete) return;

    setRoster((prev) => prev.filter((id) => id !== athleteId));
    setDraftBalance((prev) => prev + athlete.cost);
  };

  const handleSubmitRoster = async () => {
    if (roster.length !== 5) {
      return;
    }

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
      const contestantResponse = await fetch(`/api/contests/${contestId}/user/${currentUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!contestantResponse.ok) {
        const error = await contestantResponse.json();
        throw new Error(error.error || "Failed to enter contest");
      }

      const contestant = await contestantResponse.json();

      // Submit roster
      const rosterResponse = await fetch(`/api/contestants/${contestant.id}/roster`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          athleteIds: roster,
        }),
      });

      if (!rosterResponse.ok) {
        const error = await rosterResponse.json();
        throw new Error(error.error || "Failed to submit roster");
      }

      // Redirect to court page
      router.push(`/contests/${contestId}/court`);
    } catch (error) {
      console.error("Error submitting roster:", error);
      alert(error instanceof Error ? error.message : "Failed to submit roster. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate remaining roster spots
  const remainingSpots = 5 - roster.length;

  return (
    <div className="min-h-screen flex flex-col">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <span className="font-bold text-xl">DRAFT</span>
              <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Draft balance:</span>
                <span className={`font-semibold ${draftBalance < 100 ? "text-red-500" : "text-gray-600"}`}>${draftBalance}</span>
              </div>
              <div className="text-sm text-gray-500">
                {remainingSpots} {remainingSpots === 1 ? "spot" : "spots"} remaining
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Only visible on mobile */}
        <div className="flex md:hidden border-t-1 border-t-gray-200 border-b-[#FB7B1F]">
          <button
            className={`flex-1 pt-3 pb-2 text-center font-medium ${activeTab === "pool" ? "text-[#FB7B1F] border-b-2" : "text-gray-500"}`}
            onClick={() => setActiveTab("pool")}
          >
            PLAYER POOL
          </button>
          <button
            className={`flex-1 pt-3 pb-2  text-center font-medium  ${activeTab === "roster" ? "text-[#FB7B1F] border-b-2" : "text-gray-500"}`}
            onClick={() => setActiveTab("roster")}
          >
            ROSTER
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mx-auto w-full md:w-[90%] max-w-[1000px] flex-1 overflow-y-auto px-4">
        {/* Mobile View */}
        <div className="py-4 md:hidden">
          {activeTab === "pool" && (
            <div className="w-full flex flex-col gap-2">
              {poolAthletes.map((athlete) => (
                <DraftPlayerCard
                  key={athlete.id}
                  name={athlete.name}
                  team={athlete.team?.name || ""}
                  position={athlete.position || ""}
                  price={athlete.cost}
                  imageUrl={`https://cdn.nba.com/headshots/nba/latest/1040x760/${athlete.apiId}.png`}
                  variant="pool"
                  onAction={() => handleAddToRoster(athlete.id)}
                />
              ))}
            </div>
          )}
          {activeTab === "roster" && (
            <div className="w-full flex flex-col gap-2">
              {rosterAthletes.map((athlete) => (
                <DraftPlayerCard
                  key={athlete.id}
                  name={athlete.name}
                  team={athlete.team?.name || ""}
                  position={athlete.position || ""}
                  price={athlete.cost}
                  imageUrl={`https://cdn.nba.com/headshots/nba/latest/1040x760/${athlete.apiId}.png`}
                  variant="roster"
                  onAction={() => handleRemoveFromRoster(athlete.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop/Landscape View */}
        <div className="hidden md:flex gap-4 pb-4">
          <div className="flex-1">
            <p className="text-md text-gray-500 my-2">PLAYER POOL</p>
            <div className="flex flex-col gap-2">
              {poolAthletes.map((athlete) => (
                <DraftPlayerCard
                  key={athlete.id}
                  name={athlete.name}
                  team={athlete.team?.name || ""}
                  position={athlete.position || ""}
                  price={athlete.cost}
                  imageUrl={`https://cdn.nba.com/headshots/nba/latest/1040x760/${athlete.apiId}.png`}
                  fallbackImageUrl={`https://i.pravatar.cc/300?u=${athlete.name.toLowerCase().replace(/\s/g, "_")}`}
                  variant="pool"
                  onAction={() => handleAddToRoster(athlete.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-md text-gray-500 my-2">ROSTER</p>
            <div className="flex flex-col gap-2">
              {rosterAthletes.map((athlete) => (
                <DraftPlayerCard
                  key={athlete.id}
                  name={athlete.name}
                  team={athlete.team?.name || ""}
                  position={athlete.position || ""}
                  price={athlete.cost}
                  imageUrl={`https://cdn.nba.com/headshots/nba/latest/1040x760/${athlete.apiId}.png`}
                  fallbackImageUrl={`https://i.pravatar.cc/300?u=${athlete.name.toLowerCase().replace(/\s/g, "_")}`}
                  variant="roster"
                  onAction={() => handleRemoveFromRoster(athlete.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 px-4 py-3 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]" style={{ backgroundColor: "var(--background-color)" }}>
        <button
          onClick={handleSubmitRoster}
          disabled={isSubmitting || roster.length !== 5}
          className={`block w-full max-w-md mx-auto text-center rounded-lg px-6 py-3 text-lg font-semibold ${
            isSubmitting || roster.length !== 5 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-[#FB7B1F] text-white hover:bg-[#ea6a0e]"
          }`}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
}
