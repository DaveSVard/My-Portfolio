"use client";

import { useEffect, useRef, useState } from "react";

const BG_COLOR = "#1c1c22";

const getFontSize = () => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return 28;
  } else {
    return 42;
  }
};

const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);
  const fontSizeRef = useRef<number>(getFontSize());
  const characters = "01";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function updateDropsArray() {
      if (!canvas) return;
      const columns = Math.floor(canvas.width / fontSizeRef.current);
      const oldDrops = dropsRef.current;
      const newDrops: number[] = [];

      for (let i = 0; i < columns; i++) {
        newDrops[i] = oldDrops[i] !== undefined ? oldDrops[i] : 1;
      }
      dropsRef.current = newDrops;
    }

    function setCanvasSizeAndFont() {
      if (!canvas) return;
      fontSizeRef.current = getFontSize();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateDropsArray();
    }

    setCanvasSizeAndFont();

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(28, 28, 34, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff99";
      ctx.font = `${fontSizeRef.current}px "Courier New", monospace`;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        ctx.fillText(
          text,
          i * fontSizeRef.current,
          drops[i] * fontSizeRef.current
        );

        if (
          drops[i] * fontSizeRef.current > canvas.height &&
          Math.random() > 0.98
        ) {
          drops[i] = 0;
        }

        drops[i]++;
      }
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
  }, []);

  return (
    <div
      className="bg-primary rounded-full aspect-square"
      style={{ background: BG_COLOR }}
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
