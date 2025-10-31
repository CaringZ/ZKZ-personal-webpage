"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import TitleScreen from "./case-study/title-screen"
import SceneOne from "./case-study/scene-one"
import SceneTwo from "./case-study/scene-two"
import SceneThree from "./case-study/scene-three"
import SceneFour from "./case-study/scene-four"
import SceneFive from "./case-study/scene-five"
import SummaryScreen from "./case-study/summary-screen"

export default function HorizontalScrollCaseStudy() {
  const [isActivated, setIsActivated] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartRef = useRef<number | null>(null)

  const scenes = [
    <TitleScreen
      key="title"
      isActivated={isActivated}
      onActivate={() => {
        setIsActivated(true)
      }}
    />,
    <SceneOne key="scene-1" />,
    <SceneTwo key="scene-2" />,
    <SceneThree key="scene-3" />,
    <SceneFour key="scene-4" />,
    <SceneFive key="scene-5" />,
    <SummaryScreen key="summary" />,
  ] as const

  const clampIndex = useCallback(
    (next: number) => Math.max(0, Math.min(scenes.length - 1, next)),
    [scenes.length],
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

  const goToScene = useCallback((direction: 1 | -1) => moveTo((current) => current + direction), [moveTo])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  useEffect(() => {
    const blockedKeys = new Set([" ", "Spacebar", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "End", "Home"])

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      if (!isActivated || isAnimating) {
        return
      }
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
      event.preventDefault()
      if (!isActivated || isAnimating) {
        return
      }
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " " || event.key === "Spacebar") {
        goToScene(1)
      } else if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "Home") {
        goToScene(-1)
      } else if (event.key === "End") {
        moveTo(scenes.length - 1)
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isActivated) {
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
  }, [goToScene, isActivated, isAnimating, moveTo, scenes.length])

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
    <div className="relative">
      {activeIndex === 0 && (
        <Link
          href="/dashboard"
          className="group fixed left-8 top-8 z-50 flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition hover:border-border hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          返回主页
        </Link>
      )}
      {activeIndex > 0 && (
        <button
          type="button"
          aria-label="回到主标题"
          onClick={() => moveTo(0)}
          className="group fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition hover:border-border hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          回到主标题
        </button>
      )}
      <div className="fixed inset-0 overflow-hidden bg-background">
        <motion.div
          className="flex h-full w-full flex-nowrap"
          animate={{ x: `-${activeIndex * 100}vw` }}
          transition={{ duration: 1.15, ease: easing }}
          style={{ width: `${scenes.length * 100}vw` }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {scenes.map((scene, index) => (
            <div key={index} className="flex h-full w-screen shrink-0 items-center justify-center">
              {scene}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
