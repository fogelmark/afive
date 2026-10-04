"use client";

import krille from "@/public/images/krille.jpg";
import abbe from "@/public/images/abbe.jpg";
import tjej from "@/public/images/tjej.jpg";
import buildings from "@/public/images/buildings.jpg";
import InfiniteScrollGallery from "@/app/components/InfiniteScrollGallery";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <div className="max-h-screen">
      <CustomCursor />
      <InfiniteScrollGallery
        images={[krille, tjej, "/videos/leonheadergif.mp4", abbe, buildings]}
      />
    </div>
  );
}
