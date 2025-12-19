import { cn } from "@/lib/utils";
import React from "react";

const label = ({
  label,
  isFocused,
  hasValue,
  error,
  htmlFor,
}: {
  label: string;
  isFocused: boolean;
  hasValue: boolean;
  error?: string;
  htmlFor?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "absolute left-3 top-4 z-10 px-1 rounded-sm bg-white dark:bg-primary transition-all duration-200 pointer-events-none",
        !error && (isFocused || hasValue)
          ? "p-1 text-xs -top-2.25 left-2 bg-white dark:bg-primary font-medium border border-accent text-accent"
          : error
            ? "p-1 text-xs -top-2.25 left-2 bg-white dark:bg-primary font-medium border border-red-500 text-red-500"
          : "text-sm border border-transparent text-gray-500 dark:text-gray-400"
      )}
    >
      {label}
    </label>
  );
};

export default label;
