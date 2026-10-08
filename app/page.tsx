"use client";

import krille from "@/public/images/krille.jpg";
import abbe from "@/public/images/abbe.jpg";
import tjej from "@/public/images/tjej.jpg";
import buildings from "@/public/images/buildings.jpg";
import InfiniteScrollGallery from "@/app/components/InfiniteScrollGallery";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Header from "./components/header";
import PreloaderLogo from "./components/PreloaderLogo";

export default function Home() {
  return (
    <div className="md:h-screen bg-offwhite">
      <Preloader>
        <Header />
        <CustomCursor />
        <InfiniteScrollGallery
          images={[krille, tjej, "/videos/leonheadergif.mp4", abbe, buildings]}
        />
      </Preloader>
    </div>
  );
}
