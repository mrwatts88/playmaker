import React from "react";
import { ContestGameState } from "@/app/hooks/useContestGameState";
import { Boost } from "@/types/db";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useContestantBoosts } from "@/app/hooks/useContestantBoosts";
import { getCookie } from "cookies-next";

import {
  Ban,
  FlagTriangleRight,
  Handshake,
  LoaderPinwheel,
  RefreshCw,
  RotateCcw,
  ShoppingBasket,
  SquareArrowDownLeft,
  Trash2,
  Volleyball,
} from "lucide-react";
import { toast } from "react-toastify";
import CurrentEvent from "./CurrentEvent";
import { useGameEvents } from "@/app/hooks/useGameEvents";
import { useResponsiveDimensions } from "@/app/hooks/useScreenSize";
import Button from "@/components/Button";

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

interface GameRoomProps {
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

const screenMapping = {
  1: "w-12 h-12",
  0: "w-10 h-10",
  "-1": "w-8 h-8",
};
const heightMapping = {
  1: "h-24",
  0: "h-20",
  "-1": "h-16",
};
const sizeMapping = {
  1: "text-[16px]",
  0: "text-sm",
  "-1": "text-[12px]",
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

  if (boostId !== "none") {
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
  }
  return <span>{boostIcon}</span>;
};

// Boost Icon Component
export const BoostIcon: React.FC<{ boost: Boost; className?: string }> = ({
  boost,
  className = "bg-[#FB7B1F]",
}) => {
  const { screenSize, dimensions } = useResponsiveDimensions();
  const stat = boost?.stat || "none";

  const getIconPath = () => {
    switch (stat) {
      case "points":
        return <Volleyball className={`${dimensions} lg:w-8 md:h-8`} />;
      case "rebounds":
        return <RotateCcw className={`${dimensions} lg:w-8 lg:h-8`} />;
      case "assists":
        return <Handshake className={`${dimensions} lg:w-8 lg:h-8`} />;
      case "blocks":
        return <Ban className={`${dimensions} lg:w-8 lg:h-8`} />;
      case "steals":
        return <RefreshCw className={`${dimensions} lg:w-8 lg:h-8`} />;
      case "turnover":
        return (
          <SquareArrowDownLeft className={`${dimensions} lg:w-8 lg:h-8`} />
        );
      case "3 pointers":
        return <ShoppingBasket className={`${dimensions} lg:w-8 lg:h-8`} />;
      case "foul":
        return <FlagTriangleRight className={`${dimensions} lg:w-8 lg:h-8`} />;
      case "free throw made":
        return <LoaderPinwheel className={`${dimensions} lg:w-8 lg:h-8`} />;
      case "none":
        return <div className={`${dimensions} rounded-full`} />;
      default:
        return <div className={`${dimensions} rounded-full bg-gray-700`} />;
    }
  };

  return (
    <div
      className={`${
        screenMapping[screenSize]
      } rounded-full flex items-center justify-center ${
        stat !== "none" ? className : "bg-gray-200 border border-gray-700"
      }`}
    >
      <div className="text-gray-900">{getIconPath()}</div>
    </div>
  );
};

const ContestantRow: React.FC<{ contestant: Contestant; index: number }> = ({
  contestant,
  index,
}) => {
  const { screenSize } = useResponsiveDimensions();
  return (
    <div className={`flex ${heightMapping[screenSize]}`}>
      <div className="w-16 text-white bg-gray-900 text-3xl flex items-center justify-center m-1 mb-0">
        {index + 1}
      </div>
      <div
        className={`flex flex-1 items-center p-4 pr-0 gap-4 border-b border-[#FB7B1F] ${
          index % 2 === 0 ? "bg-white" : "bg-[#fdd0b0]"
        }`}
      >
        {/* <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-700 bg-white flex items-start justify-center">
        <Image src={Avatar} alt={contestant.name} width={50} height={50} />
      </div> */}

        <div
          className={`flex flex-col ${sizeMapping[screenSize]} justify-between items-start mb-2 mr-2`}
        >
          <div className="text-gray-700 font-bold">
            {contestant.spendableXp} XP
          </div>
          <div className="text-gray-700">Score: {contestant.totalXp}</div>
        </div>

        <div className="flex justify-start flex-1 gap-x-2 overflow-hidden">
          {Array.from({ length: 10 }, (_, index) => {
            const boost = contestant?.currentBoosts?.[index];
            return (
              <TooltipComponent
                key={index}
                boostId={boost?.id || "none"}
                contestantId={contestant?.id}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

const GameRoom = ({ contest }: GameRoomProps) => {
  const userId =
    typeof window !== "undefined"
      ? (getCookie("playmaker_user_id") as string | undefined)
      : undefined;
  const { contestants } = contest;
  const contestantId = contestants?.find((item) => item.userId === userId)?.id;
  const { boost } = useContestantBoosts(contestantId || null);
  const { gameEvents, isLoading: eventLoading } = useGameEvents(contest.id);

  const handleXPCalculation = async (eventToProcess: number) => {
    const gemeEventResponse = await fetch(
      `/api/contests/${contest.id}/game-events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contestId: contest.id, eventToProcess }),
      }
    );

    const data = await gemeEventResponse.json();

    if (!gemeEventResponse.ok) {
      const error = await gemeEventResponse.json();
      toast.error(error.error || "Failed to ");
    } else {
      toast.success(data?.message || "Events processed successfully");
    }
  };

  return (
    <div className="flex w-full h-screen text-white p-0 lg:p-12">
      <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-white rounded-s-lg">
        <div>
          {contestants.map((contestant, index) => (
            <ContestantRow
              key={contestant.id}
              contestant={contestant}
              index={index}
            />
          ))}
        </div>
        <div className="flex gap-4 p-4 bg-gray-900">
          <Button
            variant="submit"
            onClick={() => handleXPCalculation(1)}
            className={`h-9 px-4 text-sm rounded-full bg-[#FB7B1F] text-white font-medium cursor-pointer `}
          >
            1 Event
          </Button>
          <button
            onClick={() => handleXPCalculation(10)}
            className={`h-9 px-4 text-sm rounded-full bg-[#FB7B1F] text-white font-medium cursor-pointer`}
          >
            10 Event
          </button>
          <button
            onClick={() => handleXPCalculation(50)}
            className={`h-9 px-4 text-sm rounded-full bg-[#FB7B1F] text-white font-medium cursor-pointer`}
          >
            50 Event
          </button>
        </div>
      </div>
      <div className="w-[20%] lg:w-[15%] border-l border-gray-800">
        <CurrentEvent
          gameEvents={gameEvents || []}
          eventLoading={eventLoading}
          boosts={boost || []}
          contestantId={contestantId || ""}
        />
      </div>
    </div>
  );
};

export default GameRoom;
