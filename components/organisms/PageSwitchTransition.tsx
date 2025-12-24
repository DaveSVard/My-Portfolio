"use client"

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export const PageSwitchTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              delay: 1,
              duration: 0.025,
              ease: "easeInOut",
            },
          }}
          className="h-screen w-screen fixed dark:bg-primary bg-white top-0 pointer-events-none"
          style={{
            willChange: "opacity",
            zIndex: 9997,
          }}
        ></motion.div>
        {children}
      </div>
    </AnimatePresence>
  );
};
