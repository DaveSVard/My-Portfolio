"use client"

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export const PageSwitchTransition = ({ children }: { children: ReactNode }) => {
  const pathnmae = usePathname();

  return (
    <AnimatePresence>
      <div key={pathnmae}>
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
          className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
        ></motion.div>
        {children}
      </div>
    </AnimatePresence>
  );
};
