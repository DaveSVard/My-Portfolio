"use client";
import { motion } from "framer-motion";
import { IAbout } from "@/types/type";
import { Circle, DigitalRain } from "@/components/atoms";
import About from "./About";

const Hero = (about: IAbout) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.25, once: true }}
      className="flex flex-col mdl:flex-row gap-12 items-center pt-5 pb-20 xl:pt-10 xl:pb-24"
    >
      <div className="flex-1 order-2 mdl:order-1">
        <About {...about} />
      </div>

      <div className="relative order-1 mdl:order-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 1.5,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
        >
          <div className="absolute top-0 left-0 m-1.5">
            <DigitalRain />
          </div>
        </motion.div>
        <div className="relative z-50 overflow-hidden">
          <Circle />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
