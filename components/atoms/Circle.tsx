"use client";

import { motion } from "framer-motion";

export const Circle = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.5, duration: 0.4, ease: "easeIn" },
      }}
      className="w-[225px] h-[225px] xsm:w-[290px] xsm:h-[290px] md:w-[375px] md:h-[375px] xl:w-[425px] xl:h-[425px]"
      fill="transparent"
      viewBox="0 0 506 506"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="253"
        cy="253"
        r="250"
        stroke="var(--accent-color)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ strokeDasharray: "24 10 0 0" }}
        animate={{
          strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
          rotate: [120, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.svg>
  );
};
