"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import TitleScreen from "./case-study/title-screen"
import PipelineScene from "./case-study/pipeline-scene"

export default function HorizontalScrollCaseStudy() {
  const [isActivated, setIsActivated] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartRef = useRef<number | null>(null)
  const pipelineMounted = true

  const sceneCount = pipelineMounted ? 2 : 1

  const clampIndex = useCallback(
    (next: number) => Math.max(0, Math.min(sceneCount - 1, next)),
    [sceneCount],
  )

  const moveTo = useCallback(
    (targetOrUpdater: number | ((current: number) => number)) => {
      setActiveIndex((current) => {
        const rawTarget = typeof targetOrUpdater === "function" ? targetOrUpdater(current) : targetOrUpdater
        const target = clampIndex(rawTarget)
        if (target === current) {
          return current
        }
        setIsAnimating(true)
        return target
      })
    },
    [clampIndex],
  )

  const handleBackToTitle = useCallback(() => {
    setIsActivated(false)
    moveTo(0)
  }, [moveTo])

  const scenes = useMemo(() => {
    const handleActivate = () => {
      setIsActivated(true)
    }
    return [
      <TitleScreen key="title" isActivated={isActivated} onActivate={handleActivate} />,
      <PipelineScene key="pipeline" onRequestBack={handleBackToTitle} isActive={activeIndex === 1} />,
    ]
  }, [activeIndex, handleBackToTitle, isActivated])

  const goToScene = useCallback((direction: 1 | -1) => moveTo((current) => current + direction), [moveTo])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  useEffect(() => {
    const blockedKeys = new Set([" ", "Spacebar", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "End", "Home"])

    const handleWheel = (event: WheelEvent) => {
      if (!isActivated || isAnimating || activeIndex !== 0) {
        return
      }
      event.preventDefault()
      if (event.deltaY > 25) {
        goToScene(1)
      } else if (event.deltaY < -25) {
        goToScene(-1)
      }
    }

    const handleKey = (event: KeyboardEvent) => {
      if (!blockedKeys.has(event.key)) {
        return
      }
      if (!isActivated || isAnimating || activeIndex !== 0) {
        return
      }
      event.preventDefault()
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " " || event.key === "Spacebar") {
        goToScene(1)
      } else if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "Home") {
        goToScene(-1)
      } else if (event.key === "End") {
        moveTo(sceneCount - 1)
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isActivated || activeIndex !== 0) {
        event.preventDefault()
        return
      }
      const start = touchStartRef.current
      const current = event.touches[0]?.clientY ?? null
      if (start === null || current === null) {
        return
      }
      const delta = start - current
      if (Math.abs(delta) < 60 || isAnimating) {
        event.preventDefault()
        return
      }
      event.preventDefault()
      goToScene(delta > 0 ? 1 : -1)
      touchStartRef.current = current
    }

    const handleTouchEnd = () => {
      touchStartRef.current = null
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKey)
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKey)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [activeIndex, goToScene, isActivated, isAnimating, moveTo, sceneCount])

  useEffect(() => {
    if (!isActivated) {
      setActiveIndex(0)
    }
  }, [isActivated])

  useEffect(() => {
    if (activeIndex > 0 && !isActivated) {
      setActiveIndex(0)
    }
  }, [activeIndex, isActivated])

  const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

  return (
    <div className="relative h-full w-full">
      {activeIndex === 0 && (
        <Link
          href="/?scene=robot"
          className="group fixed left-8 top-8 z-50 flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition hover:border-border hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          返回主页
        </Link>
      )}
      <div className="fixed inset-0 overflow-hidden">
        {scenes.map((scene, index) => {
          const isActive = index === activeIndex
          const isPrevious = index < activeIndex

          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : isPrevious ? 0.9 : 1.1,
                zIndex: isActive ? 10 : 0,
              }}
              transition={{
                duration: 0.9,  // Shortened from 1.2 for snappier feel
                ease: easing,
                opacity: { duration: 0.6 },  // Shortened from 0.8
              }}
              style={{
                pointerEvents: isActive ? "auto" : "none",
                willChange: "transform, opacity",  // Always set for smoother animation
                transform: "translateZ(0)",        // Force GPU acceleration
              }}
              onAnimationComplete={() => {
                if (isActive) setIsAnimating(false)
              }}
            >
              {scene}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
