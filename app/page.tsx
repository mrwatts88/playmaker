"use client";

import { useRouter } from "next/navigation";
import Header from "./components/Header";
import { useEffect } from "react";
import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/sessions");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Playmaker</h1>
          <p className="text-xl text-gray-700 mb-8">Create and join game sessions with friends</p>
          <button
            onClick={() => router.push("/login")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
