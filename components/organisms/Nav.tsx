"use client";

import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { data } from "@/constants";

import Link from "next/link";
import clsx from "clsx";

export const Nav = () => {
  const pathname = usePathname();
  
  return (
    <nav className="flex gap-8">
      {data.navigationLinks.map((link) => {
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
