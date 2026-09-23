"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** design.md §5 — custom curve that simulates real-world mass. */
const EASE = [0.32, 0.72, 0, 1] as const;

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before the element animates in */
  delay?: number;
  className?: string;
  /** Direction the element travels from */
  from?: "bottom" | "left" | "right" | "none";
  /**
   * design.md §5C asks for a blur that resolves on entry. It is opt-in here
   * because §6 forbids filter animation on large/scrolling content — a grid of
   * 31 cards would otherwise run 31 simultaneous blur animations.
   */
  blur?: boolean;
}

/**
 * Scroll-triggered entrance animation. Respects `prefers-reduced-motion`
 * by rendering the final state immediately.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  from = "bottom",
  blur = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offset =
    from === "bottom"
      ? { y: 64 }
      : from === "left"
        ? { x: -32 }
        : from === "right"
          ? { x: 32 }
          : {};

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...(blur ? { filter: "blur(6px)" } : {}),
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
    },
  };

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
