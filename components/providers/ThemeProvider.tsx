"use client";

import { ThemeProvider } from "next-themes";
import { ColorThemeProvider } from "./ColorThemeProvider";

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
