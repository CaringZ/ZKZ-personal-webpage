"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import type { Artwork } from "@/app/art-gallery/page"

interface ArtworkCardProps {
  artwork: Artwork
  onClick: () => void
  index: number
}

export function ArtworkCard({ artwork, onClick, index: _index }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [displaySize, setDisplaySize] = useState<{ width: number; height: number } | null>(null)
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null)
  
  const measuringRef = useRef<HTMLDivElement>(null)

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    if (naturalWidth && naturalHeight) {
      setNaturalSize({ width: naturalWidth, height: naturalHeight })
    }
  }

  useEffect(() => {
    const calculateAndSetSize = () => {
      if (!measuringRef.current || !naturalSize) {
        return
      }

      const maxWidth = measuringRef.current.offsetWidth
      if (maxWidth === 0) return

      const maxHeight = window.innerHeight * 0.65
      let newWidth = maxWidth
      let newHeight = (naturalSize.height / naturalSize.width) * maxWidth

      if (newHeight > maxHeight) {
        newHeight = maxHeight
        newWidth = (naturalSize.width / naturalSize.height) * maxHeight
      }

      setDisplaySize({ width: newWidth, height: newHeight })
    }

    if (naturalSize) {
      calculateAndSetSize()
      window.addEventListener("resize", calculateAndSetSize)
      return () => {
        window.removeEventListener("resize", calculateAndSetSize)
      }
    }
  }, [naturalSize])

  return (
    <div ref={measuringRef} className="w-full">
      <div
        className="group relative cursor-pointer"
        style={
          displaySize
            ? { width: displaySize.width, height: displaySize.height }
            : { width: "100%", aspectRatio: "16/9", visibility: "hidden" }
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-accent/80">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className={`object-cover transition-transform duration-[1400ms] ease-[0.16,1,0.3,1] will-change-transform ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              onLoad={handleLoad}
              sizes="(max-width: 768px) 90vw, 42vw"
              priority={_index < 3}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
          </div>
        </div>

        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer"
            style={{
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      </div>
    </div>
  )
}