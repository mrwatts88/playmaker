"use client";

import { ContestProvider } from "@/contexts/ContestContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ContestProvider>{children}</ContestProvider>;
};
