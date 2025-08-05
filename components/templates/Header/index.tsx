"use client";

import Link from "next/link";
import { header } from "@/constants";
import { DesktopNavigation, MobileNavigation } from "./components";

const Header = () => {
  const { logo, links } = header;

  return (
    <header className="py-8 xl:py-8 dark:text-white text-black">
      <div className="sectionContainer flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold">
            David<span className="text-accent">.</span>
          </span>
          {/* <img src={logo.url} alt={logo.name} className="size-12 object-cover" /> */}
        </Link>
        {/* Desktop navigation */}
        <div className="hidden lg:block items-center gap-8">
          <DesktopNavigation links={links} />
        </div>
        {/* Mobile navigation */}
        <div className="lg:hidden">
          <MobileNavigation links={links} />
        </div>
      </div>
    </header>
  );
};

export default Header;
