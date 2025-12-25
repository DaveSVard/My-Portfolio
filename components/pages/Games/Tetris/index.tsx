"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button, InViewContainer } from "@/components/atoms";
import { opacityAnimation } from "@/lib/motion";
import { FaArrowLeft, FaGamepad, FaInfoCircle, FaTrophy, FaKeyboard } from "react-icons/fa";
import Additionalnfo, { InfoType } from "./components/Additionalnfo";
import { cn } from "@/lib/utils";
import { ClassicTetris } from "./components";

const TetrisPage = () => {
  const [startGame, setStartGame] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfoType, setSelectedInfoType] = useState<InfoType>("Controls");

  const handleOpenModal = (infoType: InfoType) => {
    setSelectedInfoType(infoType);
    setIsModalOpen(true);
  };

  const infoButtons: { label: string; type: InfoType; icon: React.ReactNode }[] = [
    { label: "Controls", type: "Controls", icon: <FaKeyboard /> },
    { label: "Gameplay", type: "Gameplay", icon: <FaGamepad /> },
    { label: "Score", type: "Score", icon: <FaTrophy /> },
    { label: "About", type: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-4 pt-12 relative">
      <InViewContainer className="flex flex-col gap-y-6">
        <motion.div
          variants={opacityAnimation({
            delay: 1.5,
            duration: 0.4,
            type: "tween",
            ease: "easeOut",
          })}
          className="px-2"
        >
          <Link href="/games" className="text-base flex items-center group">
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />{" "}
            Back to Games
          </Link>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-5 min-h-100">
          <motion.div
            variants={opacityAnimation({
              delay: 1.5,
              duration: 0.4,
              type: "tween",
              ease: "easeOut",
            })}
            className="w-full "
          >
            {startGame ? (
              <ClassicTetris />
            ) : (
              <div className="flex items-center justify-center">
                <Button onClick={() => setStartGame(true)}>Start Game</Button>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={opacityAnimation({
              delay: 1.7,
              duration: 0.4,
              type: "tween",
              ease: "easeOut",
            })}
            className="flex items-center justify-center"
          >
            <div className="flex flex-row flex-wrap gap-2 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-2 border border-gray-700/50 shadow-2xl">
              {infoButtons.map((button) => (
                <motion.button
                  key={button.type}
                  onClick={() => handleOpenModal(button.type)}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: "easeOut",
                  }}
                  className={cn(
                    "cursor-pointer group relative flex items-center justify-center px-3 py-2.5 rounded-xl",
                    "bg-white/5 dark:bg-gray-800/50 text-gray-400",
                    "hover:bg-white/10 hover:text-accent hover:shadow-lg shadow-accent/20",
                    "transition-all duration-300 ease-out"
                  )}
                  title={button.label}
                >
                  <motion.div
                    className="text-xl"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {button.icon}
                  </motion.div>
                  <div className="overflow-hidden inline-block max-w-0 opacity-0 group-hover:ml-1.5 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 ease-out">
                    <span className="text-xs font-semibold whitespace-nowrap inline-block text-gray-300 dark:text-gray-300 group-hover:text-accent transition-colors duration-300">
                      {button.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </InViewContainer>

      <Additionalnfo
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        infoType={selectedInfoType}
      />
    </div>
  );
};

export default TetrisPage;
