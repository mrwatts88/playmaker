"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
    router.push("/verify");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -m-2">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg border border-gray-200 bg-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-3 rounded-lg border border-gray-200 bg-white"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <button type="submit" className="mt-4 bg-[#FB7B1F] text-white px-6 py-3 rounded-lg text-lg font-semibold">
              CONTINUE
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-[#FB7B1F] font-medium">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
