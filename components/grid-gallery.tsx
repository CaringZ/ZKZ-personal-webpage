"use client"

import type { Artwork } from "@/app/art-gallery/page"
import { ArtworkCard } from "./artwork-card"
import { ArrowUp, AlignJustify } from "lucide-react"

interface GridGalleryProps {
  artworks: Artwork[]
  // 修改 onArtworkClick 的类型定义，让它接收 index
  onArtworkClick: (artwork: Artwork, index: number) => void
  onLayoutChange: (layout: "timeline" | "grid") => void
}

export function GridGallery({ artworks, onArtworkClick, onLayoutChange }: GridGalleryProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {artworks.map((artwork, index) => (
          <ArtworkCard 
            key={artwork.id} 
            artwork={artwork} 
            // 在 onClick 中传递 artwork 和 index
            onClick={() => onArtworkClick(artwork, index)} 
            index={index} 
          />
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onLayoutChange('timeline')}
          aria-label="切换到时间线视图"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-foreground"
        >
          <AlignJustify className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label="返回顶部"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-foreground"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}