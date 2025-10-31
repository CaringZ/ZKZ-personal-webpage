"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface GalleryHeaderProps {
  isLoaded: boolean
}

export function GalleryHeader({ isLoaded }: GalleryHeaderProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const opacity = Math.max(0, 1 - scrollY / 400)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-opacity duration-300" style={{ opacity }}>
      <div className="absolute left-6 top-6 sm:left-8">
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-[color,border,transform] duration-300 hover:border-accent hover:text-foreground"
          aria-label="返回主页"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>返回主页</span>
        </Link>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div
          className={`mt-4 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#4cc9f0] mb-4 text-balance">
            流动的时间线
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">探索艺术与时间的交织</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ opacity: opacity * 0.6 }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">滚动探索</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </header>
  )
}
