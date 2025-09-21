import { IFadeIn } from "@/types/type";

export const stairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

export const fadeIn = ({ direction, type, delay, duration }: IFadeIn) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const opacityAnimation = ({
  delay,
  duration,
  type,
  ease,
}: {
  delay: number;
  duration: number;
  type: string;
  ease: string;
}) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: ease,
    },
  },
});
