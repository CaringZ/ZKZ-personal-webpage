"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface TitleScreenProps {
  isActivated: boolean
  onActivate: () => void
}

export default function TitleScreen({ isActivated, onActivate }: TitleScreenProps) {
  // Memoize animation variants to prevent recreation on every render
  const titleVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: isActivated ? -40 : 0,
      },
    }),
    [isActivated]
  )

  const subtitleWrapperVariants = useMemo(
    () => ({
      initial: { opacity: 0, scaleY: 0 },  // Use scaleY instead of maxHeight
      animate: {
        opacity: isActivated ? 1 : 0,
        scaleY: isActivated ? 1 : 0,
      },
    }),
    [isActivated]
  )

  const subtitleVariants = useMemo(
    () => ({
      initial: { y: 12 },
      animate: { y: isActivated ? 0 : 12 },
    }),
    [isActivated]
  )

  return (
    <section className="flex h-screen w-full items-center justify-center px-8">
      <div className="max-w-5xl text-center">
        <motion.h1
          initial={titleVariants.initial}
          animate={titleVariants.animate}
          transition={{
            opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },  // Shortened from 0.8
            y: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },         // Shortened from 1.4
          }}
          onClick={onActivate}
          style={{
            willChange: "transform, opacity",  // Always set for better performance
            transform: "translateZ(0)",        // Force GPU acceleration
          }}
          className="mb-8 cursor-pointer font-sans text-5xl font-bold leading-tight tracking-tight text-foreground transition-colors hover:text-accent md:text-7xl"
        >
          技术美术实战：AI 驱动的自动化资产生产管线
        </motion.h1>

        <motion.div
          initial={subtitleWrapperVariants.initial}
          animate={subtitleWrapperVariants.animate}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },      // Shortened from 1.2
            scaleY: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },  // Shortened from 1.4, use scaleY
          }}
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            transformOrigin: "top",  // Scale from top
          }}
          className="overflow-hidden"
        >
          <motion.h3
            initial={subtitleVariants.initial}
            animate={subtitleVariants.animate}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}  // Shortened from 1.4
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
            className="font-sans text-xl font-light leading-relaxed text-muted-foreground md:text-2xl"
          >
            1人抵30人的生产力革命：1.5个月落地15,000+资产，重构传统电商工作流
          </motion.h3>
        </motion.div>

        {isActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">滚动以探索</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
              style={{ willChange: "transform" }}
              className="text-accent"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {!isActivated && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 font-mono text-sm text-muted-foreground"
          >
            点击标题开始
          </motion.p>
        )}
      </div>
    </section>
  )
}
