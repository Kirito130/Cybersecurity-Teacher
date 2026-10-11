"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollPathProps = {
  children: ReactNode;
  className?: string;
};

/** Vertical clearance track whose ink fills as the section scrolls into view. */
export function ScrollPath({ children, className }: ScrollPathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const height = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={className}>
      <div
        aria-hidden
        className="absolute top-3 bottom-3 left-[0.85rem] w-px bg-bezel md:left-4"
      />
      {!reduced ? (
        <motion.div
          aria-hidden
          className="absolute top-3 left-[0.85rem] w-px origin-top bg-phosphor md:left-4"
          style={{ height }}
        />
      ) : (
        <div
          aria-hidden
          className="absolute top-3 bottom-3 left-[0.85rem] w-px bg-phosphor/50 md:left-4"
        />
      )}
      {children}
    </div>
  );
}
