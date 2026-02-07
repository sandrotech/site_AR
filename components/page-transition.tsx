"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Blur Morph Page Transition Component
 * Premium transition effect using GPU-accelerated properties only
 * respects prefers-reduced-motion
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          filter: "blur(20px)",
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
        }}
        exit={{
          opacity: 0,
          filter: "blur(20px)",
          scale: 1.02,
        }}
        transition={{
          duration: 0.4,
          ease: [0.6, 0.01, 0.05, 0.95], // Custom easing for organic feel
        }}
        style={{
          willChange: "opacity, filter, transform",
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
