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
import { tetrisInfo, type InfoType } from "@/constants";

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
  const info = tetrisInfo.find((item) => item.infoType === infoType);

  if (!info) {
    return null;
  }

  const renderContent = () => {
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
                className="p-5 rounded-lg bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-accent/30"
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
        <SheetHeader className="text-left! mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
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
export type { InfoType } from "@/constants";
