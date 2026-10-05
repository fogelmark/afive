"use client";

import { useEffect, useState } from "react";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [lightBgHidden, setLightBgHidden] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Hide light background (curtain starts sliding up)
    const lightBgTimer = setTimeout(() => {
      setLightBgHidden(true);
    }, 500);

    // Dark curtain slides off screen
    const curtainTimer = setTimeout(() => {
      setCurtainDone(true);
    }, 1500);

    // Landing page curtain slides up
    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 1700);

    return () => {
      clearTimeout(lightBgTimer);
      clearTimeout(curtainTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <>
      {/* Light background (initial screen) */}
      <div
        className={`fixed inset-0 z-50 bg-[#F1EEE9] transition-transform duration-1000 ease-in-out ${
          lightBgHidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Dark curtain */}
      <div
        className={`fixed inset-0 z-40 bg-[#3c3c3c] transition-transform duration-1000 ease-in-out ${
          curtainDone ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Content curtain */}
      <div
        className={`transition-transform duration-1000 ease-in-out ${
          contentVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transformOrigin: "bottom" }}
      >
        {children}
      </div>
    </>
  );
}
