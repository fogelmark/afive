"use client";

import Header from "../components/header";
import CustomCursor from "../components/custom-cursor";
import Lenis from "lenis";
import { useEffect } from "react";

export default function News() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    window.scrollTo(0, 0);

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-[#F1EEE9]">
      <Header />
      <CustomCursor />
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <h1 className="font-satoshi text-4xl md:text-6xl px-1 tracking-tighter font-medium text-[#3c3c3c] mb-8">
          News
        </h1>
      </div>
    </div>
  );
}
