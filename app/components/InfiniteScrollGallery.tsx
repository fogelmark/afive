"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { TextFlip } from "./text-flip";
import { usePreloaderAnimation } from "./Preloader";

type MediaItem = StaticImageData | string;

interface InfiniteScrollGalleryProps {
  images: MediaItem[];
}

const pageLabels = ["label", "roster", "news", "archive", "contact"];
const pageLinks = ["/label", "/roster", "/news", "/archive", "/contact"];

export default function InfiniteScrollGallery({
  images,
}: InfiniteScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [triggerFlip, setTriggerFlip] = useState<number | null>(null);
  const shouldAnimate = usePreloaderAnimation();

  useEffect(() => {
    console.log('shouldAnimate:', shouldAnimate);
  }, [shouldAnimate]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // Check if device is mobile/touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let scrollPosition = 0;
    let velocity = 0;
    const scrollSpeed = 0.1;
    const friction = 0.95;
    let cachedTotalWidth = 0;
    let rafId: number;
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

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

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
      velocity = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchStartX - touchX;
      const deltaY = Math.abs(touchStartY - touchY);

      // Only handle horizontal scroll if the gesture is more horizontal than vertical
      if (Math.abs(deltaX) > deltaY) {
        e.preventDefault();
        velocity = deltaX * 0.5;
        touchStartX = touchX;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
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

    // Add touch event listeners for mobile
    if (isTouchDevice) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    // Recalculate on resize
    const handleResize = () => cacheDimensions();
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (isTouchDevice) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [images.length]);

  const displayImages = [...images, ...images, ...images];

  // Horizontal infinite scroll for both mobile and desktop
  return (
    <div ref={containerRef} className="h-[calc(100dvh-6rem)] md:h-[calc(100vh-5rem)] p-[.8rem] relative overflow-hidden">
      <div
        ref={wrapperRef}
        className="flex gap-[.8rem] h-full items-end"
        style={{ willChange: "transform" }}
      >
        {displayImages.map((item, index) => {
          const isVideo = typeof item === "string" && item.endsWith(".mp4");
          const label = pageLabels[index % pageLabels.length];
          const link = pageLinks[index % pageLinks.length];

          const isOriginalCard = index < images.length;
          const animationDelay = isOriginalCard ? (index * 0.1) : 0;

          return (
            <motion.a
              key={index}
              href={link}
              className="shrink-0 relative w-[75vw] md:w-[calc(28.74vw-.8rem)]"
              animate={{
                x:
                  hoveredIndex !== null && index < hoveredIndex
                    ? "-.8rem"
                    : hoveredIndex !== null && index > hoveredIndex
                      ? ".8rem"
                      : "0rem",
              }}
              transition={{
                x: { duration: 0.6, ease: "easeOut" },
              }}
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
              <motion.div className="relative h-[66vh] overflow-hidden" style={{ backfaceVisibility: 'hidden', padding: '.5px', margin: '-.5px' }}>
                {/* Curtain overlay that reveals the image */}
                {isOriginalCard && (
                  <motion.div
                    className="absolute -inset-0.5 z-10 bg-[#F1EEE9]"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                    initial={{ y: 0 }}
                    animate={{
                      y: shouldAnimate ? "-100%" : 0,
                    }}
                    transition={{
                      duration: 2.6,
                      delay: animationDelay,
                      ease: [0.60, 0.50, 0.10, 1],
                    }}
                  />
                )}
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
                      sizes="(max-width: 768px) 75vw, 30vw"
                      quality={95}
                    />
                  )}
                </motion.div>
                {/* Label overlay - always visible on mobile, hover on desktop */}
                <div className="absolute bottom-3 right-3 md:bottom-1 md:right-3 pointer-events-none">
                  <h3 className="font-satoshi text-3xl md:text-4xl leading-none px-1 tracking-tighter font-medium text-offwhite capitalize drop-shadow-lg md:hidden">
                    {label}
                  </h3>
                </div>

                {/* Desktop-only hover label */}
                <motion.div
                  className="hidden md:block absolute bottom-1 right-3 pointer-events-none"
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
