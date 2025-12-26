"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { COLOR_THEMES, type ColorTheme } from "@/constants/theme";

export type { ColorTheme };

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("ocean-mist");
  const [mounted, setMounted] = useState(false);

  // Helper function to set cookie
  const setCookie = (name: string, value: string, days: number = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  useEffect(() => {
    // Load theme from localStorage (cookie is already read on server)
    const savedTheme = localStorage.getItem("colorTheme") as ColorTheme;
    if (savedTheme && COLOR_THEMES[savedTheme]) {
      setColorThemeState(savedTheme);
      // Apply immediately (SSR already set it, but ensure it's correct)
      const theme = COLOR_THEMES[savedTheme];
      document.documentElement.style.setProperty("--accent-color", theme.accent);
      document.documentElement.style.setProperty("--accent-hover-color", theme.accentHover);
      // Sync cookie if it's different
      setCookie("colorTheme", savedTheme);
    } else {
      // Apply default theme
      const theme = COLOR_THEMES["ocean-mist"];
      document.documentElement.style.setProperty("--accent-color", theme.accent);
      document.documentElement.style.setProperty("--accent-hover-color", theme.accentHover);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // CSS variables are already set by setColorTheme, but ensure they're correct
    const theme = COLOR_THEMES[colorTheme];
    document.documentElement.style.setProperty("--accent-color", theme.accent);
    document.documentElement.style.setProperty("--accent-hover-color", theme.accentHover);
    
    // Update inline style tag if it exists
    const styleTag = document.getElementById("theme-colors-inline");
    if (styleTag) {
      styleTag.textContent = `:root { --accent-color: ${theme.accent} !important; --accent-hover-color: ${theme.accentHover} !important; }`;
    }
    
    // Save to localStorage
    localStorage.setItem("colorTheme", colorTheme);
    
    // Save to cookie for SSR
    setCookie("colorTheme", colorTheme);
  }, [colorTheme, mounted]);

  const setColorTheme = (theme: ColorTheme) => {
    // Apply CSS variables immediately for instant visual feedback
    const themeColors = COLOR_THEMES[theme];
    if (themeColors) {
      document.documentElement.style.setProperty("--accent-color", themeColors.accent);
      document.documentElement.style.setProperty("--accent-hover-color", themeColors.accentHover);
      // Also update the inline style tag if it exists
      const styleTag = document.getElementById("theme-colors-inline");
      if (styleTag) {
        styleTag.textContent = `:root { --accent-color: ${themeColors.accent} !important; --accent-hover-color: ${themeColors.accentHover} !important; }`;
      }
    }
    setColorThemeState(theme);
  };

  // Always provide the context, even before mounting
  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
