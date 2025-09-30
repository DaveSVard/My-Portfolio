"use client";

import { InViewContainer } from "@/components/atoms";
import { SkillsHero, Timeline } from "./components";
import { opacityAnimation } from "@/lib/motion";
import { motion } from "framer-motion";

const SkillsPage = () => {
  return (
    <div>
      <SkillsHero />

      <InViewContainer viewport={{ amount: 0, once: true }}>
        <motion.div
          variants={opacityAnimation({
            delay: 0.9,
            duration: 0.6,
            type: "tween",
            ease: "easeOut",
          })}
        >
          <Timeline />
        </motion.div>
      </InViewContainer>
    </div>
  );
};

export default SkillsPage;
