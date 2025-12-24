"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { InViewContainer, Button } from "@/components/atoms";
import { opacityAnimation } from "@/lib/motion";
import { FaArrowLeft } from "react-icons/fa";
import Additionalnfo, { InfoType } from "./components/Additionalnfo";

const TetrisPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfoType, setSelectedInfoType] = useState<InfoType>("Controls");

  const handleOpenModal = (infoType: InfoType) => {
    setSelectedInfoType(infoType);
    setIsModalOpen(true);
  };

  const infoButtons: { label: string; type: InfoType }[] = [
    { label: "Controls", type: "Controls" },
    { label: "Gameplay", type: "Gameplay" },
    { label: "Score", type: "Score" },
    { label: "About", type: "About" },
  ];

  return (
    <div className="sectionContainer py-20">
      <InViewContainer className="flex flex-col gap-y-10">
        <motion.div
          variants={opacityAnimation({
            delay: 1.5,
            duration: 0.4,
            type: "tween",
            ease: "easeOut",
          })}
        >
          <Link href="/games" className="text-base flex items-center group">
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />{" "}
            Back to Games
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <motion.div
            variants={opacityAnimation({
              delay: 1.5,
              duration: 0.4,
              type: "tween",
              ease: "easeOut",
            })}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tetris game will be implemented here
              </p>
              <div className="aspect-square max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">
                  Game Canvas
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
            variants={opacityAnimation({
              delay: 1.5,
              duration: 0.4,
              type: "tween",
              ease: "easeOut",
            })}
            className="flex flex-wrap gap-4 justify-center"
          >
            {infoButtons.map((button) => (
              <Button
                key={button.type}
                onClick={() => handleOpenModal(button.type)}
                variant="outline"
                className="min-w-[120px]"
              >
                {button.label}
              </Button>
            ))}
          </motion.div>
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
