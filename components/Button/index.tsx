import { FC } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "add" | "remove" | "submit" | "xp";
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, variant = "add", onClick, className = "" }) => {
  const baseStyles = "flex items-center justify-center rounded-full";
  const variantStyles = {
    add: "bg-orange-500 text-white w-8 h-8 text-xl",
    remove: "bg-gray-200 text-gray-600 w-8 h-8 text-xl",
    submit: "bg-orange-500 text-white px-6 py-3 text-lg font-semibold",
    xp: "bg-[#FFD84D] hover:bg-[#FFE066] text-black px-4 py-1 text-sm font-bold shadow-md border border-yellow-500 transition-colors",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {variant === "add" && "+"}
      {variant === "remove" && "-"}
      {variant === "submit" && children}
      {variant === "xp" && children}
    </button>
  );
};

export default Button;
