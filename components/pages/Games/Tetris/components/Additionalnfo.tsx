"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/atoms/sheet";
import { cn } from "@/lib/utils";

const additionalInfo = [
  {
    infoType: "Controls",
    title: "How to Play",
    description: "Use your keyboard to play.",
    settings: [
      { button: "ESC/P", action: "Pause the game" },
      { button: "Z", action: "Rotate left" },
      { button: "C", action: "Hold the current piece" },
      { button: "Space", action: "Hard drop" },
      { button: "←", action: "Move left" },
      { button: "→", action: "Move right" },
      { button: "↑", action: "Rotate right" },
      { button: "↓", action: "Soft drop" },
    ],
  },
  {
    infoType: "Score",
    title: "Scoring system",
    info: [
      {
        title: "Soft drop:",
        description: "1 × Distance",
      },
      {
        title: "Hard drop:",
        description: "2 × Distance",
      },
      {
        title: "single line clear:",
        description: "100",
      },
      {
        title: "Double Line Clear:",
        description: "300",
      },
      {
        title: "Triple Line Clear:",
        description: "500",
      },
      {
        title: "T-Spin:",
        description: "400",
      },
      {
        title: "Tetris™ Line Clear:",
        description: "800",
      },
      {
        title: "T-Spin Single:",
        description: "800",
      },
      {
        title: "T-Spin Double:",
        description: "1200",
      },
      {
        title: "T-Spin Triple:",
        description: "1600",
      },
      {
        title: "Back-to-Back:",
        description: "0.5 × Tetris or T-Spin",
      },
    ]
  },
  {
    infoType: "Gameplay",
    title: "General gameplay inforamtion",
    info: [
      {
        title: "Goal",
        description:
          "Put your organizational skills and endurance to the test by clearing as many lines as possible.",
      },
      {
        title: "Clear lines",
        description:
          "Maneuver the falling Tetriminos to fit them together within the Matrix. To clear a line, fill every square within a single row.",
      },
      {
        title: "Score points",
        description:
          "Earn points by clearing lines. Clear multiple lines at once to increase your scoring opportunities.",
      },
      {
        title: "Ghost piece",
        description:
          "Use the Ghost Piece to determine the best fit for the falling Tetrimino. This helpful guide appears directly below the falling Tetrimino and displays possible placements.",
      },
      {
        title: "Newx queue",
        description:
          "Preview the upcoming Tetrimino in the Next Queue to plan ahead and increase your scoring opportunities.",
      },
      {
        title: "Hold queue",
        description:
          "Store a falling Tetrimino in the Hold Queue for later use.",
      },
      {
        title: "Game over",
        description: "Stack the Tetriminos too high and the game is over!",
      },
    ],
  },
  {
    infoType: "About",
    title: "About Tetris",
    info: [
      {
        description:
          "Tetris® is the addictive puzzle game that started it all, embracing our universal desire to create order out of chaos. The Tetris game was created by Alexey Pajitnov in 1984—the product of Alexey's computer programming experience and his love of puzzles. In the decades to follow, Tetris became one of the most successful and recognizable video games, appearing on nearly every gaming platform available. This page is the official destination for free online single-player Tetris. Click PLAY to start playing one of the world's most popular puzzle games now!",
      },
      {
        description:
          "The goal of Tetris is to score as many points as possible by clearing horizontal lines of Blocks. The player must rotate, move, and drop the falling Tetriminos inside the Matrix (playing field). Lines are cleared when they are filled with Blocks and have no empty spaces.",
      },
      {
        description:
          "As lines are cleared, the level increases and Tetriminos fall faster, making the game progressively more challenging. If the Blocks land above the top of the playing field, the game is over.",
      },
    ],
  },
] as const;

export type InfoType = typeof additionalInfo[number]["infoType"];

interface AdditionalnfoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  infoType: InfoType;
}

const Additionalnfo: React.FC<AdditionalnfoProps> = ({
  open,
  onOpenChange,
  infoType,
}) => {
  // Find the info object that matches the infoType
  const info = additionalInfo.find((item) => item.infoType === infoType);

  if (!info) {
    return null;
  }

  // Smart mapping function to render different content types
  const renderContent = () => {
    // Render Controls (settings)
    if ("settings" in info && info.settings) {
      return (
        <div className="space-y-4">
          {info.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {info.description}
            </p>
          )}
          <div className="grid gap-3">
            {info.settings.map((setting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-accent/50 transition-colors"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {setting.action}
                </span>
                <kbd className="px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                  {setting.button}
                </kbd>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    // Render Score/Gameplay (info array with title and description)
    if ("info" in info && info.info) {
      return (
        <div className="space-y-6">
          {info.info.map((item, index) => {
            const hasTitle = "title" in item && (item as { title?: string }).title;
            const title = hasTitle ? (item as { title: string }).title : null;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="p-5 rounded-lg bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-accent/30 transition-all duration-300"
              >
                {title && (
                  <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {title}
                  </h4>
                )}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "w-full sm:max-w-2xl overflow-y-auto",
          "bg-white dark:bg-primary",
          "border-l border-gray-200 dark:border-gray-800"
        )}
      >
        <SheetHeader className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
          <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {info.title}
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {info.infoType === "Controls" && "Keyboard shortcuts and controls"}
            {info.infoType === "Score" && "Points and scoring mechanics"}
            {info.infoType === "Gameplay" && "Game mechanics and features"}
            {info.infoType === "About" && "Learn more about Tetris"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">{renderContent()}</div>
      </SheetContent>
    </Sheet>
  );
};

export default Additionalnfo;
