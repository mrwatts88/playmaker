import React from "react";
import Image from "next/image";
import Avatar from "../../../public/images/avatar.png";
import { ContestGameState } from "@/app/hooks/useContestGameState";
import { Boost } from "@/types/db";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useContestantBoosts } from "@/app/hooks/useContestantBoosts";
import { getCookie } from "cookies-next";

import {
  Ban,
  FlagTriangleRight,
  LoaderPinwheel,
  RefreshCw,
  ShoppingBasket,
  SquareArrowDownLeft,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import CurrentEvent from "./CurrentEvent";
import { useGameEvents } from "@/app/hooks/useGameEvents";

export interface Contestant {
  id: string;
  name: string;
  teamId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  contestId: string;
  userId: string;
  totalXp: number;
  spendableXp: number;
  statPower: unknown;
  currentBoosts: Boost[];
}

interface TooltipComponentProps {
  boostIcon: React.ReactNode;
  message: React.ReactNode;
  boostId?: string;
  contestantId?: string;
  isDelete?: boolean;
  showDelete?: boolean;
}

interface GameCircleVerticalProps {
  contest: ContestGameState;
}

interface Stat {
  [key: string]: string;
}

const mappedMessage: Stat = {
  rebounds: "Rebound",
  assists: "Assists",
  points: "Points",
  blocks: "Blocks",
  steals: "Steals",
  turnover: "Turnover",
  foul: "Foul",
  "3 pointers": "3 pointers",
  "free throw made": "Free throw made",
};

// Current Event Component
export const TooltipComponent: React.FC<TooltipComponentProps> = ({
  boostIcon,
  message,
  boostId,
  contestantId,
  isDelete = true,
  showDelete = false,
}) => {
  const handleDelete = async () => {
    if (!boostId) return;
    const response = await fetch(`/api/contestants/${contestantId}/boost`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boostId }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || "Failed to delete boost");
      return;
    }
    toast.success("Boost removed successfully");
  };

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger className="cursor-pointer" asChild>
          <span>{boostIcon}</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md"
          >
            <div className="flex items-center justify-between gap-4">
              {message}{" "}
              {isDelete && showDelete && (
                <Trash2
                  onClick={handleDelete}
                  className="text-red-500 h-4 w-4 cursor-pointer"
                />
              )}
            </div>
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

// Boost Icon Component
export const BoostIcon: React.FC<{ boost: Boost; className?: string }> = ({
  boost,
  className = "bg-[#FB7B1F]",
}) => {
  const getIconPath = () => {
    const stat = boost?.stat;
    switch (stat) {
      case "points":
        return (
          <Image
            src={"/images/basketball.svg"}
            alt="basketball"
            width={48}
            height={48}
          />
        );
      case "rebounds":
        return (
          <Image
            src={"/images/bounce.svg"}
            alt="basketball"
            width={48}
            height={48}
          />
        );
      case "assists":
        return (
          <Image
            src={"/images/hand.svg"}
            alt="basketball"
            width={48}
            height={48}
          />
        );
      case "blocks":
        return <Ban className="w-8 h-8" />;
      case "steals":
        return <RefreshCw className="w-8 h-8" />;
      case "turnover":
        return <SquareArrowDownLeft className="w-8 h-8" />;
      case "3 pointers":
        return <ShoppingBasket className="w-8 h-8" />;
      case "foul":
        return <FlagTriangleRight className="w-8 h-8" />;
      case "free throw made":
        return <LoaderPinwheel className="w-8 h-8" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-700" />;
    }
  };

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${className}`}
    >
      <div className="w-8 h-8 text-gray-900">{getIconPath()}</div>
    </div>
  );
};

const ContestantRow: React.FC<{ contestant: Contestant; index: number }> = ({
  contestant,
  index,
}) => {
  return (
    <div
      className={`flex items-center p-4 gap-4 border-b border-[#FB7B1F] ${
        index % 2 === 0 ? "bg-[#ffecde]" : "bg-[#fdd0b0]"
      }`}
    >
      <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-700 bg-white flex items-start justify-center">
        <Image src={Avatar} alt={contestant.name} width={50} height={50} />
      </div>

      <div className="flex flex-col justify-between items-start mb-2 mr-6">
        <div className="text-black font-semibold">{contestant.name}</div>
        <div className="text-gray-700">
          {contestant.spendableXp} XP / {contestant.totalXp} XP
        </div>
      </div>

      <div className="flex justify-start flex-1 gap-x-2 overflow-y-hidden overflow-x-auto">
        {contestant?.currentBoosts.map((boost: Boost, index: number) => (
          <TooltipComponent
            key={index}
            boostId={boost.id}
            contestantId={contestant.id}
            boostIcon={
              <BoostIcon
                key={index}
                boost={boost}
                className={
                  boost?.type === "team" ? "bg-[#FB7B1F]" : "bg-[#4ED7F1]"
                }
              />
            }
            showDelete={boost?.cost !== 0}
            message={
              boost?.type === "team"
                ? `Team Stat - ${mappedMessage[boost?.stat || ""]}`
                : `${boost?.name} - ${mappedMessage[boost?.stat || ""]}`
            }
          />
        ))}
      </div>
    </div>
  );
};

const GameRoom = ({ contest }: GameCircleVerticalProps) => {
  const userId =
    typeof window !== "undefined"
      ? (getCookie("playmaker_user_id") as string | undefined)
      : undefined;
  const { contestants } = contest;
  const contestantId = contestants.find((item) => item.userId === userId)?.id;
  const { boost } = useContestantBoosts(contestantId || null);
  const { gameEvents } = useGameEvents(contest.id);

  return (
    <div className="flex w-full h-screen text-white p-0 lg:p-12">
      <div className="flex-1 overflow-y-auto bg-white rounded-s-lg">
        {contestants.map((contestant, index) => (
          <ContestantRow
            key={contestant.id}
            contestant={contestant}
            index={index}
          />
        ))}
      </div>
      <div className="w-[32%] md:w-[26%] xl:w-[20%] border-l border-gray-800">
        <CurrentEvent
          gameEvents={gameEvents || []}
          boosts={boost || []}
          contestantId={contestantId || ""}
        />
      </div>
    </div>
  );
};

export default GameRoom;
