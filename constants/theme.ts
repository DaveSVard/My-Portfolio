export type ColorTheme = "ocean-mist" | "orange" | "yellow" | "forest-moss" | "pacific-cyan" | "red-ochre" | "dodger-blue" | "cherry-rose";

export const COLOR_THEMES: Record<ColorTheme, { accent: string; accentHover: string }> = {
  "ocean-mist": {
    accent: "#2EBFA5",
    accentHover: "#00e187",
  },
  orange: {
    accent: "#FE5F00",
    accentHover: "#E85300",
  },
  yellow: {
    accent: "#FFAE03",
    accentHover: "#EAB308",
  },
  "forest-moss": {
    accent: "#688E26",
    accentHover: "#5A912E",
  },
  "pacific-cyan": {
    accent: "#62929E",
    accentHover: "#4A7A86",
  },
  "red-ochre": {
    accent: "#C73E1D",
    accentHover: "#A10702",
  },
  "dodger-blue": {
    accent: "#2191FB",
    accentHover: "#1A75C4",
  },
  "cherry-rose": {
    accent: "#B6174B",
    accentHover: "#9E123E",
  },
};

