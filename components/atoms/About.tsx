import { FaFileDownload } from "react-icons/fa";
import { Button } from "./button";
import { Social } from "./Social";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { IAbout } from "@/types/type";

export const About = ({ specialization, name, interest }: IAbout) => {
  return (
    <div className="text-center mdl:text-left">
      <motion.span
        variants={fadeIn({
          direction: "right",
          type: "tween",
          delay: 1.5,
          duration: 0.4,
        })}
        className="text-xl"
      >
        {specialization}
      </motion.span>
      <motion.h1
        variants={fadeIn({
          direction: "right",
          type: "tween",
          delay: 1.6,
          duration: 0.4,
        })}
        className="h1 mt-4"
      >
        Hello I&apos;m {name}
      </motion.h1>
      <motion.p
        variants={fadeIn({
          direction: "right",
          type: "tween",
          delay: 1.7,
          duration: 0.4,
        })}
        className="max-w-2xl mdl:max-w-lg mt-4 xl:mt-7"
      >
        {interest}
      </motion.p>
      <motion.div
        variants={fadeIn({
          direction: "right",
          type: "tween",
          delay: 1.8,
          duration: 0.4,
        })}
        className="flex flex-col sm:flex-row justify-center mdl:justify-start items-center gap-6 xl:gap-8 mt-4"
      >
        <Button
          variant="outline"
          size="md"
          className="uppercase flex items-center gap-2"
        >
          <span>Download CV</span>
          <FaFileDownload className="text-xl" />
        </Button>

        <Social
          containerClassName="flex gap-6"
          iconClassName="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
        />
      </motion.div>
    </div>
  );
};
