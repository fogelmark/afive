"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { TextFlip } from "./text-flip";

type MediaItem = StaticImageData | string;

interface InfiniteScrollGalleryProps {
  images: MediaItem[];
}

const pageLabels = ["info", "roster", "label", "contact", "archive"];

export default function InfiniteScrollGallery({
  images,
}: InfiniteScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [triggerFlip, setTriggerFlip] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper || isMobile) return;

    let scrollPosition = 0;
    let velocity = 0;
    const scrollSpeed = 0.1;
    const friction = 0.95;
    let cachedTotalWidth = 0;
    let rafId: number;

    // Cache dimensions once
    const cacheDimensions = () => {
      if (!wrapper.firstElementChild) return;
      const firstItem = wrapper.firstElementChild as HTMLElement;
      const itemWidth = firstItem.offsetWidth;
      const gap = parseFloat(getComputedStyle(wrapper).gap) || 12.8;
      cachedTotalWidth = (itemWidth + gap) * images.length;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      velocity += e.deltaY * scrollSpeed;
    };

    // RAF-based render loop with momentum and easing
    const render = () => {
      if (cachedTotalWidth > 0) {
        // Apply velocity to scroll position
        scrollPosition += velocity;

        // Apply friction to create momentum decay
        velocity *= friction;

        // Normalize position for infinite loop
        const normalizedPosition =
          ((scrollPosition % cachedTotalWidth) + cachedTotalWidth) %
          cachedTotalWidth;

        // Direct transform for best performance
        wrapper.style.transform = `translate3d(${-normalizedPosition}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    // Initialize
    cacheDimensions();
    render();

    container.addEventListener("wheel", handleWheel, { passive: false });

    // Recalculate on resize
    const handleResize = () => cacheDimensions();
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [images.length, isMobile]);

  const displayImages = isMobile ? images : [...images, ...images, ...images];

  if (isMobile) {
    // Mobile: vertical scrollable grid
    return (
      <div className="p-[.8rem] pb-[3.2rem] min-h-[calc(100vh-6rem)]">
        <div className="flex flex-col gap-[.8rem]">
          {displayImages.map((item, index) => {
            const isVideo = typeof item === "string" && item.endsWith(".mp4");
            const label = pageLabels[index % pageLabels.length];

            return (
              <a key={index} href="/" className="w-full">
                <div className="relative aspect-3/4 overflow-hidden">
                  {isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="grayscale size-full object-cover"
                    >
                      <source src={item as string} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={item as StaticImageData}
                      alt={label}
                      fill
                      className="object-cover object-top size-full"
                      sizes="(max-width: 768px) 100vw, 30vw"
                      quality={95}
                      priority={index === 0}
                    />
                  )}
                  {/* Mobile label overlay */}
                  <div className="absolute bottom-4 right-4">
                    <h3 className="font-chillax text-4xl font-semibold text-[hsl(40,64%,50%)] lowercase drop-shadow-lg">
                      {label}
                    </h3>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop: horizontal infinite scroll
  return (
    <div ref={containerRef} className="h-[calc(100vh-5rem)] p-[.8rem] relative">
      <div
        ref={wrapperRef}
        className="flex gap-[.8rem] h-full items-end"
        style={{ willChange: "transform" }}
      >
        {displayImages.map((item, index) => {
          const isVideo = typeof item === "string" && item.endsWith(".mp4");
          const label = pageLabels[index % pageLabels.length];

          return (
            <motion.a
              key={index}
              href="/"
              className="shrink-0 relative w-full md:w-[calc(28.74vw-.8rem)]"
              animate={{
                x:
                  hoveredIndex !== null && index < hoveredIndex
                    ? "-.8rem"
                    : hoveredIndex !== null && index > hoveredIndex
                      ? ".8rem"
                      : "0rem",
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => {
                setHoveredLabel(label);
                setHoveredIndex(index);
                setTriggerFlip(index);
              }}
              onMouseLeave={() => {
                setHoveredLabel(null);
                setHoveredIndex(null);
              }}
            >
              <motion.div className="relative h-[66vh] overflow-hidden">
                <motion.div
                  className="size-full relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="grayscale size-full object-cover"
                    >
                      <source src={item as string} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={item as StaticImageData}
                      alt=""
                      fill
                      className="object-cover object-top size-full"
                      sizes="30vw"
                    />
                  )}
                </motion.div>
                {/* Desktop label overlay */}
                <motion.div
                  className="absolute bottom-1 right-3 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10,
                    filter: hoveredIndex === index ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="font-satoshi text-4xl leading-none px-1 tracking-tighter font-medium text-offwhite capitalize drop-shadow-lg">
                    {label}
                  </h3>
                </motion.div>
              </motion.div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
