"use client";

import Header from "../components/header";
import CustomCursor from "../components/CustomCursor";
import Image from "next/image";
import alicia from "@/public/images/alicia_grain.jpg";
import hanna from "@/public/images/hanna_grain.jpg";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import Lenis from "lenis";

const roster = [
  {
    name: "Alicia Ericson",
    role: "Producer & Topliner",
    image: alicia,
  },
  {
    name: "Hanna Hedman",
    role: "Topliner & Vocalist",
    image: hanna,
  },
];

export default function Roster() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    window.scrollTo(0, 0);

    requestAnimationFrame(raf);
  }, []);

  const container1 = useRef(null);
  const container2 = useRef(null);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: container1,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: container2,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress1, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress2, [0, 1], ["-10%", "10%"]);

  return (
    <>
      <Header />
      <CustomCursor />
      <div
        ref={container1}
        className="flex md:h-screen w-full items-center justify-center bg-[#f0efe9]"
      >
        <div className="relative h-screen w-full overflow-hidden p-0">
          <div className="relative flex size-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent to-black/60" />
            <section className="absolute z-10 bottom-8 left-8 right-8">
              <h2 className="font-new-title uppercase text-5xl md:text-[180px] font-bold text-[#F1EEE9] leading-none">
                {roster[0].name}
              </h2>
              <p className="font-general-sans text-xl md:text-2xl text-[#F1EEE9] mt-3">
                {roster[0].role}
              </p>
            </section>
            <motion.img
              style={{ y: y1 }}
              className="size-full scale-105 object-center object-cover"
              src={alicia.src}
              alt={roster[0].name}
            />
          </div>
        </div>
      </div>
      <div
        ref={container2}
        className="flex md:h-screen w-full items-center justify-center bg-[#f0efe9]"
      >
        <div className="relative h-full w-full overflow-hidden p-0">
          <div className="relative flex size-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent to-black/60" />
            <section className="absolute z-10 bottom-8 left-8 right-8">
              <h2 className="font-new-title uppercase text-5xl md:text-[180px] font-bold text-[#F1EEE9] leading-none">
                {roster[1].name}
              </h2>
              <p className="font-general-sans text-xl md:text-2xl text-[#F1EEE9] mt-3">
                {roster[1].role}
              </p>
            </section>
            <motion.img
              style={{ y: y2 }}
              className="size-full scale-105 object-top object-cover"
              src={hanna.src}
              alt={roster[1].name}
            />
          </div>
        </div>
      </div>
    </>
  );
}
