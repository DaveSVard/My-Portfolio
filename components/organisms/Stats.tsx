"use client";
import { IStats } from "@/types/type";
import { v4 as uuidv4 } from "uuid";
import { StatsCard } from "../atoms/StatsCard";
import { motion } from "framer-motion";

interface IStatsProps {
  stats: IStats[];
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
