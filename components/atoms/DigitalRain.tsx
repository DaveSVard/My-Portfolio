"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const DARK_BG_COLOR = "rgba(28, 28, 34, 0.15)";
const LIGHT_BG_COLOR = "rgba(255,255,255,0.15)";

const DARK_TEXT_COLOR = "#00ff99";
const LIGHT_TEXT_COLOR = "black";

const getFont = () => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
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
  const fontPropsRef = useRef(getFont());
  const characters = "01";
  const { resolvedTheme } = useTheme();

  useEffect(() => {
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
      fontPropsRef.current = getFont();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateDropsArray();
    }

    setCanvasSizeAndFont();

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = resolvedTheme === "dark" ? DARK_BG_COLOR : LIGHT_BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle =
        resolvedTheme === "dark" ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR;
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
          ctx.shadowColor = resolvedTheme === "dark" ? "#00ff99" : "#000";
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
  }, [resolvedTheme]);

  return (
    <div
      className="rounded-full aspect-square"
      style={{
        background: resolvedTheme === "dark" ? DARK_BG_COLOR : LIGHT_BG_COLOR,
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
