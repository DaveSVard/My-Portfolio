"use client";
import { IStats } from "@/types/type";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import CountUp from "react-countup";
import clsx from "clsx";
import { CardRotateAnimationWrapper } from "../atoms/CardRotateAnimationWrapper";

interface IStatsProps {
  stats: IStats[];
}

interface IStatsCard {
  value: number;
  infoText: string;
  index: number;
}

export const Stats: React.FC<IStatsProps> = ({ stats }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.25, once: true }}
      className="grid xsm:grid-cols-2 mdl:grid-cols-4 gap-6 pt-10 pb-12"
    >
      {stats.map((elm, index) => {
        return <StatsCard {...elm} index={index} key={uuidv4()} />;
      })}
    </motion.div>
  );
};

const StatsCard = ({ infoText, value, index }: IStatsCard) => {
  return (
    <CardRotateAnimationWrapper index={index}>
      <div className="bg-grayGradient backdrop-blur-md shadow-lg p-4 rounded-2xl">
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
      </div>
    </CardRotateAnimationWrapper>
  );
};
