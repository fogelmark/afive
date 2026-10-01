"use client";

import Image from "next/image";
import logo_dark_stripes from "@/public/logos/afive-fi-stripes-dark.png";
import krille from "@/public/images/krille.jpg";
import abbe from "@/public/images/abbe.jpg";
import tjej from "@/public/images/tjej.jpg";
import buildings from "@/public/images/buildings.jpg";
import InfiniteScrollGallery from "@/app/components/InfiniteScrollGallery";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <div className="bg-[#F1EEE9] min-h-screen">
      <CustomCursor />
      <nav className="px-6 md:px-12 py-6 w-full flex justify-between items-center z-20">
        <div className="relative w-24 h-w-24">
          <Image src={logo_dark_stripes} alt="A5" className="object-contain" priority />
        </div>
        <p className="text-xs uppercase text-[#131313]">nav</p>
        <div className="flex gap-6 font-general-sans font-medium md:gap-10 text-xs text-[#131313]">
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
    </div>
  );
}
