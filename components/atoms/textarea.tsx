import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from ".";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, value, defaultValue, onFocus, onBlur, onChange, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      value !== undefined
        ? !!value
        : !!defaultValue
    );

    useEffect(() => {
      if (value !== undefined) {
        setHasValue(!!value);
      }
    }, [value]);

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
        <textarea
          ref={ref}
          className={cn(
            "peer flex min-h-32 px-3 pt-6 pb-2 w-full resize-none bg-white dark:bg-primary rounded-lg border text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none transition-all duration-200 shadow-sm",
            !error && (isFocused || hasValue)
              ? "border-accent"
              : error
                ? "border-red-500"
              : "border-gray-200 dark:border-gray-700",
            className
          )}
          value={value}
          defaultValue={defaultValue}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            onChange?.(e);
          }}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
