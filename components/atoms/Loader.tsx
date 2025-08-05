"use client";

import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const Loader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-300 mt-2">Loading...</p>
      </div>
    );
  }

  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default Loader;
