"use client";

import { cn } from "@/lib/utils";
import { IStats } from "@/types/type";
import { CardRotateAnimationWrapper } from "@/components/atoms/CardRotateAnimationWrapper";
import { AnimatedCard } from "@/components/atoms";

import CountUp from "react-countup";
import clsx from "clsx";

const Stats = ({
  className,
  stats,
}: {
  className?: string;
  stats: IStats[];
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0.5 relative pb-10",
        className
      )}
    >
      {stats.map(({ value, infoText }, index) => (
        <CardRotateAnimationWrapper index={index} key={index} className={cn("w-full", index === 0 && "sm:col-span-2 md:col-span-1")}>
          <AnimatedCard
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.5 + index * 0.1,
              duration: 0.4,
              ease: "easeIn",
              type: "tween",
            }}
          >
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
          </AnimatedCard>
        </CardRotateAnimationWrapper>
      ))}
    </div>
  );
};

export default Stats;