"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const DARK_BG_COLOR = "rgba(28, 28, 34, 0.15)";
const LIGHT_BG_COLOR = "rgba(255,255,255,0.15)";

const LIGHT_TEXT_COLOR = "black";

// Only use window in client effect, not at module scope
const getFont = (width: number) => {
  if (width < 768) {
    return {
      font: "bold 30px 'JetBrains Mono', 'Consolas', 'monospace'",
      fontSize: 30,
      letterSpacing: 2,
    };
  } else {
    return {
      font: "bold 38px 'JetBrains Mono', 'Consolas', 'monospace'",
      fontSize: 38,
      letterSpacing: 0,
    };
  }
};

const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);
  const fontPropsRef = useRef(getFont(1024)); // Default to desktop for SSR
  const accentColorRef = useRef<string>("#00ff99"); // Default fallback
  const characters = "01";
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [clientBg, setClientBg] = useState<string | null>(null);

  // Hydration fix: Only set client background after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get accent color from CSS variable and watch for changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateAccentColor = () => {
        const color = getComputedStyle(document.documentElement)
          .getPropertyValue("--accent-color")
          .trim();
        if (color) {
          accentColorRef.current = color;
        }
      };
      
      updateAccentColor();
      
      // Watch for changes to the CSS variable
      const observer = new MutationObserver(updateAccentColor);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style"],
      });
      
      return () => observer.disconnect();
    }
  }, []);

  // Update clientBg on theme change after mount
  useEffect(() => {
    if (isMounted) {
      setClientBg(resolvedTheme === "dark" ? DARK_BG_COLOR : LIGHT_BG_COLOR);
    }
  }, [resolvedTheme, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function updateDropsArray() {
      if (!canvas) return;
      const columns = Math.floor(canvas.width / fontPropsRef.current.fontSize);
      const oldDrops = dropsRef.current;
      const newDrops: number[] = [];

      for (let i = 0; i < columns; i++) {
        newDrops[i] = oldDrops[i] !== undefined ? oldDrops[i] : 1;
      }
      dropsRef.current = newDrops;
    }

    function setCanvasSizeAndFont() {
      if (!canvas) return;
      // Use window.innerWidth only on client
      fontPropsRef.current = getFont(window.innerWidth);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateDropsArray();
    }

    setCanvasSizeAndFont();

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = resolvedTheme === "dark" ? DARK_BG_COLOR : LIGHT_BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use accent color from ref (updated via MutationObserver)
      const currentAccentColor = accentColorRef.current;

      ctx.fillStyle =
        resolvedTheme === "dark" ? currentAccentColor : LIGHT_TEXT_COLOR;
      ctx.font = fontPropsRef.current.font;
      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        let x =
          i * fontPropsRef.current.fontSize +
          (fontPropsRef.current.letterSpacing
            ? i * fontPropsRef.current.letterSpacing
            : 0);

        if (fontPropsRef.current.fontSize <= 24) {
          ctx.shadowColor = resolvedTheme === "dark" ? currentAccentColor : "#000";
          ctx.shadowBlur = 4;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, drops[i] * fontPropsRef.current.fontSize);

        if (
          drops[i] * fontPropsRef.current.fontSize > canvas.height &&
          Math.random() > 0.98
        ) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      ctx.shadowBlur = 0;
    };

    const intervalId = setInterval(draw, 33);

    function handleResize() {
      setCanvasSizeAndFont();
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedTheme, isMounted]);

  // Hydration fix: Only render the client background after mount
  // SSR: Always render a fixed background (e.g. dark), then update on client
  // This ensures SSR and client always match for the background style
  const initialBg = DARK_BG_COLOR; // or LIGHT_BG_COLOR if you want light as default

  if (!isMounted) {
    // SSR and first client render: always use initialBg
    return (
      <div
        className="rounded-full aspect-square"
        style={{
          background: initialBg,
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{
            display: "block",
            background: "transparent",
            borderRadius: "9999px",
          }}
        />
      </div>
    );
  }

  // After mount, use the correct theme background
  return (
    <div
      className="rounded-full aspect-square"
      style={{
        background: clientBg ?? initialBg,
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          display: "block",
          background: "transparent",
          borderRadius: "9999px",
        }}
      />
    </div>
  );
};

export default DigitalRain;
