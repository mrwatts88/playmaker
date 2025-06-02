import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { TooltipComponent } from ".";
import SelectBoost from "./SelectBoost";
import ShowStat from "./ShowStat";
import { Boost } from "@/types/db";
import { GameEvent } from "@/app/hooks/useGameEvents";

interface EventProps {
  gameEvents: GameEvent[];
  boosts: Boost[];
  contestantId: string;
  eventLoading: boolean;
}

const CurrentEvent: React.FC<EventProps> = ({
  gameEvents,
  boosts,
  contestantId,
  eventLoading
}) => {
  const [isLoading, setIsLoding] = useState(false);
  const [selectedBoost, setSelectedBoost] = useState<string[]>([]);

  const handleBuyBoost = async () => {
    setIsLoding(true);
    const contestantResponse = await fetch(
      `/api/contestants/${contestantId}/buy-boost`,
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
    <div className="flex flex-col items-center bg-gray-900 p-4 h-full rounded-r-lg overflow-y-auto">
      <div className="flex flex-col gap-y-1 md:gap-y-2 lg:gap-y-4">
        {eventLoading ? (
          <LoaderCircle className="animate-spin h-10 text-center w-full" />
        ) : (
          gameEvents?.map((item) => {
            const convertedName = item?.athlete?.name
              .split(" ")
              .map((word, index) => (index === 0 ? word[0] : word))
              .join(" ");
            const isPoints = item?.eventType.includes("point");
            return (
              <p
                key={item.id}
                className="text-[12px] md:text-sm lg:text-[16px] font-semibold"
              >
                {convertedName}{" "}
                {isPoints ? item?.value + "pts" : item?.eventType}
              </p>
            );
          })
        )}
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        {boosts?.length === 0 && (
          <LoaderCircle className="animate-spin h-10 text-center w-full" />
        )}
        <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6">
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
                    bgColor="bg-white"
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
          disabled={selectedBoost.length === 0}
          className={`h-9 px-4 text-sm rounded-full bg-[#FB7B1F] text-white font-medium cursor-pointer ${
            selectedBoost.length === 0 && "bg-gray-500"
          } `}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Buy Boost"}
        </button>
      </div>
    </div>
  );
};

export default CurrentEvent;
