"use client";

import { FaFileDownload } from "react-icons/fa";
import { Button, ContainerTextFlip } from "@/components/atoms";
import { Social } from "@/components/atoms";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { IAbout } from "@/types/type";

const About = ({ specialization, name, interest, words }: IAbout) => {
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
        className="h1 mt-4 xl:max-w-175"
      >
        Hello, I&apos;m <span className="text-accent">{name}</span>
      </motion.h1>
      <motion.div
        variants={fadeIn({
          direction: "right",
          type: "tween",
          delay: 1.7,
          duration: 0.4,
        })}
        className="max-w-2xl mdl:max-w-lg mt-4 xl:mt-7"
      >
        <span className="mr-1">I like to create</span>
        <ContainerTextFlip
          words={words}
        />
        <span className="ml-1">applications.</span>
        <span className="ml-1">{interest}</span>
      </motion.div>
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
          className="cursor-pointer uppercase flex items-center gap-2"
        >
          <span>Download CV</span>
          <FaFileDownload className="text-xl" />
        </Button>

        <Social
          containerClassName="flex gap-3"
          iconClassName="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
        />
      </motion.div>
    </div>
  );
};

export default About;
