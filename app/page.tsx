"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center w-full max-w-[90vw]">Marketing Landing Page</h1>
      <div className="flex gap-4">
        <Link href="/login" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
          Login
        </Link>
        <Link href="/signup" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
