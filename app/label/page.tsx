"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import CustomCursor from "../components/custom-cursor";
import Header from "../components/header";
import Lenis from "lenis";

export default function Info() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    window.scrollTo(0, 0);
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#F1EEE9]">
      <Header />
      <CustomCursor />
      <div className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-24 md:mb-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-satoshi text-6xl md:text-[6rem] px-1 tracking-tighter font-medium text-[#3c3c3c] leading-[0.9]">
              About the label
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-16 md:gap-20">
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-8 font-general-sans text-xl md:text-2xl text-[#3c3c3c] leading-relaxed">
                <p className="text-2xl md:text-3xl leading-snug">
                  <span className="font-bespoke font-bold text-3xl md:text-4xl">AFIVE </span>
                  publishing is a Stockholm-based music publishing company
                  founded and run by veteran songwriters and producers Albin Nedler
                  and Kristoffer Fogelmark, also known as the artist Bonn.
                </p>

                <p className="opacity-90">
                  Their international credits include Avicii's global hit "SOS" and the
                  album TIM, One Direction, Selena Gomez and Martin Garrix.
                </p>

                <p className="opacity-90">
                  From its studio at Krukmakargatan 34A on Södermalm, AFIVE develops
                  songs, artists and long-term creative careers. The company
                  currently represents two rising Swedish talents: Alicia Ericson,
                  producer and topliner, and Hanna Hedman, topliner and vocalist.
                </p>

                <p className="opacity-90">
                  A central part of AFIVE's mission is to support the next
                  generation of Swedish songwriters through mentorship, studio
                  sessions, writing camps and industry connections.
                </p>

                <p className="opacity-90">
                  AFIVE is also expanding into mood music through a new
                  collaboration with Orbit, an initiative currently in development.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <h3 className="font-satoshi text-sm uppercase tracking-wider text-[#3c3c3c] mb-6 opacity-60">
                  Location
                </h3>
                <p className="font-general-sans text-lg text-[#3c3c3c] leading-relaxed">
                  Krukmakargatan 34A<br />
                  Södermalm<br />
                  Stockholm, Sweden
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
