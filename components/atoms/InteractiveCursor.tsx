"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CursorTrail {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

const InteractiveCursor = () => {
  const [trail, setTrail] = useState<CursorTrail[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    const checkDesktop = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      setIsDesktop(!isMobile);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const updateCursor = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTrailTime.current > 20) {
        setTrail((prev) => {
          const newTrail = [
            ...prev,
            {
              x: e.clientX,
              y: e.clientY,
              id: trailIdRef.current++,
              opacity: 1,
            },
          ];
          return newTrail.slice(-25);
        });
        lastTrailTime.current = now;
      }
    };

    window.addEventListener("mousemove", updateCursor);

    const trailInterval = setInterval(() => {
      setTrail((prev) =>
        prev.map((particle) => ({
          ...particle,
          opacity: Math.max(0, particle.opacity - 0.05),
        }))
      );
    }, 50);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      clearInterval(trailInterval);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-999999 hidden md:block">
      {trail.map((particle, index) => {
        const size = 6 - (index / trail.length) * 3;
        const opacity = particle.opacity * (1 - index / trail.length * 0.5) * 1;
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-accent dark:bg-accent shadow-lg shadow-accent/50"
            style={{
              left: particle.x - size / 2,
              top: particle.y - size / 2,
              width: size,
              height: size,
              opacity: Math.min(1, opacity),
              boxShadow: `0 0 ${size * 2}px rgba(0, 255, 153, 0.6)`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </div>
  );
};

export default InteractiveCursor;

