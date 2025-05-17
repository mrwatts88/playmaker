import React, { useState } from "react";
import Image from "next/image";
import Avatar from "../../../public/images/avatar.png";
import { ContestGameState } from "@/app/hooks/useContestGameState";
import { Boost } from "@/types/db";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useContestantBoosts } from "@/app/hooks/useContestantBoosts";
import { getCookie } from "cookies-next";
import ShowStat from "./ShowStat";
import SelectBoost from "./SelectBoost";
import {
  Ban,
  FlagTriangleRight,
  LoaderCircle,
  LoaderPinwheel,
  RefreshCw,
  ShoppingBasket,
  SquareArrowDownLeft,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

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
}

interface GameCircleVerticalProps {
  contest: ContestGameState;
}

interface EventProps {
  name: string;
  boosts: Boost[];
  contestantId: string;
}

interface Stat {
  [key: string]: string;
}

const mappedMessage: Stat = {
  rebounds: "Team Stat - Rebound",
  assists: "Team Stat - Assists",
  points: "Team Stat - Points",
  blocks: "Team Stat - Blocks",
  steals: "Team Stat - Steals",
  turnover: "Team Stat - Turnover",
  foul: "Team Stat - Foul",
  "3 pointers": "Team Stat - 3 pointers",
  "free throw made": "Team Stat - Free throw made",
};

// Current Event Component
const TooltipComponent: React.FC<TooltipComponentProps> = ({
  boostIcon,
  message,
  boostId,
  contestantId,
  isDelete = true,
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
              {isDelete && (
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
const CurrentEvent: React.FC<EventProps> = ({ name, boosts, contestantId }) => {
  const [isLoading, setIsLoding] = useState(false);
  const [selectedBoost, setSelectedBoost] = useState<string[]>([]);

  const handleBuyBoost = async () => {
    setIsLoding(true);
    const contestantResponse = await fetch(
      `/api/contestants/${contestantId}/boost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boostIds: selectedBoost }),
      }
    );
    setIsLoding(false);

    if (!contestantResponse.ok) {
      const error = await contestantResponse.json();
      toast.error(error.error || "Failed to buy boosts");
    }
    setSelectedBoost([]);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 h-full rounded-r-lg">
      <div className="text-gray-400 text-lg mb-2">Current Event</div>
      <div className="text-white text-3xl font-bold">{name}</div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <h3>Available Boosts</h3>
        {boosts?.length === 0 && (
          <LoaderCircle className="animate-spin h-10 text-center w-full" />
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {boosts?.map((boost, index) => {
            return (
              <TooltipComponent
                key={index}
                boostIcon={
                  <SelectBoost
                    key={index}
                    boost={boost}
                    setSelectedBoost={setSelectedBoost}
                    selectedBoost={selectedBoost}
                    className="bg-[#9198a8]"
                  />
                }
                isDelete={false}
                message={<ShowStat boost={boost} />}
              />
            );
          })}
        </div>
        <button
          onClick={handleBuyBoost}
          className="h-9 px-4 rounded-full bg-[#FB7B1F] hover:bg-[#eb853c] text-white font-medium cursor-pointer"
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Buy Boost"}
        </button>
      </div>
    </div>
  );
};

// Boost Icon Component
const BoostIcon: React.FC<{ boost: Boost; className?: string }> = ({
  boost,
  className = "bg-[#FB7B1F]",
}) => {
  const getIconPath = () => {
    const type = boost?.stat;
    switch (type) {
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
        return <SquareArrowDownLeft className="w-8 h-12" />;
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

      <div className="flex justify-start flex-1 gap-2">
        {contestant?.currentBoosts.map((boost: Boost, index: number) => (
          <TooltipComponent
            key={index}
            boostId={boost.id}
            contestantId={contestant.id}
            boostIcon={<BoostIcon key={index} boost={boost} />}
            message={mappedMessage[boost?.stat || ""]}
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

  return (
    <div className="flex w-full h-screen text-white p-12">
      <div className="flex-1 overflow-y-auto bg-white rounded-s-lg">
        {contestants.map((contestant, index) => (
          <ContestantRow
            key={contestant.id}
            contestant={contestant}
            index={index}
          />
        ))}
      </div>
      <div className="w-[20%] border-l border-gray-800">
        <CurrentEvent
          name="Rebound Event"
          boosts={boost || []}
          contestantId={contestantId || ""}
        />
      </div>
    </div>
  );
};

export default GameRoom;
