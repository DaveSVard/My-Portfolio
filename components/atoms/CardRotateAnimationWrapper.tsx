import { fadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

interface ICardRotateAnimationWrapper {
    index: number;
    children: React.ReactNode;
    className?: string;
}

export const CardRotateAnimationWrapper = ({ index, children, className } : ICardRotateAnimationWrapper) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 18, mass: 1.2 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 18, mass: 1.2 });

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
        willChange: "transform",
      }}
      variants={fadeIn({
        direction: "up",
        type: "tween",
        delay: index * 0.3 + 1,
        duration: 0.4,
      })}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};
