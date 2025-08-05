"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";
import { IStats } from "@/types/type";
import { CardRotateAnimationWrapper } from "@/components/atoms/CardRotateAnimationWrapper";

import CountUp from "react-countup";
import clsx from "clsx";

const Stats = ({
  className,
  stats,
}: {
  className?: string;
  stats: IStats[];
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0.5 relative pb-10",
        className
      )}
    >
      {stats.map(({ value, infoText }, index) => (
        <CardRotateAnimationWrapper index={index} key={index} className={cn("w-full", index === 0 && "sm:col-span-2 md:col-span-1")}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.5 + index * 0.1,
              duration: 0.4,
              ease: "easeIn",
              type: "tween",
            }}
            onMouseMove={onMouseMove}
            className="border border-black/20 dark:border-white/20 p-5 group/card rounded-md w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
          >
            <CardPattern
              mouseX={mouseX}
              mouseY={mouseY}
              randomString={randomString}
            />
            <div className="relative z-10 flex items-center justify-center">
              <div className="flex flex-row gap-x-10 items-center justify-center">
                <CountUp
                  end={value}
                  duration={5}
                  delay={2}
                  className="text-4xl xl:text-6xl font-extrabold"
                />
                <p
                  className={clsx(
                    "leading-snug dark:text-white text-black",
                    infoText.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  )}
                >
                  {infoText}
                </p>
              </div>
            </div>
          </motion.div>
        </CardRotateAnimationWrapper>
      ))}
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-md [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-md bg-gradient-to-r from-green-400 to-accent opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-md opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap dark:text-white text-black font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default Stats;