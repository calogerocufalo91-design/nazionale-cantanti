"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "section" | "li" | "article";
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
  delay,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
