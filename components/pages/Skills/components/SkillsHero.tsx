import { motion } from "framer-motion";
import { fadeIn, opacityAnimation } from "@/lib/motion";
import InViewContainer from "@/components/atoms/InViewContainer";
import ContainerTextFlip from "@/components/atoms/ContainerTextFlip";
import { skills } from "@/constants";

const SkillsHero = () => {
  const { title, description, highligthed, passion } = skills;

  return (
    <section className="sectionContainer py-20">
      <InViewContainer className="text-center">
        <motion.div
          variants={fadeIn({
            direction: "up",
            type: "tween",
            delay: 0.2,
            duration: 0.6,
          })}
          className="mb-8"
        >
          <h1 className="h1 font-family-primary mb-6">
            {title} <span className="text-accent">{highligthed}</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={opacityAnimation({
            delay: 0.8,
            duration: 0.6,
            type: "tween",
            ease: "easeOut",
          })}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            {passion.title}
          </span>
          <ContainerTextFlip
            words={passion.specializations}
            interval={5000}
            className="text-lg font-bold"
            animationDuration={800}
          />
        </motion.div>
      </InViewContainer>
    </section>
  );
};

export default SkillsHero;
