import Link from "next/link";
import { Button } from "../ui/button";
import { Nav } from "../organisms/Nav";
import { MobileNav } from "../organisms/MobileNav";

export const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            DaveSVard
            <span className="text-accent">.</span>
          </h1>
        </Link>
        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>Hire me</Button>
          </Link>
        </div>
        {/* Mobile navigation */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
