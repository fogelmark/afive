"use client";

import Header from "../components/header";
import CustomCursor from "../components/CustomCursor";
import Lenis from "lenis";
import { useEffect } from "react";

export default function Info() {
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
        <div className="max-w-4xl">

          <div className="space-y-6 font-general-sans text-lg md:text-xl text-[#3c3c3c] leading-relaxed">
            <p>
              <span className="font-bespoke font-bold">AFIVE PUBLISHING </span> is a Stockholm-based music publishing company
              founded and run by veteran songwriters and producers Albin Nedler
              and Kristoffer Fogelmark, also known as the artist Bonn. Their
              international credits include Avicii's global hit "SOS" and the
              album TIM, One Direction, Selena Gomez and Martin Garrix.
            </p>

            <p>
              From its studio at Krukmakargatan 34A on Södermalm, AFIVE develops
              songs, artists and long-term creative careers. The company
              currently represents two rising Swedish talents: Alicia Ericson,
              producer and topliner, and Hanna Hedman, topliner and vocalist.
            </p>

            <p>
              A central part of AFIVE's mission is to support the next
              generation of Swedish songwriters through mentorship, studio
              sessions, writing camps and industry connections.
            </p>

            <p>
              AFIVE is also expanding into mood music through a new
              collaboration with Orbit, an initiative currently in development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
