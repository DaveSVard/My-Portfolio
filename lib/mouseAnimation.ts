import { useRef, useState, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface UseMouseAnimationOptions {
  accentColor?: string;
  stiffness?: number;
  damping?: number;
  shadowSize?: number;
  blurAmount?: number;
  offset?: number;
  hide?: boolean;
}

interface UseMouseAnimationReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  springX: any;
  springY: any;
  isHovering: boolean;
  hasHovered: boolean;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleMouseEnter: () => void;
  shadowStyle: {
    position: "absolute";
    pointerEvents: "none";
    left: number;
    top: number;
    x: any;
    y: any;
    translateX: string;
    translateY: string;
    width: number;
    height: number;
    borderRadius: string;
    filter: string;
    zIndex: number;
    transition: string;
    background: string;
  };
  shadowAnimation: {
    opacity: number;
    scale: number;
  };
  shadowTransition: {
    opacity: { duration: number };
    scale: { type: string; stiffness: number; damping: number };
  };
}

export const useMouseAnimation = (
  options: UseMouseAnimationOptions
): UseMouseAnimationReturn => {
  const {
    stiffness = 200,
    damping = 30,
    shadowSize = 180,
    blurAmount = 32,
    offset = 60,
    accentColor = "rgba(0, 225, 135, 0.25)",
    hide = false, // NEW: default to false
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for the shadow position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for animation
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  // Track if mouse is inside
  const [isHovering, setIsHovering] = useState(false);
  // Track if user has ever hovered
  const [hasHovered, setHasHovered] = useState(false);

  // On mouse move, update shadow position to cursor
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      setIsHovering(true);
      if (!hasHovered) setHasHovered(true);
    },
    [mouseX, mouseY, hasHovered]
  );

  // On mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (!hasHovered) setHasHovered(true);
  }, [hasHovered]);

  // On mouse leave, move shadow to the closest edge where the mouse left
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Get mouse position relative to container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find closest edge
      const distances = [
        { edge: "left", dist: Math.abs(x) },
        { edge: "right", dist: Math.abs(x - rect.width) },
        { edge: "top", dist: Math.abs(y) },
        { edge: "bottom", dist: Math.abs(y - rect.height) },
      ];
      const closest = distances.reduce((a, b) => (a.dist < b.dist ? a : b));

      let targetX = x;
      let targetY = y;

      // Move shadow just outside the closest edge
      switch (closest.edge) {
        case "left":
          targetX = -offset;
          break;
        case "right":
          targetX = rect.width + offset;
          break;
        case "top":
          targetY = -offset;
          break;
        case "bottom":
          targetY = rect.height + offset;
          break;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);
      setIsHovering(false);
    },
    [mouseX, mouseY, offset]
  );

  // Initialize shadow position to center on mount
  useState(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    }
  });

  // Shadow style object
  const shadowStyle = {
    position: "absolute" as const,
    pointerEvents: "none" as const,
    left: 0,
    top: 0,
    x: springX,
    y: springY,
    translateX: "-50%",
    translateY: "-50%",
    width: shadowSize,
    height: shadowSize,
    borderRadius: "50%",
    background: accentColor,
    filter: `blur(${blurAmount}px)`,
    zIndex: 0,
    transition: "background 0.3s",
  };

  // Animation properties
  const shadowAnimation = {
    opacity: hide ? (isHovering ? 1 : 0) : hasHovered ? 1 : 0,
    scale: isHovering ? 1 : 0.9,
  };

  const shadowTransition = {
    opacity: { duration: 0.3 },
    scale: { type: "spring", stiffness, damping },
  };

  return {
    containerRef,
    springX,
    springY,
    isHovering,
    hasHovered,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
    shadowStyle,
    shadowAnimation,
    shadowTransition,
  };
};
