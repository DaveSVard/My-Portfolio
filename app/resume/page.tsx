"use client";

import { motion } from "framer-motion";
import { data } from "@/constants";
import { ResumeTabs } from "@/components/organisms/ResumeTabs";

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2,
          duration: 0.4,
          ease: "easeIn",
        },
      }}
      className="min-h-[80vh] py-12 xl:py-8"
    >
      <div className="sectionContainer">
        {data.resume && <ResumeTabs {...data.resume} />}
      </div>
    </motion.div>
  );
}
