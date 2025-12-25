"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  ThemeSwitch,
  ThemeSettingsModal,
} from "@/components/atoms";
import clsx from "clsx";
import Link from "next/link";

const MobileNavigation = ({
  links,
  addOverflowHidden,
}: {
  addOverflowHidden: () => void;
  links: { name: string; path: string }[];
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevent hydration mismatch by not rendering Sheet during SSR
  if (!mounted) {
    return (
      <button
        type="button"
        className="flex justify-center items-center"
        aria-label="Menu"
      >
        <CiMenuFries className="text-4xl text-accent" />
      </button>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center" aria-label="Menu">
        <CiMenuFries className="text-4xl text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Main navigation menu with links to different pages of the website
        </SheetDescription>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <ThemeSettingsModal />
        </div>
        <nav className="flex flex-col justify-center items-center gap-8 mt-32">
          {links.map((link, index) => {
            return (
              <Link
                key={`${link.path}-${index}`}
                href={link.path}
                className={clsx(
                  "text-xl capitalize hover:text-accent-hover",
                  link.path == pathname &&
                    "tetx-accent border-b-2 border-accent"
                )}
                onClick={() => {
                  handleLinkClick();
                  addOverflowHidden();
                }}
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
