"use client";

import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { ThemeSwitch } from "@/components/atoms";
import clsx from "clsx";
import Link from "next/link";

const DesktopNavigation = ({
  links,
}: {
  links: { name: string; path: string }[];
}) => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      <ThemeSwitch />

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
