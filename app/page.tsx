"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {/* Mobile/Portrait Image */}
        <Image src="/images/splash-screen.png" alt="Background" fill className="object-cover md:hidden" priority />
        {/* Desktop/Landscape Image */}
        <Image src="/images/splash-screen-desktop.png" alt="Background" fill className="object-cover hidden md:block" priority />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Logo */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-48 h-48">
            <Image src="/images/DraftXP-logo.png" alt="DraftXP Logo" fill className="object-contain" priority />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center pb-20 px-4">
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Link
              href="/login"
              className="w-full px-8 py-3 bg-[#FB7B1F] text-white font-semibold rounded-lg text-lg hover:bg-[#ea6c10] transition-colors text-center"
            >
              LOGIN
            </Link>
            <Link
              href="/signup"
              className="w-full px-8 py-3 border-2 border-[#FB7B1F] text-[#FB7B1F] font-semibold rounded-lg text-lg hover:bg-[#FB7B1F] hover:text-white transition-colors text-center"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
