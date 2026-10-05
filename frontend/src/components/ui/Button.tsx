"use client";

import * as React from "react";
import { CircleNotch } from "@phosphor-icons/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "text-xs px-3 py-1.5 rounded-[4px] gap-1.5 font-normal tracking-tight",
      md: "text-xs sm:text-sm px-4 py-2 rounded-[4px] gap-2 font-normal tracking-tight",
      lg: "text-sm sm:text-base px-5 py-2.5 rounded-[4px] gap-2.5 font-normal tracking-tight",
    }[size];

    const variantClasses = {
      primary:
        "bg-zinc-950 text-white border border-zinc-950 hover:bg-zinc-800 shadow-xs active:translate-y-[0.5px]",
      secondary:
        "bg-white text-zinc-900 border border-zinc-200/90 hover:bg-zinc-50 hover:border-zinc-300 shadow-xs active:translate-y-[0.5px]",
      outline:
        "bg-transparent text-zinc-700 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-950 active:translate-y-[0.5px]",
      ghost:
        "bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 active:translate-y-[0.5px]",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center cursor-pointer select-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <CircleNotch className="w-3.5 h-3.5 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
