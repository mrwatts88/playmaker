import { Boost } from "@/types/db";
import {
  Ban,
  FlagTriangleRight,
  Handshake,
  LoaderPinwheel,
  RefreshCw,
  RotateCcw,
  ShoppingBasket,
  SquareArrowDownLeft,
  Volleyball,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

const SelectBoost: React.FC<{
  boost: Boost;
  bgColor?: string;
  setSelectedBoost: Dispatch<SetStateAction<string[]>>;
  selectedBoost: string[];
}> = ({ boost, bgColor, setSelectedBoost, selectedBoost }) => {

  const handleAddBoost = (boostId: string) => {
    const isAlreadyIncluded = selectedBoost.includes(boostId);
    if (isAlreadyIncluded) {
      const filteredArray = selectedBoost.filter((item) => item !== boostId);
      setSelectedBoost(filteredArray);
    } else {
      setSelectedBoost([...selectedBoost, boostId]);
    }
  };

  const isSelected = selectedBoost.includes(boost?.id);
  const isTeam = boost?.type === "team";

  useEffect(() => {
    setSelectedBoost([]);
  }, [boost, setSelectedBoost]);

  const getIconPath = () => {
    const stat = boost?.stat;
    switch (stat) {
      case "points":
        return (
          <Volleyball className={` w-6 h-6 md:w-8 md:h-8`} />
        );
      case "rebounds":
        return <RotateCcw className={` w-6 h-6 md:w-8 md:h-8`} />;
      case "assists":
        return <Handshake className={` w-6 h-6 md:w-8 md:h-8`} />;
      case "blocks":
        return <Ban className={` w-6 h-6 md:w-8 md:h-8`} />;
      case "steals":
        return <RefreshCw className={` w-6 h-6 md:w-8 md:h-8`} />;
      case "turnover":
        return (
          <SquareArrowDownLeft
            className={` w-6 h-6 md:w-8 md:h-8`}
          />
        );
      case "3 pointers":
        return (
          <ShoppingBasket className={` w-6 h-6 md:w-8 md:h-8`} />
        );
      case "foul":
        return (
          <FlagTriangleRight
            className={` w-6 h-6 md:w-8 md:h-8`}
          />
        );
      case "free throw made":
        return (
          <LoaderPinwheel className={` w-6 h-6 md:w-8 md:h-8`} />
        );
      default:
        return (
          <div
            className={`rounded-full bg-white w-6 h-6 md:w-8 md:h-8`}
          />
        );
    }
  };

  return (
    <div
      onClick={() => handleAddBoost(boost.id)}
      className={`w-10 h-10 md:h-12 md:w-12 rounded-full flex items-center justify-center border-3 ${
        isTeam ? "border-[#FB7B1F]" : "border-[#4ED7F1]"
      } ${isSelected ? (isTeam ? "bg-[#FB7B1F]" : "bg-[#4ED7F1]") : bgColor}`}
    >
      <div className="w-6 h-6 md:w-8 md:h-8 text-gray-900">{getIconPath()}</div>
    </div>
  );
};

export default SelectBoost;
