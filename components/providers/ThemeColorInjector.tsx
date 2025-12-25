import { cookies } from "next/headers";

const COLOR_THEMES: Record<string, { accent: string; accentHover: string }> = {
  green: {
    accent: "#00ff99",
    accentHover: "#00e187",
  },
  purple: {
    accent: "#a855f7",
    accentHover: "#9333ea",
  },
  rose: {
    accent: "#f43f5e",
    accentHover: "#e11d48",
  },
  orange: {
    accent: "#f97316",
    accentHover: "#ea580c",
  },
  red: {
    accent: "#ef4444",
    accentHover: "#dc2626",
  },
  blue: {
    accent: "#3b82f6",
    accentHover: "#2563eb",
  },
  yellow: {
    accent: "#eab308",
    accentHover: "#ca8a04",
  },
};

export const ThemeColorInjector = async () => {
  const cookieStore = await cookies();
  const colorTheme = cookieStore.get("colorTheme")?.value || "green";
  const theme = COLOR_THEMES[colorTheme] || COLOR_THEMES.green;

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

