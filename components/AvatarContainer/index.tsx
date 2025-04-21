import Image from "next/image";

export const AvatarContainer = ({ isWinner }: { isWinner?: boolean }) => {
  return (
    <div
      className={`w-[10em] h-[10em] rounded-t-2xl rounded-b-sm border-2 bg-[#0A0A0A] shadow-[0_1em_1em_-0.3em_rgba(0,0,0,0.95)] ${
        isWinner ? "border-yellow-500 shadow-[0_0_1em_rgba(245,158,11,0.8)]" : "border-gray-800"
      }`}
    >
      <div
        className="absolute w-[9.6em] h-[12.5em] -top-[3.3em]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 0.25em), calc(100% - 0.25em) 100%, 0.25em 100%, 0 calc(100% - 0.25em))",
        }}
      >
        <Image src="/images/avatar.png" alt="Player avatar" fill className="object-cover object-[center_25%]" priority />
      </div>
    </div>
  );
};
