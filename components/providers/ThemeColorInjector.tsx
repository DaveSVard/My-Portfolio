import { cookies } from "next/headers";
import { COLOR_THEMES, type ColorTheme } from "@/constants/theme";

export const ThemeColorInjector = async () => {
  const cookieStore = await cookies();
  const colorTheme = (cookieStore.get("colorTheme")?.value || "ocean-mist") as ColorTheme;
  const theme = COLOR_THEMES[colorTheme] || COLOR_THEMES["ocean-mist"];

  return (
    <style
      id="theme-colors-inline"
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --accent-color: ${theme.accent} !important;
            --accent-hover-color: ${theme.accentHover} !important;
          }
        `,
      }}
    />
  );
};

