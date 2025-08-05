"use client";

import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

import Link from "next/link";
import clsx from "clsx";

const DesktopNavigation = ({
  links,
}: {
  links: { name: string; path: string }[];
}) => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex gap-8">
      {mounted && (
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className={clsx(
            "relative w-15 h-8 rounded-full transition-colors duration-300 focus:outline-none",
            resolvedTheme === "dark"
              ? "bg-gradient-to-r from-gray-700 to-primary"
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
                resolvedTheme === "dark"
                  ? "opacity-100 text-white"
                  : "opacity-40"
              )}
            />
          </span>
        </button>
      )}

      {links.map((link) => {
        return (
          <Link
            href={link.path}
            key={uuidv4()}
            className={clsx(
              "capitalize font-medium hover:text-accent-hover transition-all",
              link.path === pathname && "text-accent border-b-2 border-accent"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNavigation;
