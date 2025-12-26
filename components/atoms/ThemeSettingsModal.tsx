"use client";

import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useColorTheme, type ColorTheme } from "@/components/providers/ColorThemeProvider";
import { cn } from "@/lib/utils";

const ThemeSettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { colorTheme, setColorTheme } = useColorTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes: { name: string; value: ColorTheme; color: string }[] = [
    { name: "Ocean Mist", value: "ocean-mist", color: "#2EBFA5" },
    { name: "Orange", value: "orange", color: "#FE5F00" },
    { name: "Yellow", value: "yellow", color: "#FFAE03" },
    { name: "Forest Moss", value: "forest-moss", color: "#688E26" },
    { name: "Pacific Cyan", value: "pacific-cyan", color: "#62929E" },
    { name: "Red Ochre", value: "red-ochre", color: "#C73E1D" },
    { name: "Dodger Blue", value: "dodger-blue", color: "#2191FB" },
    { name: "Cherry Rose", value: "cherry-rose", color: "#B6174B" },
  ];

  // Prevent hydration mismatch by not rendering Dialog during SSR
  if (!mounted) {
    return (
      <button
        aria-label="Theme Settings"
        className="cursor-pointer p-2 rounded-lg hover:text-accent-hover! transition-colors"
        type="button"
      >
        <IoSettingsOutline className="text-2xl text-accent" />
      </button>
    );
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          aria-label="Theme Settings"
          className="cursor-pointer p-2 rounded-lg hover:text-accent-hover! transition-colors"
        >
          <IoSettingsOutline className="text-2xl text-accent" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-5000 dark:bg-black/80 bg-white/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-99999 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 dark:border-gray-800 dark:bg-primary bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
          <DialogPrimitive.Title className="text-2xl font-semibold text-black dark:text-white">
            Theme Settings
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Choose your accent color theme
          </DialogPrimitive.Description>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => {
                  setColorTheme(theme.value);
                }}
                className={cn(
                  "cursor-pointer flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:scale-105",
                  colorTheme === theme.value
                    ? "border-accent bg-accent/10"
                    : "border-gray-200 dark:border-gray-700 hover:border-accent/50"
                )}
                aria-label={`Select ${theme.name} theme`}
              >
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: theme.color }}
                />
                <span className="text-sm font-medium text-black dark:text-white">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:ring-offset-primary">
            <IoMdClose className="text-3xl text-accent" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ThemeSettingsModal;

