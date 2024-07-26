"use client"

import Link from "next/link";
import { MobileNav, Nav } from "../organisms";
import { data } from "@/constants";

export const Header = () => {
  return (
    <header className="py-8 xl:py-8 text-white">
      <div className="sectionContainer flex justify-between items-center">
        {/* Logo */}
        <Link href="/"> 
          <img src={data.logo.url} alt={data.logo.name} className="w-18 h-12" />
        </Link>
        {/* Desktop navigation */}
        <div className="hidden lg:block items-center gap-8">
          <Nav />
        </div>
        {/* Mobile navigation */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
