"use client";

import { useContest } from "@/contexts/ContestContext";

export const GameFeed = () => {
  const { feedItems } = useContest();

  return (
    <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]">
      {/* Logo */}
      <div className="mb-[-50px] flex justify-center">
        <img src="/images/DraftXP-logo.png" alt="DraftXP Logo" className="w-auto h-[200px] object-contain" />
      </div>

      {/* Feed items with opacity gradient */}
      <div className="h-[200px] overflow-y-auto scrollbar-hide">
        {feedItems.map((item, index) => (
          <div
            key={item.id}
            className={`text-[#FFD84D] py-1 px-2 text-center ${index === feedItems.length - 1 ? "text-lg" : "text-sm"}`}
            style={{
              opacity: Math.max(0.2, 1 - (feedItems.length - 1 - index) * 0.15), // Fade from 1 to 0.2 from bottom to top
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};
