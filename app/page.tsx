import Image from "next/image";
import logo_dark from "@/public/logos/A5-logo-dark-3c3c3c.png"
import krille from "@/public/images/krille.jpg"
import abbe from "@/public/images/abbe.jpg"
import tjej from "@/public/images/tjej.jpg"
import buildings from "@/public/images/buildings.jpg"
import InfiniteScrollGallery from "@/lib/InfiniteScrollGallery"
// import lotta from "@/public/videos/leonheadergif.mp4"

export default function Home() {
  return (
    <div className="h-screen bg-[#faf9f7] overflow-hidden relative">
      {/* Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/leonheadergif.mp4" type="video/mp4" />
      </video> */}


      {/* Navigation */}
      <nav className="px-6 md:px-12 py-6 flex justify-between items-center z-10">
        <div className="relative w-12 h-12">
          <Image
            src={logo_dark}
            alt="A5"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex gap-6 md:gap-10 text-[10px] md:text-xs tracking-[0.2em] text-[#1a1a1a]">
          <a href="#" className="hover:opacity-40 transition-opacity duration-300">ROSTER</a>
          <a href="#" className="hover:opacity-40 transition-opacity duration-300">INFO</a>
        </div>
      </nav>

      <main className="h-[calc(100dvh-4rem)] overflow-hidden flex-nowrap items-end p-[.8rem] relative z-10">
          <InfiniteScrollGallery images={[krille, tjej, abbe, '/videos/leonheadergif.mp4', buildings]} />
      </main>
    </div>
  );
}
