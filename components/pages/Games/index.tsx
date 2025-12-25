"use client";

import { AnimatedCard, InViewContainer } from "@/components/atoms";
import { opacityAnimation, fadeIn } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

const GamesPage = () => {
  const games = [
    {
      id: 1,
      name: "Tetris",
      path: "/games/tetris",
    },
  ];

  return (
    <div className="sectionContainer py-20">
      <InViewContainer className="text-center mb-16">
        <motion.div
          variants={fadeIn({
            direction: "up",
            type: "tween",
            delay: 1.5,
            duration: 0.4,
          })}
        >
          <h1 className="h1 font-family-primary mb-6">Classic Games</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Made just for fun and to be not bored.. have some fun!
          </p>
        </motion.div>
      </InViewContainer>

      <InViewContainer viewport={{ amount: 0, once: true }}>
        <motion.div
          variants={opacityAnimation({
            delay: 1.7,
            duration: 0.4,
            type: "tween",
            ease: "easeOut",
          })}
          className="grid items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {games.map((game, idx) => (
            <Link href={game.path} key={idx}>
              <AnimatedCard
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.5 + idx * 0.1,
                  duration: 0.4,
                  ease: "easeIn",
                  type: "tween",
                }}
                className="p-10"
              >
                <h3 className="text-2xl font-bold">{game.name}</h3>
              </AnimatedCard>
            </Link>
          ))}

          <p className="text-center text-gray-500 dark:text-gray-400">
            More games coming soon...
          </p>
        </motion.div>
      </InViewContainer>
    </div>
  );
};

export default GamesPage;
