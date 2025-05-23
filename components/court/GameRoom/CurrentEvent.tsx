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
}

const CurrentEvent: React.FC<EventProps> = ({
  gameEvents,
  boosts,
  contestantId,
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
      <div className="text-gray-400 text-xl lg:text-3xl mb-1 lg:mb-8">Current Event</div>
      <div className="flex flex-col gap-y-1 md:gap-y-2 lg:gap-y-4">
        {gameEvents?.length === 0 ? (
          <LoaderCircle className="animate-spin h-10 text-center w-full" />
        ) : (
          gameEvents?.map((item) => {
            return (
              <p key={item.id} className="text-sm lg:text-[16px]">
                <strong className="text-[#FB7B1F]">{item.eventType}</strong>{" "}
                event performed by{" "}
                <strong className="text-[#FB7B1F]">{item.athlete.name}</strong>
              </p>
            );
          })
        )}
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <h3 className="hidden md:block">Available Boosts</h3>
        {boosts?.length === 0 && (
          <LoaderCircle className="animate-spin h-10 text-center w-full" />
        )}
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
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
                    bgColor="bg-[#9198a8]"
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

export default CurrentEvent;
