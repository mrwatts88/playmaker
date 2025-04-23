"use client";

import { useContest } from "@/contexts/ContestContext";
import Link from "next/link";

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

      {/* Manager Button */}
      <div className="mt-4 flex justify-center">
        <Link
          href="/contestants/1"
          className="flex items-center gap-2 px-4 py-2 bg-[#FFD84D] text-black rounded-lg hover:bg-[#FFE066] transition-colors shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          <span>Manager View</span>
        </Link>
      </div>
    </div>
  );
};
