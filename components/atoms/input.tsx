import { cn } from "@/lib/utils";
import { Label } from ".";
import { forwardRef, useEffect, useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue
    );

    useEffect(() => {
      setHasValue(!!props.value);
    }, [props.value]);

    return (
      <div className="relative w-full">
        {label && (
          <Label
            label={label}
            isFocused={isFocused}
            hasValue={hasValue}
            error={error}
          />
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "peer flex h-13 w-full rounded-md bg-white dark:bg-primary px-3 pt-5 pb-2 text-sm border placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none transition-all duration-200 shadow-sm",
            !error && (isFocused || hasValue)
              ? "border-accent"
              : error
              ? "border-red-500"
              : "border-gray-200 dark:border-gray-700",
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
