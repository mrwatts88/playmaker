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
      points: 25,
      rebounds: 10,
      assists: 8,
    },
    {
      id: 1,
      name: "PHIL",
      sxp: 90,
      xp: 45,
      points: 22,
      rebounds: 8,
      assists: 6,
    },
    {
      id: 2,
      name: "AMY",
      sxp: 85,
      xp: 40,
      points: 20,
      rebounds: 7,
      assists: 5,
    },
    {
      id: 3,
      name: "JOE",
      sxp: 95,
      xp: 48,
      points: 24,
      rebounds: 9,
      assists: 7,
    },
    {
      id: 4,
      name: "TIM",
      sxp: 98,
      xp: 49,
      points: 23,
      rebounds: 11,
      assists: 9,
    },
    {
      id: 5,
      name: "KELLY",
      sxp: 92,
      xp: 46,
      points: 21,
      rebounds: 6,
      assists: 8,
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
        points: contestant.points + Math.floor(Math.random() * 3),
        rebounds: contestant.rebounds + Math.floor(Math.random() * 2),
        assists: contestant.assists + Math.floor(Math.random() * 2),
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
