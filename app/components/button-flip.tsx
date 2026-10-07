/* eslint-disable */

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, forwardRef } from "react";

interface ButtonProps {
  children: string;
  className?: string;
  onHover?: () => void;
}

export const ButtonFlip = forwardRef<HTMLSpanElement, ButtonProps>(
  ({ children, className, onHover }, ref) => {
    const [hoverCount, setHoverCount] = useState(0);
    const [animating, setAnimating] = useState(false);

    const handleHover = () => {
      if (animating) return;
      setAnimating(true);
      setHoverCount((prev) => prev + 1);

      setTimeout(() => {
        setAnimating(false);
      }, 300);

      onHover?.();
    };

    const wrapper = cn(
      "relative flex w-fit cursor-pointer overflow-hidden items-start justify-center",
      className,
    );

    return (
      <span ref={ref} className={wrapper} onMouseEnter={handleHover}>
        <span className="relative block">
          <motion.span
            key={hoverCount + "-white"}
            className="text-secondary-gray relative inline-block"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            {children}
          </motion.span>

          <motion.span
            key={hoverCount + "-red"}
            className="text-tertiary-gray absolute top-0 left-0"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            {children}
          </motion.span>
        </span>
      </span>
    );
  }
);

ButtonFlip.displayName = "ButtonFlip";
