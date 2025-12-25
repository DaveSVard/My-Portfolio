"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { header } from "@/constants";
import { DesktopNavigation, MobileNavigation } from "./components";

const Header = () => {
  const { links } = header;
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  const addOverflowHidden = () => {
    document.body.style.overflow = "hidden";
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="py-8 xl:py-8 dark:text-white text-black fixed w-full bg-white/70 dark:bg-primary/60 backdrop-blur-sm"
      style={{ zIndex: 100 }}
    >
      <div className="sectionContainer flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={addOverflowHidden}>
          <span className="text-2xl font-bold">
            David<span className="text-accent">.</span>
          </span>
        </Link>
        {/* Desktop navigation */}
        <div className="hidden lg:block">
          <DesktopNavigation
            addOverflowHidden={addOverflowHidden}
            links={links}
          />
        </div>
        {/* Mobile navigation */}
        <div className="lg:hidden">
          <MobileNavigation
            addOverflowHidden={addOverflowHidden}
            links={links}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
