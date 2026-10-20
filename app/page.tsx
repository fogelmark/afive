"use client";

import krille from "@/public/images/krille.jpg";
import abbe from "@/public/images/abbe.jpg";
import roster from "@/public/images/roster.jpg"
import buildings from "@/public/images/buildings.jpg";
import InfiniteScrollGallery from "@/app/components/infinite-scroll-gallery";
import CustomCursor from "./components/custom-cursor";
import Preloader from "./components/preloader";
import Header from "./components/header";
import PreloaderLogo from "./components/preloader-logo";

export default function Home() {
  return (
    <div className="md:h-screen bg-offwhite">
      <Preloader>
        <Header />
        <CustomCursor />
        <InfiniteScrollGallery
          images={[krille, abbe, "/videos/leonheadergif.mp4", roster, buildings]}
        />
      </Preloader>
    </div>
  );
}
