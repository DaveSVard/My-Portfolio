"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { COLOR_THEMES, type ColorTheme } from "@/constants/theme";

export type { ColorTheme };

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  mouseTailEnabled: boolean;
  setMouseTailEnabled: (enabled: boolean) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("ocean-mist");
  const [mouseTailEnabled, setMouseTailEnabledState] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  const setCookie = (name: string, value: string, days: number = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("colorTheme") as ColorTheme;
    if (savedTheme && COLOR_THEMES[savedTheme]) {
      setColorThemeState(savedTheme);
      const theme = COLOR_THEMES[savedTheme];
      document.documentElement.style.setProperty("--accent-color", theme.accent);
      document.documentElement.style.setProperty("--accent-hover-color", theme.accentHover);
      setCookie("colorTheme", savedTheme);
    } else {
      const theme = COLOR_THEMES["ocean-mist"];
      document.documentElement.style.setProperty("--accent-color", theme.accent);
      document.documentElement.style.setProperty("--accent-hover-color", theme.accentHover);
    }
    
    const savedMouseTail = localStorage.getItem("mouseTailEnabled");
    if (savedMouseTail !== null) {
      setMouseTailEnabledState(savedMouseTail === "true");
    }
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const theme = COLOR_THEMES[colorTheme];
    document.documentElement.style.setProperty("--accent-color", theme.accent);
    document.documentElement.style.setProperty("--accent-hover-color", theme.accentHover);
    
    const styleTag = document.getElementById("theme-colors-inline");
    if (styleTag) {
      styleTag.textContent = `:root { --accent-color: ${theme.accent} !important; --accent-hover-color: ${theme.accentHover} !important; }`;
    }
    
    localStorage.setItem("colorTheme", colorTheme);
    
    setCookie("colorTheme", colorTheme);
  }, [colorTheme, mounted]);

  const setColorTheme = (theme: ColorTheme) => {
    const themeColors = COLOR_THEMES[theme];
    if (themeColors) {
      document.documentElement.style.setProperty("--accent-color", themeColors.accent);
      document.documentElement.style.setProperty("--accent-hover-color", themeColors.accentHover);
      const styleTag = document.getElementById("theme-colors-inline");
      if (styleTag) {
        styleTag.textContent = `:root { --accent-color: ${themeColors.accent} !important; --accent-hover-color: ${themeColors.accentHover} !important; }`;
      }
    }
    setColorThemeState(theme);
  };

  const setMouseTailEnabled = (enabled: boolean) => {
    setMouseTailEnabledState(enabled);
    localStorage.setItem("mouseTailEnabled", enabled.toString());
  };

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("mouseTailEnabled", mouseTailEnabled.toString());
  }, [mouseTailEnabled, mounted]);


  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme, mouseTailEnabled, setMouseTailEnabled }}>
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
