"use client";

import Image from "next/image";
import logo_dark from "@/public/logos/a5-interlock-afront-dark.png";
import krille from "@/public/images/krille.jpg";
import abbe from "@/public/images/abbe.jpg";
import tjej from "@/public/images/tjej.jpg";
import buildings from "@/public/images/buildings.jpg";
import InfiniteScrollGallery from "@/app/components/InfiniteScrollGallery";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    // <div className="bg-[#E7E2DA]">
    // <div className="bg-[#F1EEE9]">
    <div className="bg-[#dddbd6] min-h-screen">
      <CustomCursor />
      <nav className="px-6 md:px-12 py-6 w-full flex justify-between items-center z-20">
        <div className="relative w-12 h-12">
          <Image src={logo_dark} alt="A5" className="object-contain" priority />
        </div>
        <div className="flex gap-6 font-satoshi font-medium md:gap-10 text-xs text-[#131313]">
          <a
            href="#"
            className="hover:opacity-40 transition-opacity duration-300"
          >
            NAV
          </a>
          <a
            href="#"
            className="hover:opacity-40 transition-opacity duration-300"
          >
            NAV
          </a>
        </div>
      </nav>

      <InfiniteScrollGallery
        images={[krille, tjej, "/videos/leonheadergif.mp4", abbe, buildings]}
      />
      {/* <div className="overflow-hidden whitespace-nowrap py-2">
        <motion.div
          className="inline-block"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="text-[hsl(40,1%,35%)] font-chillax text-lg"
            >
              a5 music publishing •
            </span>
          ))}
        </motion.div>
      </div> */}
    </div>
  );
}
