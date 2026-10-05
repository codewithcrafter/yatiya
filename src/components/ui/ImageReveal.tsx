"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ImageReveal({ children, delay = 0, duration = 1.4, className = "" }: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
        transition={{ duration, delay, ease: [0.33, 1, 0.68, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
