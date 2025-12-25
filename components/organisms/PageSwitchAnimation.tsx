"use client";

import { usePathname } from "next/navigation";
import { StairsAnimation } from "./StairsAnimation";
import { AnimatePresence, motion } from "framer-motion";

export const PageSwitchAnimation = () => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div className="overflow-hidden" key={pathname}>
        <div
          className="h-screen w-screen overflow-hidden fixed top-0 left-0 right-0 pointer-events-none flex"
          style={{ zIndex: 9999 }}
        >
          <StairsAnimation />
        </div>

        <motion.div
          className="h-screen w-screen fixed dark:bg-primary bg-white top-0 pointer-events-none"
          style={{ zIndex: 9998 }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              delay: 0,
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
        ></motion.div>
      </div>
    </AnimatePresence>
  );
};
