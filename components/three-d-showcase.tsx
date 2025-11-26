"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { useResponsiveValue, type ResponsiveBreakpoint } from "@/lib/use-responsive-value"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export interface ShowcaseItem {
  id: string
  title: string
  image?: string
  year?: string
  description?: string
}

export const threeDShowcaseItems: ShowcaseItem[] = [
  {
    id: "3d-placeholder-1",
    title: "3D 作品预留",
    year: "即将上线",
    description: "未来将在此展示 3D 模型作品，敬请期待。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-2",
    title: "角色雕塑演示",
    year: "即将上线",
    description: "替换为角色雕塑或头像类模型。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-3",
    title: "机械设定演示",
    year: "即将上线",
    description: "替换为机械或硬表面建模作品。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-4",
    title: "场景建筑演示",
    year: "即将上线",
    description: "用于展示大型环境或建筑资产。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-5",
    title: "载具设定演示",
    year: "即将上线",
    description: "用于展示科幻或写实的交通载具。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-6",
    title: "道具材质演示",
    year: "即将上线",
    description: "聚焦于材质表现与贴图细节。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-7",
    title: "科幻生物演示",
    year: "即将上线",
    description: "展示原创生物或怪物设计。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-8",
    title: "英雄角色演示",
    year: "即将上线",
    description: "展示高精度游戏或影视角色资产。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-9",
    title: "硬表面练习",
    year: "即将上线",
    description: "展示硬表面建模练习与细节。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
  {
    id: "3d-placeholder-10",
    title: "动画分镜演示",
    year: "即将上线",
    description: "用于展示动画镜头或分镜模型。",
    image: `${basePath}/3D/3d-placeholder.svg`,
  },
]

interface ThreeDShowcaseProps {
  items: ShowcaseItem[]
  onItemClick: (item: ShowcaseItem) => void
}

type ShowcaseLayoutConfig = {
  cardWidth: number
  cardHeight: number
  stageHeight: number
  maxWidth: number
  imageSizes: string
}

const DEFAULT_SHOWCASE_LAYOUT: ShowcaseLayoutConfig = {
  cardWidth: 460,
  cardHeight: 620,
  stageHeight: 740,
  maxWidth: 1240,
  imageSizes: "480px",
}

const SHOWCASE_LAYOUT_BREAKPOINTS: ResponsiveBreakpoint<ShowcaseLayoutConfig>[] = [
  {
    maxWidth: 768,
    value: {
      cardWidth: 260,
      cardHeight: 360,
      stageHeight: 420,
      maxWidth: 420,
      imageSizes: "280px",
    },
  },
  {
    maxWidth: 1200,
    value: {
      cardWidth: 320,
      cardHeight: 440,
      stageHeight: 520,
      maxWidth: 760,
      imageSizes: "360px",
    },
  },
  {
    maxWidth: 1600,
    value: {
      cardWidth: 380,
      cardHeight: 520,
      stageHeight: 620,
      maxWidth: 980,
      imageSizes: "420px",
    },
  },
  {
    maxWidth: 2200,
    value: {
      cardWidth: 420,
      cardHeight: 580,
      stageHeight: 700,
      maxWidth: 1180,
      imageSizes: "460px",
    },
  },
  {
    maxWidth: 2800,
    value: {
      cardWidth: 460,
      cardHeight: 620,
      stageHeight: 740,
      maxWidth: 1280,
      imageSizes: "480px",
    },
  },
  {
    maxWidth: Infinity,
    value: {
      cardWidth: 520,
      cardHeight: 700,
      stageHeight: 820,
      maxWidth: 1400,
      imageSizes: "540px",
    },
  },
]

export function ThreeDShowcase({ items, onItemClick }: ThreeDShowcaseProps) {
  const hasItems = items.length > 0
  const layoutConfig = useResponsiveValue(DEFAULT_SHOWCASE_LAYOUT, SHOWCASE_LAYOUT_BREAKPOINTS)
  const [activeIndex, setActiveIndex] = useState(0)
  const autoplayRef = useRef<number | null>(null)
  const [layout, setLayout] = useState({ spacing: 300, verticalOffset: 26 })
  const { spacing, verticalOffset } = layout

  useEffect(() => {
    setActiveIndex(0)
  }, [items.length])

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth
      let nextSpacing = 360
      let nextOffset = 36

      if (width < 768) {
        nextSpacing = 300
        nextOffset = 24
      } else if (width < 1200) {
        nextSpacing = 340
        nextOffset = 32
      } else if (width < 1600) {
        nextSpacing = 360
        nextOffset = 36
      } else if (width < 2200) {
        nextSpacing = 340
        nextOffset = 32
      } else if (width < 2800) {
        nextSpacing = 320
        nextOffset = 30
      } else {
        nextSpacing = 300
        nextOffset = 28
      }

      setLayout((previous) => {
        if (previous.spacing === nextSpacing && previous.verticalOffset === nextOffset) {
          return previous
        }
        return { spacing: nextSpacing, verticalOffset: nextOffset }
      })
    }

    updateLayout()
    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  const scheduleAutoplay = useCallback(() => {
    if (items.length < 2) {
      stopAutoplay()
      return
    }
    stopAutoplay()
    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % items.length)
    }, 4000)
  }, [items.length, stopAutoplay])

  useEffect(() => {
    if (!hasItems) {
      stopAutoplay()
      return
    }
    scheduleAutoplay()
    return stopAutoplay
  }, [hasItems, scheduleAutoplay, stopAutoplay])

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (!hasItems) {
        return
      }
      setActiveIndex((previous) => {
        const next = (previous + direction + items.length) % items.length
        return next
      })
      scheduleAutoplay()
    },
    [hasItems, items.length, scheduleAutoplay],
  )

  const getRelativeOffset = useCallback(
    (index: number) => {
      const half = Math.floor(items.length / 2)
      let offset = index - activeIndex
      if (offset > half) {
        offset -= items.length
      } else if (offset < -half) {
        offset += items.length
      }
      return offset
    },
    [activeIndex, items.length],
  )

  return (
    <div className="relative flex flex-1 min-h-0 flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#1f2937_0%,#050505_55%)] px-4 sm:px-8 lg:px-12">
      {!hasItems ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-center text-white/70 backdrop-blur">
          3D 作品即将上线，敬请期待。
        </div>
      ) : (
        <div
          className="relative flex h-full w-full flex-col items-center justify-center"
          style={{
            maxWidth: `min(94vw, ${layoutConfig.maxWidth}px)`,
          }}
        >
          <div className="relative w-full">
            <div
              className="relative w-full"
              style={{ height: `${layoutConfig.stageHeight}px` }}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                {items.map((item, index) => {
                  const offset = getRelativeOffset(index)
                  const distance = Math.abs(offset)
                  const isActive = offset === 0
                  const translateX = offset * spacing
                  const scale = isActive ? 1 : Math.max(0.74, 1 - Math.min(distance, 4) * 0.08)
                  const opacity =
                    distance > Math.floor(items.length / 2) ? 0 : isActive ? 1 : Math.max(0.18, 1 - distance * 0.18)

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onItemClick(item)}
                      className="group absolute top-1/2 left-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                      style={{
                        "--vertical-offset": `${verticalOffset}px`,
                        transform: `translateX(calc(${translateX}px - 50%)) translateY(calc(-50% - var(--vertical-offset))) scale(${scale})`,
                        opacity,
                        zIndex: items.length - distance,
                        transition:
                          "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, filter 500ms ease",
                      } as CSSProperties}
                    >
                      <div
                        className="relative overflow-hidden rounded-[30px] border border-white/12 bg-black/65 shadow-[0_40px_130px_rgba(17,24,39,0.5)] backdrop-blur-lg"
                        style={{
                          width: `${layoutConfig.cardWidth}px`,
                          height: `${layoutConfig.cardHeight}px`,
                        }}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-white/5 opacity-80 mix-blend-screen" />
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-[1600ms] group-hover:scale-110"
                            sizes={layoutConfig.imageSizes}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950 text-white/60">
                            {item.title}
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                          <div className="rounded-2xl bg-black/70 px-5 py-4 backdrop-blur">
                            <p className="text-lg font-medium text-white">{item.title}</p>
                            {item.year && (
                              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.year}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="查看上一个 3D 作品"
                className="absolute left-4 top-1/2 z-20 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 backdrop-blur transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label="查看下一个 3D 作品"
                className="absolute right-4 top-1/2 z-20 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 backdrop-blur transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
      {hasItems && (
        <div className="pointer-events-none absolute bottom-[8vh] flex items-center gap-2 sm:bottom-[10vh]">
          {items.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <span
                key={item.id}
                className={`pointer-events-auto h-2 w-2 rounded-full transition-all duration-300 ${
                  isActive ? "w-6 bg-white" : "bg-white/40"
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
