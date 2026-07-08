"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

type Tag = "div" | "section" | "li" | "article" | "ul" | "ol";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: Tag;
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
  const Component = as;

  if (reduce) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion[as];

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

// Container che rivela in cascata i figli avvolti in <StaggerItem>.
// Reveal 100ms fra un figlio e l'altro, coerente con `stagger` in lib/motion.
export function StaggerGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Component = as;

  if (reduce) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Component = as;

  if (reduce) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag className={className} variants={staggerItem}>
      {children}
    </MotionTag>
  );
}
