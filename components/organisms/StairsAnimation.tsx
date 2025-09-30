import { stairAnimation } from "@/lib/motion";
import { motion } from "framer-motion";

export const StairsAnimation = () => {
  const reverseIndex = (index: number): number => {
    const totalSteps = 6;
    return totalSteps - index;
  };

  return (
    <>
      {[...Array(6)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.1,
            }}
            onAnimationComplete={() => {
              document.body.style.overflow = "auto";
            }}
            className="h-full w-full bg-emerald-400 relative"
          />
        );
      })}
    </>
  );
};
