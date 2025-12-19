"use client";

import { useState, useEffect, useId, useRef } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  words: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

const ContainerTextFlip = ({
  words,
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) => {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (words.length === 0) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    if (!context) {
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.whiteSpace = "nowrap";
      tempDiv.style.fontSize = "16px";
      tempDiv.style.fontWeight = "700";
      tempDiv.style.fontFamily = "var(--font-family-primary), monospace";
      document.body.appendChild(tempDiv);

      let max = 0;
      words.forEach((word) => {
        tempDiv.textContent = word;
        const wordWidth = tempDiv.offsetWidth;
        if (wordWidth > max) {
          max = wordWidth;
        }
      });

      const paddedMax = max + 60;
      setMaxWidth(paddedMax);
      setWidth(paddedMax);

      document.body.removeChild(tempDiv);
      return;
    }

    context.font = "700 16px var(--font-family-primary), monospace";
    let max = 0;
    words.forEach((word) => {
      const metrics = context.measureText(word);
      if (metrics.width > max) {
        max = metrics.width;
      }
    });

    const paddedMax = max + 60;
    setMaxWidth(paddedMax);
    setWidth(paddedMax);
  }, [words]);

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 60;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    if (textRef.current && maxWidth) {
      const textWidth = textRef.current.scrollWidth + 60;
      setWidth(Math.max(textWidth, maxWidth));
    } else if (textRef.current) {
      updateWidthForWord();
    }
  }, [currentWordIndex, maxWidth]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  const estimatedWidth = words.length > 0 ? words[0].length * 10 + 60 : 100;

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={width ? { width } : { width: estimatedWidth }}
      transition={{ duration: animationDuration / 2000, ease: "easeInOut" }}
      className={cn(
        "relative inline-block rounded-lg p-1 font-family-primary text-center text-base font-bold dark:text-black text-white",
        "dark:[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
        "dark:shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,0_4px_8px_#d1d5db]",
        "[background:linear-gradient(to_bottom,#374151,#1f2937)]",
        "shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.15),0_4px_6px_#00000052]",
        className,
      )}
      style={{
        willChange: "width",
        minWidth: maxWidth ? `${maxWidth}px` : `${estimatedWidth}px`,
      }}
      key={words[currentWordIndex]}
    >
        <motion.div
          transition={{
            duration: animationDuration / 1000,
            ease: "easeInOut",
          }}
          className={cn("inline-block", textClassName)}
          ref={textRef}
          layoutId={`word-div-${words[currentWordIndex]}-${id}`}
        >
          <motion.div className="inline-block">
            {words[currentWordIndex].split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: index * 0.02,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default ContainerTextFlip;