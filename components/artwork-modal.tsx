"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import type { Artwork } from "@/app/art-gallery/page"

interface ArtworkModalProps {
  artwork: Artwork | null
  onClose: () => void
}

export function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 })
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 })
  const [_containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [intrinsicSize, setIntrinsicSize] = useState({ width: 1920, height: 1080 })
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = "hidden"
      setTimeout(() => setIsVisible(true), 10)
    } else {
      document.body.style.overflow = "unset"
      setIsVisible(false)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [artwork])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  useEffect(() => {
    if (typeof window === "undefined" || !artwork) {
      return
    }

    const handleResize = () => {
      const maxWidth = window.innerWidth * 0.95
      const maxHeight = window.innerHeight * 0.9
      const scale = Math.min(maxWidth / intrinsicSize.width, maxHeight / intrinsicSize.height, 1)
      const width = intrinsicSize.width * scale
      const height = intrinsicSize.height * scale
      setDisplaySize({ width, height })
      setContainerSize({ width, height })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [artwork, intrinsicSize])

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

  if (!artwork) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:rotate-90"
        aria-label="关闭"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className={`relative w-full h-full flex items-center justify-center p-8 transition-all duration-700 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div
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
          <Image
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            width={intrinsicSize.width}
            height={intrinsicSize.height}
            onLoadingComplete={(img) => {
              setIntrinsicSize({
                width: img.naturalWidth || 1920,
                height: img.naturalHeight || 1080,
              })
            }}
            className="h-full w-full rounded-sm object-contain"
            priority
          />
        </div>

        {showMagnifier && displaySize.width > 0 && displaySize.height > 0 && (
          <div
            className="fixed pointer-events-none z-50 rounded-full border-4 border-white/50 shadow-2xl overflow-hidden"
            style={{
              width: "220px",
              height: "220px",
              left: `${magnifierPos.x - 110}px`,
              top: `${magnifierPos.y - 110}px`,
              backgroundImage: `url(${artwork.image || "/placeholder.svg"})`,
              backgroundPosition: `-${imagePos.x * 2.5 - 110}px -${imagePos.y * 2.5 - 110}px`,
              backgroundSize: `${displaySize.width * 2.5}px ${displaySize.height * 2.5}px`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        <div className="absolute bottom-8 right-8 text-right space-y-1 bg-black/60 backdrop-blur-md px-6 py-4 rounded-sm border border-white/10">
          <h2 className="text-xl md:text-2xl font-light text-white tracking-tight">{artwork.title}</h2>
          <p className="text-sm text-white/60">{artwork.year}</p>
        </div>
      </div>
    </div>
  )
}
