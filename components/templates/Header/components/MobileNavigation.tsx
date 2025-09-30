"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

import { v4 as uuidv4 } from "uuid";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  ThemeSwitch,
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-4xl text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <ThemeSwitch />
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
