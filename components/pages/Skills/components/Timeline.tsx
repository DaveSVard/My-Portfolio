"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useTransform, motion } from "motion/react";
import { AnimatePresence } from "framer-motion";
import { skills } from "@/constants";
import { cn } from "@/lib/utils";

const CanvasRevealEffect = dynamic(() => import("@/components/atoms/CanvasRevealEffect").then(mod => ({ default: mod.CanvasRevealEffect })), {
  ssr: false,
});

const Timeline = () => {
  const {
    technolgies,
  }: {
    technolgies: {
      id: number;
      info: string;
      logos: {
        id: number;
        type: string;
        title: string;
        Icon?: React.ReactNode;
      }[];
    }[];
  } = skills;
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <div className="pb-48">
      <div className="max-w-4xl mx-auto px-6 md:px-8 w-full" ref={containerRef}>
        <div ref={ref} className="relative md:pb-20">
          {technolgies.map((skill, index) => {
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start pl-8 md:pl-0 pt-10 md:pt-20 gap-5 md:gap-10"
              >
                <div className="static md:sticky flex flex-col md:flex-row z-40 items-center top-40 self-start">
                  <div className="md:h-10 md:w-10 absolute left-0 md:left-3 rounded-full bg-white dark:bg-primary flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                  </div>

                  <div className="md:min-w-56 md:max-w-56 md:pl-25 flex items-center justify-center flex-wrap gap-2">
                    {skill.logos.map((logo, logoIndex) => {
                      const { Icon, type, title } = logo;
                      const tooltipId = `${skill.id}-${logo.id}`;
                      const isTooltipActive = activeTooltip === tooltipId;

                      const handleMouseEnter = () =>
                        setActiveTooltip(tooltipId);
                      const handleMouseLeave = () => setActiveTooltip(null);

                      const handleTouchStart = () => {
                        setActiveTooltip(tooltipId);
                        setTimeout(() => setActiveTooltip(null), 2000);
                      };

                      return (
                        <div
                          key={logoIndex}
                          className="relative flex items-center justify-center"
                        >
                          {type === "icon" && Icon && (
                            <div
                              className="group p-2 sm:p-3 rounded-full bg-accent/10 dark:bg-accent/20 backdrop-blur-lg border border-accent/50"
                              onMouseEnter={
                                !isTouchDevice() ? handleMouseEnter : undefined
                              }
                              onMouseLeave={
                                !isTouchDevice() ? handleMouseLeave : undefined
                              }
                              onTouchStart={
                                isTouchDevice() ? handleTouchStart : undefined
                              }
                            >
                              {Icon}

                              <div
                                className={cn(
                                  "w-max absolute -top-11 md:-top-9 left-1/2 -translate-x-1/2 py-1 px-2.5 rounded-xl bg-primary dark:bg-white z-50",
                                  isTooltipActive
                                    ? "block"
                                    : "hidden group-hover:block"
                                )}
                              >
                                <span className="font-family-primary text-white dark:text-black text-xs leading-3.5">
                                  {title}
                                </span>
                              </div>
                            </div>
                          )}
                          {type === "text" && title && (
                            <div
                              key={index}
                              className="group sm:min-w-14.5 sm:min-h-14.5 min-w-10.5 min-h-10.5 flex items-center justify-center rounded-full bg-accent/10 dark:bg-accent/20 backdrop-blur-lg border border-accent/50"
                            >
                              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 group-hover:text-black  dark:group-hover:text-white transition-all duration-200">
                                {title}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative w-full border border-black/20 dark:border-white/20 p-2 md:p-3.5">
                  <Card title={skill.info}>
                    <CanvasRevealEffect
                      animationSpeed={5.1}
                      containerClassName="bg-emerald-900"
                    />
                  </Card>
                </div>
              </div>
            );
          })}

          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-2 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-linear-to-t from-green-300 via-accent to-transparent from-0% via-10% rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

const Card = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/20 group/canvas-card flex items-center justify-center dark:border-white/20 w-full p-3 md:p-4 relative h-60"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <h2
          className={cn(
            "text-center text-sm sm:text-base md:text-lg relative z-10 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200",
            hovered
              ? "text-white dark:text-white"
              : "text-black dark:text-white"
          )}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};
