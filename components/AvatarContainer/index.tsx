import Image from "next/image";

export const AvatarContainer = ({ isWinner }: { isWinner?: boolean }) => {
  return (
    <div className="relative z-10">
      <div
        className={`w-[190px] h-[190px] rounded-t-2xl rounded-b-sm border-2 bg-[#0A0A0A] shadow-[0_15px_15px_-5px_rgba(0,0,0,0.95)] ${
          isWinner ? "border-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]" : "border-gray-800"
        }`}
      >
        <div
          className="absolute w-[186px] h-[250px] -top-[59px]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))" }}
        >
          <Image src="/images/avatar.png" alt="Player avatar" fill className="object-cover object-[center_25%]" priority />
        </div>
      </div>
    </div>
  );
};
