"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useSpring(0, { damping: 30, stiffness: 200 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 200 });

  const shadowX = useSpring(0, { damping: 20, stiffness: 100 });
  const shadowY = useSpring(0, { damping: 20, stiffness: 100 });

  useEffect(() => {
    // Check if device is touch-enabled
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);
    shadowX.set(mousePosition.x);
    shadowY.set(mousePosition.y);
  }, [mousePosition, cursorX, cursorY, shadowX, shadowY]);

  // Don't render custom cursor on mobile/touch devices
  if (isMobile) return null;

  return (
    <>
      {/* Shadow dot - lighter and slower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{
          x: shadowX,
          y: shadowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[hsl(40,10%,55%)] opacity-60" />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-3 h-3 rounded-full bg-[hsl(40,10%,35%)]" />
      </motion.div>
    </>
  );
}
