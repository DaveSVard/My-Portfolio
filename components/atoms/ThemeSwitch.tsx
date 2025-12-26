"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import clsx from "clsx";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={clsx(
        "cursor-pointer relative w-15 h-8 rounded-full transition-colors duration-300 focus:outline-none",
        resolvedTheme === "dark"
          ? "bg-gradient-to-r from-gray-800 to-primary"
          : "bg-gradient-to-r from-yellow-300 to-yellow-500"
      )}
      style={{ minWidth: 64 }}
    >
      <span
        className={clsx(
          "absolute top-1 size-6 rounded-full shadow-md flex items-center justify-center transition-all duration-300",
          resolvedTheme === "dark"
            ? "translate-x-6 bg-primary left-3"
            : "translate-x-0 bg-yellow-400 left-1"
        )}
      >
        {resolvedTheme === "dark" ? (
          <FiMoon className="text-white text-lg" />
        ) : (
          <FiSun className="text-yellow-700 text-lg" />
        )}
      </span>
      {/* Decorative icons for both ends */}
      <span className="absolute left-1.75 top-1/2 -translate-y-1/2 pointer-events-none">
        <FiSun
          className={clsx(
            "text-lg transition-opacity",
            resolvedTheme === "dark"
              ? "opacity-40"
              : "opacity-100 text-yellow-700"
          )}
        />
      </span>
      <span className="absolute right-1.75 top-1/2 -translate-y-1/2 pointer-events-none">
        <FiMoon
          className={clsx(
            "text-lg transition-opacity",
            resolvedTheme === "dark" ? "opacity-100 text-white" : "opacity-40"
          )}
        />
      </span>
    </button>
  );
};

export default ThemeSwitch;
