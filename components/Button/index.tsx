import { FC } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "add" | "remove" | "submit";
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, variant = "add", onClick, className = "" }) => {
  const baseStyles = "flex items-center justify-center rounded-full";
  const variantStyles = {
    add: "bg-orange-500 text-white w-8 h-8 text-xl",
    remove: "bg-gray-200 text-gray-600 w-8 h-8 text-xl",
    submit: "bg-orange-500 text-white px-6 py-3 text-lg font-semibold",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {variant === "add" && "+"}
      {variant === "remove" && "-"}
      {variant === "submit" && children}
    </button>
  );
};

export default Button;
