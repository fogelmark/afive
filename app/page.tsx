import Image from "next/image";
import logo_dark from "@/public/logos/A5-logo-dark-3c3c3c.png";
import krille from "@/public/images/krille.jpg";
import abbe from "@/public/images/abbe.jpg";
import tjej from "@/public/images/tjej.jpg";
import buildings from "@/public/images/buildings.jpg";
import InfiniteScrollGallery from "@/lib/InfiniteScrollGallery";
// import lotta from "@/public/videos/leonheadergif.mp4"

export default function Home() {
  return (
    <div className="bg-[#f1eee9]">
      <nav className="px-6 md:px-12 py-6 fixed top-0 left-0 w-full flex justify-between items-center z-20">
        <div className="relative w-12 h-12">
          <Image
            src={logo_dark}
            alt="A5"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex gap-6 md:gap-10 text-[10px] md:text-xs tracking-[0.2em] text-[#3c3c3c]">
          <a
            href="#"
            className="hover:opacity-40 transition-opacity duration-300"
          >
            ROSTER
          </a>
          <a
            href="#"
            className="hover:opacity-40 transition-opacity duration-300"
          >
            INFO
          </a>
        </div>
      </nav>

      <div>
          <InfiniteScrollGallery
            images={[
              krille,
              tjej,
              "/videos/leonheadergif.mp4",
              abbe,
              buildings,
            ]}
          />
      </div>
    </div>
  );
}
