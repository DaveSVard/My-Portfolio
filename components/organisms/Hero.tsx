"use client";
import { motion } from "framer-motion";
import { About } from "../atoms/About";
import { Circle } from "../atoms/Circle";
import { IAbout } from "@/types/type";

export const Hero = (about: IAbout) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.25, once: true }}
      className="flex flex-col mdl:flex-row gap-12 items-center pt-4 xl:pt-8 xl:pb-24"
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
          className="absolute top-10 xsm:top-14 md:top-16 left-2/3	-translate-x-2/3 xl:left-3/4 xl:-translate-x-3/4 flex items-center justify-center"
        >
          <span className="font-prata relative text-[175px] leading-[175px]  xsm:text-[225px] xsm:leading-[225px] md:text-[275px] md:leading-[275px] xl:text-[350px] xl:leading-[350px]">
            D
          </span>
        </motion.div>
        <Circle />
      </div>
    </motion.div>
  );
};
