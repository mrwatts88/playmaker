import { Boost } from "@/types/db";
import {
  Ban,
  FlagTriangleRight,
  LoaderPinwheel,
  RefreshCw,
  ShoppingBasket,
  SquareArrowDownLeft,
} from "lucide-react";
import Image from "next/image";
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

  useEffect(() => {
    setSelectedBoost([]);
  }, [boost, setSelectedBoost]);

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
      onClick={() => handleAddBoost(boost.id)}
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        isSelected ? "bg-[#4ED7F1]" : bgColor
      }`}
    >
      <div className="w-8 h-8 text-gray-900">{getIconPath()}</div>
    </div>
  );
};

export default SelectBoost;
