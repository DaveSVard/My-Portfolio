"use client";

import { useEffect, useState, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  Transition,
} from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  initial?: { opacity: number; y: number };
  animate?: { opacity: number; y: number };
  transition?: Transition;
  enablePattern?: boolean;
  patternSize?: number;
  randomStringLength?: number;
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

export function CardPattern({
  mouseX,
  mouseY,
  randomString,
  patternSize = 250,
}: {
  mouseX: any;
  mouseY: any;
  randomString: string;
  patternSize?: number;
}) {
  let maskImage = useMotionTemplate`radial-gradient(${patternSize}px at ${mouseX}px ${mouseY}px, white, transparent)`;
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

export default function AnimatedCard({
  children,
  className,
  initial = { opacity: 0, y: 100 },
  animate = { opacity: 1, y: 0 },
  transition = {
    delay: 0,
    duration: 0.4,
    ease: "easeIn",
    type: "tween",
  },
  enablePattern = true,
  patternSize = 250,
  randomStringLength = 1500,
}: AnimatedCardProps) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    if (enablePattern) {
      let str = generateRandomString(randomStringLength);
      setRandomString(str);
    }
  }, [enablePattern, randomStringLength]);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    if (enablePattern) {
      const str = generateRandomString(randomStringLength);
      setRandomString(str);
    }
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      onMouseMove={onMouseMove}
      className={cn(
        "border border-black/20 dark:border-white/20 p-5 group/card rounded-md w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full",
        className
      )}
    >
      {enablePattern && (
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
          patternSize={patternSize}
        />
      )}
      <div className="relative z-10 flex items-center justify-center w-full">
        {children}
      </div>
    </motion.div>
  );
}
