import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const InViewContainer = ({
  children,
  className,
  viewport = { amount: 0.25, once: true },
}: {
  children: React.ReactNode;
  className?: string;
  viewport?: {
    amount?: number;
    once?: boolean;
  };
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};

export default InViewContainer;
