"use client";

import { useEffect, useState, createContext, useContext } from "react";

// Context to pass animation state to children
const PreloaderContext = createContext(false);

export const usePreloaderAnimation = () => useContext(PreloaderContext);

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [lightBgSliding, setLightBgSliding] = useState(false);
  const [darkCurtainSliding, setDarkCurtainSliding] = useState(false);
  const [contentSliding, setContentSliding] = useState(false);
  const [cardsAnimating, setCardsAnimating] = useState(false);

  useEffect(() => {

    // STEP 1: Dark curtain slides up (after light starts sliding)
    const darkCurtainTimer = setTimeout(() => {
      setDarkCurtainSliding(true);
    }, 200);

    // STEP 2: Landing page slides up (halfway through dark curtain)
    const contentTimer = setTimeout(() => {
      setContentSliding(true);
    }, 600);

    // STEP 3: Cards fade in when content page is 75% done (600ms + 75% of 1500ms = 1725ms)
    const cardsTimer = setTimeout(() => {
      setCardsAnimating(true);
    }, 200);

    return () => {
      clearTimeout(darkCurtainTimer);
      clearTimeout(contentTimer);
      clearTimeout(cardsTimer);
    };
  }, []);

  return (
    <>

      {/* LAYER 1: Dark curtain - starts below, slides up to COVER screen, then stays */}
      <div
        className={`fixed inset-0 z-30 bg-[#3c3c3c] transition-transform duration-1500 ${
          darkCurtainSliding ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.3, 0.30, 0.17, 1)' }}
      />

      {/* LAYER 2: Landing page content - slides up from bottom to cover dark curtain */}
      <PreloaderContext.Provider value={cardsAnimating}>
        <div
          className={`relative z-40 min-h-screen bg-[#F1EEE9] transition-transform duration-1500 will-change-transform ${
            contentSliding ? "translate-y-0" : "translate-y-full"
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.3, 0.30, 0.17, 1)',
          }}
        >
          {children}
        </div>
      </PreloaderContext.Provider>
    </>
  );
}
