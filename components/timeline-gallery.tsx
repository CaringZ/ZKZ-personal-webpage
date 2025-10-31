"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"
import { ArtworkCard } from "./artwork-card"
import type { Artwork } from "@/app/art-gallery/page"

interface TimelineGalleryProps {
  artworks: Artwork[]
  onArtworkClick: (artwork: Artwork) => void
  isLoaded: boolean
}

interface FloatingParticle {
  left: number
  top: number
  delay: number
  duration: number
}

const PARTICLE_COUNT = 20
const FALLBACK_PARTICLE: FloatingParticle = {
  left: 50,
  top: 50,
  delay: 0,
  duration: 6,
}
const SCROLL_LOCK_DURATION_MS = 420

export function TimelineGallery({ artworks, onArtworkClick, isLoaded }: TimelineGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const [particles, setParticles] = useState<FloatingParticle[]>(
    () => Array.from({ length: PARTICLE_COUNT }, () => FALLBACK_PARTICLE),
  )
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const visibilityMapRef = useRef<Map<string, number>>(new Map())
  const [activeId, setActiveId] = useState<string | null>(artworks[0]?.id ?? null)
  const activeIdRef = useRef<string | null>(artworks[0]?.id ?? null)
  const isProgrammaticScrollRef = useRef(false)
  const activeIndex = useMemo(() => {
    if (!activeId) {
      return 0
    }
    const index = artworks.findIndex((item) => item.id === activeId)
    return index >= 0 ? index : 0
  }, [activeId, artworks])

  useEffect(() => {
    setActiveId(artworks[0]?.id ?? null)
    activeIdRef.current = artworks[0]?.id ?? null
    visibilityMapRef.current.clear()
  }, [artworks])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let hasUpdates = false
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-artwork-id")
            if (id) {
              setVisibleCards((prev) => new Set([...prev, id]))
            }
          }
        })

        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-artwork-id")
          if (!id) return
          const ratio = entry.isIntersecting ? entry.intersectionRatio : 0
          visibilityMapRef.current.set(id, ratio)
          hasUpdates = true
        })

        if (hasUpdates) {
          let nextId: string | null = activeIdRef.current
          let maxRatio = -1
          visibilityMapRef.current.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio
              nextId = id
            }
          })
          if (nextId && nextId !== activeIdRef.current) {
            activeIdRef.current = nextId
            setActiveId(nextId)
          }
        }
      },
      { threshold: Array.from({ length: 21 }, (_, idx) => idx / 20) },
    )

    const cards = containerRef.current?.querySelectorAll("[data-artwork-id]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [artworks])

  useEffect(() => {
    if (!isLoaded) {
      return
    }
    const nextParticles = Array.from({ length: PARTICLE_COUNT }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }))
    setParticles(nextParticles)
  }, [isLoaded])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isLoaded || artworks.length === 0) {
        return
      }
      if (event.ctrlKey) {
        return
      }

      const absDeltaY = Math.abs(event.deltaY)
      const absDeltaX = Math.abs(event.deltaX)
      if (absDeltaY < absDeltaX) {
        return
      }

      if (isProgrammaticScrollRef.current) {
        event.preventDefault()
        return
      }

      if (absDeltaY < 10) {
        return
      }

      event.preventDefault()

      const direction = event.deltaY > 0 ? 1 : -1
      let nextIndex = activeIndex + direction
      nextIndex = Math.max(0, Math.min(artworks.length - 1, nextIndex))

      if (nextIndex === activeIndex) {
        return
      }

      const targetSection = sectionRefs.current[nextIndex]
      if (!targetSection) {
        return
      }

      isProgrammaticScrollRef.current = true
      targetSection.scrollIntoView({ behavior: "smooth", block: "center" })

      window.setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, SCROLL_LOCK_DURATION_MS)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeIndex, artworks.length, isLoaded])

  return (
    <div className="relative pb-12 pt-24">
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 hidden md:block">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
      </div>

      <div ref={containerRef} className="container mx-auto px-4 sm:px-6">
        <div className="relative space-y-4 md:space-y-8 pt-[18vh] md:pt-[20vh]">
          {artworks.map((artwork, index) => {
            const artworkOnRight = index % 2 === 0
            const isVisible = visibleCards.has(artwork.id)
            const translateCardHidden = artworkOnRight ? "translate-x-16" : "-translate-x-16"
            const translateTimeHidden = artworkOnRight ? "-translate-x-16" : "translate-x-16"
            const cardAlignmentClass = artworkOnRight ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0"
            const metaAlignmentClass = artworkOnRight
              ? "md:items-end md:text-right md:pr-1 md:-mr-1"
              : "md:items-start md:text-left md:pl-1 md:-ml-1"
            const distanceFromActive = Math.abs(index - activeIndex)
            const fadeClass =
              distanceFromActive === 0
                ? "opacity-100 scale-100"
                : distanceFromActive === 1
                  ? "opacity-40 scale-[0.98]"
                  : "opacity-20 scale-[0.96]"

            return (
              <div
                key={artwork.id}
                data-artwork-id={artwork.id}
                ref={(element) => {
                  sectionRefs.current[index] = element
                }}
                className={`relative flex min-h-[55vh] flex-col items-center justify-center gap-4 transition-all duration-700 ease-out md:items-center md:justify-center md:gap-6 ${
                  artworkOnRight ? "md:flex-row" : "md:flex-row-reverse"
                } ${fadeClass}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 z-10 w-px -translate-x-1/2">
                  <div
                    className={`absolute top-0 bottom-1/2 w-px bg-gradient-to-b from-transparent ${
                      distanceFromActive === 0
                        ? "via-[#4cc9f0]/70 to-[#4cc9f0]/20 opacity-95"
                        : "via-border/30 to-transparent opacity-30"
                    } transition-all duration-700`}
                  />
                  <div
                    className={`absolute top-1/2 bottom-0 w-px bg-gradient-to-t from-transparent ${
                      distanceFromActive === 0
                        ? "via-[#4cc9f0]/70 to-[#4cc9f0]/20 opacity-95"
                        : "via-border/30 to-transparent opacity-30"
                    } transition-all duration-700`}
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`relative h-4 w-4 rounded-full transition-all duration-700 ${
                        distanceFromActive === 0
                          ? "bg-[#4cc9f0] shadow-[0_0_34px_9px_rgba(76,201,240,0.6)]"
                          : "bg-border/50"
                      } ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                    >
                      {distanceFromActive === 0 && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-[#4cc9f0]/60 blur-md opacity-95" />
                          <div className="absolute inset-0 rounded-full border border-[#4cc9f0]/70 animate-ping" />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline meta */}
                <div
                  className={`hidden md:flex md:w-[40rem] md:flex-col items-center gap-2 text-muted-foreground transition-all duration-700 ${metaAlignmentClass} ${
                    isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${translateTimeHidden}`
                  }`}
                  style={{ transitionDelay: `${index * 120 + 150}ms` }}
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">创作时间</span>
                  <span className="text-3xl font-semibold text-foreground">{artwork.year}</span>
                  <span className="text-sm font-mono text-muted-foreground/80">{artwork.title}</span>
                </div>

                <div
                  className={`w-full md:flex-1 md:max-w-[42%] transition-all duration-1000 ${cardAlignmentClass} ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${translateCardHidden}`
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6 flex flex-col items-center gap-2 text-muted-foreground md:hidden">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">创作时间</span>
                    <span className="text-2xl font-semibold text-foreground">{artwork.year}</span>
                    <span className="text-sm font-mono text-muted-foreground/80">{artwork.title}</span>
                  </div>
                  <ArtworkCard artwork={artwork} onClick={() => onArtworkClick(artwork)} index={index} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="返回顶部"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur-md transition-[color,border,transform] duration-300 hover:-translate-y-1 hover:border-accent hover:text-foreground"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
