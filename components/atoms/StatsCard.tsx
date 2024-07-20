"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import CountUp from "react-countup";
import clsx from "clsx";
import { MouseEvent } from "react";
import { fadeIn } from "@/lib/motion";

interface IStatsCard {
  value: number;
  infoText: string;
  index: number;
}

export const StatsCard = ({ infoText, value, index }: IStatsCard) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );

  const getMousePosition = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPosition = mouseX / width - 0.5;
    const yPosition = mouseY / height - 0.5;

    x.set(xPosition);
    y.set(yPosition);
  };

  const setMousePosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={getMousePosition}
      onMouseLeave={setMousePosition}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      variants={fadeIn({
        direction: "up",
        type: "tween",
        delay: index * 0.3 + 1,
        duration: 0.4,
      })}
      className="bg-grayGradient backdrop-blur-md shadow-lg p-4 rounded-2xl"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="flex items-center gap-4 inset-4 p-2 bg-white/10 rounded-xl place-content-center"
      >
        <CountUp
          end={value}
          duration={5}
          delay={2}
          className="text-4xl xl:text-6xl font-extrabold"
        />
        <p
          className={clsx(
            "leading-snug text-white/80",
            infoText.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
          )}
        >
          {infoText}
        </p>
      </div>
    </motion.div>
  );
};
