"use client";

import { useEffect, useState } from "react";

export default function PreloaderLogo({ children }: { children: React.ReactNode }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for video to play, then fade out (adjust timing based on video duration)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000); // Adjust this based on your video length

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Logo preloader screen */}
      <div
        className={`fixed inset-0 z-50 bg-[#F1EEE9] flex items-center justify-center transition-opacity duration-1000 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <video
          autoPlay
          muted
          playsInline
          className="w-[70vw]"
        >
          <source src="/videos/animated-logo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div>{children}</div>
    </>
  );
}
