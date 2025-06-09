import { forwardRef, InputHTMLAttributes } from "react";

interface StyledInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  className?: string;
  error?: boolean;
  label?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, StyledInputProps>(
  (
    {
      className = "",
      disabled = false,
      error = false,
      label,
      helperText,
      startIcon,
      endIcon,
      type = "text",
      ...props
    },
    ref
  ) => {
    const baseClasses = `
    w-full px-3 py-2.5 text-sm
    bg-white border rounded-md
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-0
    placeholder:text-gray-400
  `;

    const stateClasses = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
      : disabled
      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
      : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/20";

    const paddingClasses = `
    ${startIcon ? "pl-10" : "pl-3"}
    ${endIcon ? "pr-10" : "pr-3"}
  `;

    return (
      <div className={`relative ${className}`}>
        {label && (
          <label
            className={`
          block text-sm font-medium mb-1.5
          ${
            error
              ? "text-red-700"
              : disabled
              ? "text-gray-400"
              : "text-gray-700"
          }
        `}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${stateClasses} ${paddingClasses}`}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>

        {helperText && (
          <p
            className={`
          mt-1.5 text-xs
          ${error ? "text-red-600" : "text-gray-500"}
        `}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
