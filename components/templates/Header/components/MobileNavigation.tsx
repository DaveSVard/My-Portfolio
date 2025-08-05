"use client";

import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import clsx from "clsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/atoms";

const MobileNavigation = ({
  links,
}: {
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