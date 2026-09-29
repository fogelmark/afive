"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

type MediaItem = StaticImageData | string;

interface InfiniteScrollGalleryProps {
  images: MediaItem[];
}

const pageLabels = ["info", "roster", "projects", "contact", "archive"];

export default function InfiniteScrollGallery({
  images,
}: InfiniteScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

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
  }, [images.length]);

  const displayImages = [...images, ...images, ...images];

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-6rem)] flex-nowrap items-end p-[.8rem] relative"
    >
      {/* Hover label overlay */}
      {hoveredLabel && (
        <div className="fixed inset-0 pointer-events-none flex z-50 items-center justify-end pr-[3.2rem]">
          <motion.h2
            key={hoveredLabel}
            className="font-chillax text-[12vw] font-semibold text-[hsl(40,1%,40%)] -translate-y-26 lowercase"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {hoveredLabel}
          </motion.h2>
        </div>
      )}

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
              className="shrink-0 w-[calc(28.74vw-.8rem)]"
              animate={{
                marginLeft: hoveredIndex === index ? ".8rem" : "0rem",
                marginRight: hoveredIndex === index ? ".8rem" : "0rem",
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => {
                setHoveredLabel(label);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredLabel(null);
                setHoveredIndex(null);
              }}
            >
              <motion.div className="relative h-100 overflow-hidden">
                  <motion.div
                    className="size-full"
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
              </motion.div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
