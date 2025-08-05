"use client";

import { motion } from "framer-motion";
import React from "react";
import { resume } from "@/constants";
import { ResumeTabs } from "@/components/organisms/ResumeTabs";

const ResumePage = () => {
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
        {resume && <ResumeTabs {...resume} />}
      </div>
    </motion.div>
  );
};

export default ResumePage;
