"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Artwork } from "@/app/art-gallery/page"

interface ArtworkModalProps {
  artwork: Artwork | null
  currentIndex: number
  totalCount: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function ArtworkModal({ 
  artwork, 
  currentIndex,
  totalCount,
  onClose, 
  onNext, 
  onPrev 
}: ArtworkModalProps) {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 })
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 })
  const [intrinsicSize, setIntrinsicSize] = useState({ width: 1920, height: 1080 })
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [artwork])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, onNext, onPrev])

  useEffect(() => {
    if (typeof window === "undefined" || !artwork) {
      setDisplaySize({ width: 0, height: 0 })
      return
    }

    const handleResize = () => {
      const maxWidth = window.innerWidth * 0.85
      const maxHeight = window.innerHeight * 0.9
      const img = new (window.Image)()
      img.src = artwork.image
      img.onload = () => {
        const naturalWidth = img.naturalWidth || 1920
        const naturalHeight = img.naturalHeight || 1080
        setIntrinsicSize({ width: naturalWidth, height: naturalHeight })
        const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1)
        const width = naturalWidth * scale
        const height = naturalHeight * scale
        setDisplaySize({ width, height })
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [artwork])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMagnifierPos({ x: e.clientX, y: e.clientY })
    setImagePos({
      x: Math.max(0, Math.min(x, rect.width)),
      y: Math.max(0, Math.min(y, rect.height)),
    })
  }

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-6 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-40 hover:opacity-100 transition-all duration-300"
              aria-label="上一张"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
          )}
          {currentIndex < totalCount - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-6 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-40 hover:opacity-100 transition-all duration-300"
              aria-label="下一张"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 md:top-6 right-4 md:right-6 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:rotate-90"
            aria-label="关闭"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                ref={imageContainerRef}
                className="relative inline-flex"
                style={{
                  width: `${displaySize.width}px`,
                  height: `${displaySize.height}px`,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
              >
                {displaySize.width > 0 && (
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={intrinsicSize.width}
                    height={intrinsicSize.height}
                    className="h-full w-full rounded-sm object-contain"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {showMagnifier && displaySize.width > 0 && displaySize.height > 0 && (
            <div
              className="fixed pointer-events-none z-50 rounded-full border-4 border-white/50 shadow-2xl overflow-hidden"
              style={{
                width: "300px", height: "300px",
                left: `${magnifierPos.x - 150}px`, top: `${magnifierPos.y - 150}px`,
                backgroundImage: `url(${artwork.image})`,
                backgroundPosition: `-${imagePos.x * 2.5 - 150}px -${imagePos.y * 2.5 - 150}px`,
                backgroundSize: `${displaySize.width * 2.5}px ${displaySize.height * 2.5}px`,
                backgroundRepeat: "no-repeat",
              }}
            />
          )}

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-right space-y-2 bg-black/60 backdrop-blur-md px-6 py-4 rounded-sm border border-white/10">
            <h2 className="text-xl md:text-2xl font-light text-white tracking-tight">{artwork.title}</h2>
            <div className="text-base text-white/60 flex flex-col items-end gap-1">
              <span>{artwork.year}</span>
              <span>{artwork.category}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}