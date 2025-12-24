"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { IAbout } from "@/types/type";
import { InViewContainer } from "@/components/atoms";
import About from "./About";

const DigitalRain = dynamic(() => import("@/components/atoms").then(mod => ({ default: mod.DigitalRain })), {
  ssr: false,
  loading: () => <div className="w-[225px] h-[225px] xsm:w-[290px] xsm:h-[290px] md:w-[375px] md:h-[375px] xl:w-[425px] xl:h-[425px]" />,
});

const Circle = dynamic(() => import("@/components/atoms").then(mod => ({ default: mod.Circle })), {
  ssr: false,
  loading: () => <div className="w-[225px] h-[225px] xsm:w-[290px] xsm:h-[290px] md:w-[375px] md:h-[375px] xl:w-[425px] xl:h-[425px]" />,
});

const Hero = (about: IAbout) => {
  return (
    <InViewContainer className="flex flex-col mdl:flex-row gap-12 items-center pt-5 pb-20 xl:pt-10 xl:pb-24">
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
    </InViewContainer>
  );
};

export default Hero;
