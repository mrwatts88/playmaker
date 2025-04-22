"use client";

import React, { createContext, useContext, useState } from "react";

interface Contestant {
  id: number;
  name: string;
  sxp: number;
  xp: number;
  points: number;
  rebounds: number;
  assists: number;
}

interface FeedItem {
  id: number;
  text: string;
  timestamp: number;
}

interface ContestContextType {
  contestants: Contestant[];
  currentContestantIndex: number;
  feedItems: FeedItem[];
  addFeedItem: (text: string) => void;
  startDemoMode: () => void;
  stopDemoMode: () => void;
}

const defaultContext: ContestContextType = {
  contestants: [
    {
      id: 0,
      name: "MATT",
      sxp: 100,
      xp: 50,
      points: 8.5,
      rebounds: 7.2,
      assists: 6.8,
    },
    {
      id: 1,
      name: "PHIL",
      sxp: 90,
      xp: 45,
      points: 7.8,
      rebounds: 5.4,
      assists: 4.2,
    },
    {
      id: 2,
      name: "AMY",
      sxp: 85,
      xp: 40,
      points: 6.2,
      rebounds: 4.8,
      assists: 3.5,
    },
    {
      id: 3,
      name: "JOE",
      sxp: 95,
      xp: 48,
      points: 8.2,
      rebounds: 6.5,
      assists: 5.9,
    },
    {
      id: 4,
      name: "TIM",
      sxp: 98,
      xp: 49,
      points: 7.5,
      rebounds: 6.2,
      assists: 8.9,
    },
    {
      id: 5,
      name: "KELLY",
      sxp: 92,
      xp: 46,
      points: 4.8,
      rebounds: 3.1,
      assists: 5.7,
    },
  ],
  currentContestantIndex: 0,
  feedItems: [
    { id: 1, text: "P. Mahomes throws 45yd TD pass", timestamp: Date.now() - 5000 },
    { id: 2, text: "J. Allen rushes for 12yds", timestamp: Date.now() - 4000 },
    { id: 3, text: "T. Hill catches 30yd pass", timestamp: Date.now() - 3000 },
    { id: 4, text: "C. McCaffrey scores rushing TD", timestamp: Date.now() - 2000 },
    { id: 5, text: "J. Jefferson 20yd reception", timestamp: Date.now() - 1000 },
  ],
  addFeedItem: () => {},
  startDemoMode: () => {},
  stopDemoMode: () => {},
};

const ContestContext = createContext<ContestContextType>(defaultContext);

const DEMO_FEED_ITEMS = [
  "P. Mahomes throws 45yd TD pass",
  "J. Allen rushes for 12yds",
  "T. Hill catches 30yd pass",
  "C. McCaffrey scores rushing TD",
  "J. Jefferson 20yd reception",
  "D. Prescott completes 25yd pass",
  "T. Kelce makes 15yd catch",
  "A. Ekeler breaks for 18yd run",
  "D. Adams catches 22yd TD",
  "J. Hurts scrambles for 10yds",
];

export const ContestProvider = ({ children }: { children: React.ReactNode }) => {
  const [contestants, setContestants] = useState<Contestant[]>(defaultContext.contestants);
  const [currentContestantIndex, setCurrentContestantIndex] = useState(0);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(defaultContext.feedItems);
  const [demoInterval, setDemoInterval] = useState<NodeJS.Timeout | null>(null);

  // Start demo mode automatically
  React.useEffect(() => {
    startDemoMode();
    return () => {
      if (demoInterval) {
        clearInterval(demoInterval);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const addFeedItem = (text: string) => {
    const newItem = {
      id: Date.now(),
      text,
      timestamp: Date.now(),
    };
    setFeedItems((prev) => [...prev, newItem].slice(-5)); // Keep last 5 items, newest at the end
  };

  const updateRandomStats = () => {
    setContestants((prev) =>
      prev.map((contestant) => ({
        ...contestant,
        sxp: contestant.sxp + Math.floor(Math.random() * 5),
        xp: contestant.xp + Math.floor(Math.random() * 3),
        points: Number(Math.min(9.9, Math.max(1.0, contestant.points + (Math.random() * 0.5 - 0.25))).toFixed(1)),
        rebounds: Number(Math.min(9.9, Math.max(1.0, contestant.rebounds + (Math.random() * 0.3 - 0.15))).toFixed(1)),
        assists: Number(Math.min(9.9, Math.max(1.0, contestant.assists + (Math.random() * 0.3 - 0.15))).toFixed(1)),
      }))
    );
  };

  const startDemoMode = () => {
    if (demoInterval) return; // Already running

    const interval = setInterval(() => {
      updateRandomStats();
      const randomFeedItem = DEMO_FEED_ITEMS[Math.floor(Math.random() * DEMO_FEED_ITEMS.length)];
      addFeedItem(randomFeedItem);
    }, 3000); // Update every 3 seconds

    setDemoInterval(interval);
  };

  const stopDemoMode = () => {
    if (demoInterval) {
      clearInterval(demoInterval);
      setDemoInterval(null);
    }
  };

  return (
    <ContestContext.Provider
      value={{
        contestants,
        currentContestantIndex,
        feedItems,
        addFeedItem,
        startDemoMode,
        stopDemoMode,
      }}
    >
      {children}
    </ContestContext.Provider>
  );
};

export const useContest = () => {
  const context = useContext(ContestContext);
  if (!context) {
    throw new Error("useContest must be used within a ContestProvider");
  }
  return context;
};
