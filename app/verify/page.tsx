"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Verify() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual verification logic
    router.push("/contests");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/login" className="p-2 -m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex items-center">
            <span className="font-bold text-xl">DRAFT</span>
            <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4" style={{ backgroundColor: "var(--background-color)" }}>
        <div className="max-w-md mx-auto mt-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Enter Verification Code</h2>
            <p className="text-gray-600">We&apos;ve sent a verification code to your phone number</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-gray-700 font-medium">
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="p-3 rounded-lg border border-gray-200 bg-white text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <button type="submit" className="mt-4 bg-[#FB7B1F] text-white px-6 py-3 rounded-lg text-lg font-semibold">
              VERIFY
            </button>

            <button
              type="button"
              className="mt-2 text-[#FB7B1F] font-medium text-center"
              onClick={() => {
                /* TODO: Implement resend logic */
              }}
            >
              Resend Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
