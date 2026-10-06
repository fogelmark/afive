/* eslint-disable */

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TextFlipProps {
  children: string;
  className?: string;
  trigger?: boolean;
}

export function TextFlip({ children, className, trigger }: TextFlipProps) {
  const [flipCount, setFlipCount] = useState(0);

  useEffect(() => {
    if (trigger) {
      setFlipCount((prev) => prev + 1);
    }
  }, [trigger]);

  const wrapper = cn(
    "relative flex w-fit items-center justify-center overflow-hidden",
    className
  );

  return (
    <span className={wrapper}>
      <span className="relative block h-[1em] leading-none">
        <motion.span
          key={flipCount + "-out"}
          className="relative inline-block"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          {children}
        </motion.span>

        <motion.span
          key={flipCount + "-in"}
          className="absolute top-0 left-0"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          {children}
        </motion.span>
      </span>
    </span>
  );
}
