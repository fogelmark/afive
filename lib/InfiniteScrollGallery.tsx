'use client';

import { useRef, useLayoutEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';

type MediaItem = StaticImageData | string;

interface InfiniteScrollGalleryProps {
  images: MediaItem[];
}

export default function InfiniteScrollGallery({ images }: InfiniteScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust for faster/slower scrolling

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollPosition += e.deltaY * scrollSpeed;
    };

    // GSAP ticker for smooth animation
    const ticker = gsap.ticker.add(() => {
      if (!wrapper.firstElementChild) return;

      const firstItem = wrapper.firstElementChild as HTMLElement;
      const itemWidth = firstItem.offsetWidth;
      const gap = parseFloat(getComputedStyle(wrapper).gap) || 12.8;
      const totalWidth = (itemWidth + gap) * images.length;

      // Normalize position for infinite loop
      scrollPosition = ((scrollPosition % totalWidth) + totalWidth) % totalWidth;

      gsap.set(wrapper, {
        x: -scrollPosition
      });
    });

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      gsap.ticker.remove(ticker);
    };
  }, [images.length]);

  const displayImages = [...images, ...images, ...images];

  return (
    <div ref={containerRef} className="h-full overflow-hidden">
      <div ref={wrapperRef} className="flex gap-[.8rem] h-full">
        {displayImages.map((item, index) => {
          const isVideo = typeof item === 'string' && item.endsWith('.mp4');

          return (
            <a key={index} href="/" className="shrink-0 w-[calc(28.74vw-.8rem)]">
              <div className="relative h-full overflow-hidden">
                {isVideo ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full grayscale object-cover"
                  >
                    <source src={item as string} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item as StaticImageData}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="30vw"
                  />
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
