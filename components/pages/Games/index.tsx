"use client";

import { AnimatedCard, InViewContainer } from "@/components/atoms";
import { opacityAnimation, fadeIn } from "@/lib/motion";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

const GamesPage = () => {
  const [showDesktopOnlyModal, setShowDesktopOnlyModal] = useState(false);
  const router = useRouter();

  const games = [
    {
      id: 1,
      name: "Tetris",
      path: "/games/tetris",
    },
  ];

  const handleGameClick = (path: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setShowDesktopOnlyModal(true);
    } else {
      router.push(path);
    }
  };

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
            <div
              key={idx}
              onClick={() => handleGameClick(game.path)}
              className="cursor-pointer"
            >
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
            </div>
          ))}

          <p className="text-center text-gray-500 dark:text-gray-400">
            More games coming soon...
          </p>
        </motion.div>
      </InViewContainer>

      <DialogPrimitive.Root open={showDesktopOnlyModal} onOpenChange={setShowDesktopOnlyModal}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-5000 dark:bg-black/80 bg-white/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-99999 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 dark:border-gray-800 dark:bg-primary bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg ">
            <DialogPrimitive.Title className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
              Desktop Only
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="text-sm text-gray-600 dark:text-gray-400">
              We're sorry, but Tetris is currently available only on desktop devices. Please visit us on a desktop or laptop to play!
            </DialogPrimitive.Description>

            <div className="flex justify-end mt-4">
              <DialogPrimitive.Close asChild>
                <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
                  Got it
                </button>
              </DialogPrimitive.Close>
            </div>

            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:ring-offset-primary">
              <IoMdClose className="text-2xl sm:text-3xl text-accent" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

export default GamesPage;
