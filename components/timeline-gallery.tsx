"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { ArrowUp, Grid3x3 } from "lucide-react"
import { ArtworkCard } from "./artwork-card"
import type { Artwork } from "@/app/art-gallery/page"

interface GroupedArtwork {
  year: string
  artworks: Artwork[]
}

interface TimelineGalleryProps {
  artworks: Artwork[]
  onArtworkClick: (artwork: Artwork, index: number) => void
  isLoaded: boolean
  onLayoutChange: (layout: "timeline" | "grid") => void
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

export function TimelineGallery({ artworks, onArtworkClick, isLoaded, onLayoutChange }: TimelineGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const [particles, setParticles] = useState<FloatingParticle[]>(() =>
    Array.from({ length: PARTICLE_COUNT }, () => FALLBACK_PARTICLE),
  )

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const yearHeaderRefs = useRef<Record<string, HTMLDivElement | null>>({})
  
  const visibilityMapRef = useRef<Map<string, number>>(new Map())
  const [activeId, setActiveId] = useState<string | null>(artworks[0]?.id ?? null)
  
  const [activeYear, setActiveYear] = useState<string | null>(artworks[0]?.year ?? null)
  
  const activeIdRef = useRef<string | null>(artworks[0]?.id ?? null)
  const isProgrammaticScrollRef = useRef(false)
  const hasCenteredFirstCardRef = useRef(false)
  const isWheelingRef = useRef(false)

  const { groupedArtworks, years } = useMemo(() => {
    const groups: Record<string, Artwork[]> = {}
    artworks.forEach((art) => {
      if (!groups[art.year]) {
        groups[art.year] = []
      }
      groups[art.year].push(art)
    })
    const groupedArtworks = Object.entries(groups)
      .map(([year, artworks]) => ({ year, artworks }))
      .sort((a, b) => Number(b.year) - Number(a.year))
    const years = groupedArtworks.map(group => group.year)
    return { groupedArtworks, years }
  }, [artworks])

  const scrollToArtwork = useCallback(
    (artworkId: string, behavior: ScrollBehavior = "smooth") => {
      const targetSection = sectionRefs.current[artworkId]
      if (!targetSection) return
      
      isProgrammaticScrollRef.current = true
      targetSection.scrollIntoView({ behavior, block: "center" })
      setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, SCROLL_LOCK_DURATION_MS + (behavior === 'smooth' ? 200 : 0))
    },
    [],
  )

  const scrollToYear = (year: string) => {
    const targetHeader = yearHeaderRefs.current[year]
    if (targetHeader) {
      isWheelingRef.current = true
      targetHeader.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        const firstArtworkId = groupedArtworks.find(g => g.year === year)?.artworks[0]?.id
        if (firstArtworkId) {
          scrollToArtwork(firstArtworkId, 'smooth')
        }
        setTimeout(() => {
          isWheelingRef.current = false
        }, 700)
      }, 500)
    }
  }
  
  useLayoutEffect(() => {
    if (!isLoaded || hasCenteredFirstCardRef.current || artworks.length === 0) return
    const firstArtworkId = artworks[0]?.id
    if (!firstArtworkId) return
    
    hasCenteredFirstCardRef.current = true
    setTimeout(() => scrollToArtwork(firstArtworkId, "auto"), 150)
  }, [isLoaded, artworks, scrollToArtwork])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isWheelingRef.current) {
        event.preventDefault()
        return
      }
      event.preventDefault()
      isWheelingRef.current = true

      const scrollDown = event.deltaY > 0
      const currentIdx = artworks.findIndex(a => a.id === activeId)

      if (scrollDown) {
        if (currentIdx < artworks.length - 1) {
          scrollToArtwork(artworks[currentIdx + 1].id)
        }
      } else {
        if (currentIdx > 0) {
          scrollToArtwork(artworks[currentIdx - 1].id)
        }
      }
      setTimeout(() => { isWheelingRef.current = false }, 700)
    }
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeId, artworks, scrollToArtwork])

  useEffect(() => {
    if (!isLoaded) return
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, () => ({
        left: Math.random() * 100, top: Math.random() * 100,
        delay: Math.random() * 4, duration: 6 + Math.random() * 6,
      })),
    )
  }, [isLoaded])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-artwork-id")
          if (id && entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, id]))
          }
          if (id) {
            visibilityMapRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
          }
        })
        
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
          
          const currentArtwork = artworks.find(a => a.id === nextId)
          if (currentArtwork) {
            setActiveYear(currentArtwork.year)
          }
        }
      },
      { threshold: Array.from({ length: 21 }, (_, idx) => idx / 20) },
    )

    const cards = containerRef.current?.querySelectorAll("[data-artwork-id]")
    cards?.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [artworks])

  const handleScrollToTop = () => {
    if (years.length > 0) {
      scrollToYear(years[0])
    }
  }

  return (
    <div className="relative pb-12">
      <div className="fixed left-0 top-0 bottom-0 z-30 hidden items-center md:flex">
        <div className="flex flex-col items-start gap-2 p-6">
          {years.map(year => (
            <button
              key={year}
              onClick={() => scrollToYear(year)}
              className={`rounded-full px-3 py-1 text-sm transition-all duration-300 ${
                activeYear === year
                  ? 'bg-accent/20 text-accent-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      
      <div className="absolute left-1/2 top-0 bottom-0 hidden md:block">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
      </div>

      <div ref={containerRef} className="container mx-auto px-4 sm:px-6">
        <div className="relative space-y-4 md:space-y-8 pt-[10vh] md:pt-[15vh]">
          {groupedArtworks.map(({ year, artworks: yearArtworks }) => (
            <div key={year} className="relative">
              <div 
                ref={el => { yearHeaderRefs.current[year] = el }}
                className="sticky top-[88px] z-20 py-4 md:py-8 flex justify-center"
              >
                <h2 className="text-2xl font-bold tracking-widest text-muted-foreground bg-background/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {year}
                </h2>
              </div>
              
              {yearArtworks.map((artwork) => {
                const index = artworks.findIndex(a => a.id === artwork.id)
                const artworkOnRight = index % 2 === 0
                const isVisible = visibleCards.has(artwork.id)
                const isActive = activeId === artwork.id

                const translateCardHidden = artworkOnRight ? "translate-x-16" : "-translate-x-16"
                const metaAlignmentClass = artworkOnRight ? "md:items-end md:text-right" : "md:items-start md:text-left"
                const fadeClass = isActive ? "opacity-100 scale-[1.0]" : "opacity-30 scale-[0.97] hover:opacity-70"
                
                return (
                  <div
                    key={artwork.id}
                    data-artwork-id={artwork.id}
                    ref={(element) => { sectionRefs.current[artwork.id] = element }}
                    className={`relative flex min-h-[65vh] flex-col items-center justify-center gap-4 transition-all duration-700 ease-out md:flex-row ${
                      artworkOnRight ? "md:gap-24" : "md:flex-row-reverse md:gap-24"
                    } ${fadeClass}`}
                  >
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 z-10 w-px -translate-x-1/2">
                      <div className={`absolute top-0 bottom-1/2 w-px bg-gradient-to-t from-transparent transition-all duration-700 ${ isActive ? "via-[#4cc9f0]/70 to-[#4cc9f0]/20 opacity-95" : "via-border/30 to-transparent opacity-30" }`} />
                      <div className={`absolute top-1/2 bottom-0 w-px bg-gradient-to-b from-transparent transition-all duration-700 ${ isActive ? "via-[#4cc9f0]/70 to-[#4cc9f0]/20 opacity-95" : "via-border/30 to-transparent opacity-30" }`} />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className={`relative h-4 w-4 rounded-full transition-all duration-700 ${ isActive ? "bg-[#4cc9f0] shadow-[0_0_34px_9px_rgba(76,201,240,0.6)]" : "bg-border/50" } ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                          {isActive && (
                            <>
                              <div className="absolute inset-0 rounded-full bg-accent/60 blur-md opacity-95" />
                              <div className="absolute inset-0 rounded-full border border-accent/70 animate-ping" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`hidden md:flex md:w-[42%] md:flex-col gap-2 transition-all duration-700 ${metaAlignmentClass} ${ isVisible ? "opacity-100" : "opacity-0" }`}>
                      <h3 className="text-3xl font-semibold text-foreground">{artwork.title}</h3>
                      <p className="text-base text-muted-foreground max-w-sm">{artwork.description}</p>
                      {/* --- 新增代码 (桌面端) --- */}
                      <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground/60">{artwork.category}</p>
                    </div>
                    
                    <div className={`w-full flex transition-all duration-1000 ${ artworkOnRight ? 'md:justify-start' : 'md:justify-end' } md:w-[42%] ${ isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${translateCardHidden}` }`}>
                       <div className="mb-6 flex flex-col items-center text-center gap-2 text-muted-foreground md:hidden">
                         <h3 className="text-2xl font-semibold text-foreground">{artwork.title}</h3>
                         <p className="text-sm text-muted-foreground px-4">{artwork.description}</p>
                         {/* --- 新增代码 (移动端) --- */}
                         <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground/60">{artwork.category}</p>
                       </div>
                       <ArtworkCard artwork={artwork} onClick={() => onArtworkClick(artwork, index)} index={index} />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <div key={i} className="absolute w-1 h-1 bg-accent/20 rounded-full animate-float" style={{ left: `${particle.left}%`, top: `${particle.top}%`, animationDelay: `${particle.delay}s`, animationDuration: `${particle.duration}s` }} />
        ))}
      </div>
      
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onLayoutChange('grid')}
          aria-label="切换到网格视图"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-foreground"
        >
          <Grid3x3 className="h-5 w-5" />
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
