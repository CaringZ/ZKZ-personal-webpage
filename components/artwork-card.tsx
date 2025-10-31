"use client"

import { useState } from "react"
import Image from "next/image"
import type { Artwork } from "@/app/art-gallery/page"

interface ArtworkCardProps {
  artwork: Artwork
  onClick: () => void
  index: number
}

export function ArtworkCard({ artwork, onClick, index: _index }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [aspectRatio, setAspectRatio] = useState(16 / 9)

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-sm bg-card border border-border transition-all duration-500 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio }}
        >
          <Image
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            fill
            className={`object-cover transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            onLoadingComplete={(img) => {
              const { naturalWidth, naturalHeight } = img
              if (naturalWidth && naturalHeight) {
                setAspectRatio(naturalWidth / naturalHeight)
              }
            }}
          />

          {/* Overlay gradient removed along with text to keep imagery clean */}
        </div>
      </div>

      {/* Shimmer effect */}
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
  )
}
