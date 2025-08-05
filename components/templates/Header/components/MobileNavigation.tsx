"use client";

import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import clsx from "clsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/atoms";
import { FiSun, FiMoon } from "react-icons/fi";

const MobileNavigation = ({
  links,
}: {
  links: { name: string; path: string }[];
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-4xl text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {mounted && (
          <div className="flex items-center gap-4">
            <FiSun
              onClick={() => setTheme("light")}
              className={clsx(
                "cursor-pointer transition-colors",
                resolvedTheme === "light"
                  ? "text-yellow-500"
                  : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              )}
              size={28}
            />
            <FiMoon
              onClick={() => setTheme("dark")}
              className={clsx(
                "cursor-pointer transition-colors",
                resolvedTheme === "dark"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              )}
              size={28}
            />
          </div>
        )}
        <nav className="flex flex-col justify-center items-center gap-8 mt-32">
          {links.map((link) => {
            return (
              <Link
                key={uuidv4()}
                href={link.path}
                className={clsx(
                  "text-xl capitalize hover:text-accent-hover",
                  link.path == pathname &&
                    "tetx-accent border-b-2 border-accent"
                )}
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
