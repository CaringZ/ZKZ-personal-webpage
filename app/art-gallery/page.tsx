"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { TimelineGallery } from "@/components/timeline-gallery"
import { ArtworkModal } from "@/components/artwork-modal"
import { ThreeDShowcase, threeDShowcaseItems } from "@/components/three-d-showcase"
import { GridGallery } from "@/components/grid-gallery"
import { ThreeStarfieldBackground } from "@/components/three-starfield-background"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export interface Artwork {
  id: string
  title: string
  year: string
  description: string
  image: string
  category: string
}

const artworks: Artwork[] = [
  {
    id: "1",
    title: "军师",
    year: "2025",
    description: "身着戎装，眼神沉静而锐利，仿佛洞悉着瞬息万变的战局。她轻捻羽毛的姿态与坚毅的铠甲形成鲜明对比，象征着她以超凡的智慧运筹帷幄，决胜于千里之外。",
    image: `${basePath}/painting/1.png`,
    category: "AIGC",
  },
  {
    id: "2",
    title: "雨后夕阳",
    year: "2024",
    description: "一场大雨过后，潮湿的空气中还弥漫着泥土的芬芳。远方的夕阳正缓缓沉入地平线，它用尽最后一丝力气，将天空染成了绚烂的橘红与暖紫。",
    image: `${basePath}/painting/2.png`,
    category: "PS",
  },
  {
    id: "3",
    title: "沼泽地",
    year: "2023",
    description: "一场童话故事中的追逐:人畜无害的小女孩，稻草人怪物，潜伏的鳄鱼，在一个暗藏危机的恬静午后，究竟谁才是真正的猎物呢？",
    image: `${basePath}/painting/3.png`,
    category: "Blender+PS",
  },
  {
    id: "4",
    title: "石树谷2",
    year: "2023",
    description: "探险者在石树之谷的旅程;在这片石树构成的森林里，它们庞大根部的形态和纹理讲述着岁月的故事。",
    image: `${basePath}/painting/4.png`,
    category: "Blender+PS",
  },
  {
    id: "5",
    title: "石树谷1",
    year: "2023",
    description: "探险者在石树之谷的旅程;在这片石树构成的森林里，它们庞大根部的形态和纹理讲述着岁月的故事。",
    image: `${basePath}/painting/5.png`,
    category: "Blender+PS",
  },
  {
    id: "6",
    title: "冰封秘境",
    year: "2023",
    description: "这是一个隐藏于雪山的古堡，它被冰雪覆盖，夕阳的余晖映照出它的辉煌。",
    image: `${basePath}/painting/6.png`,
    category: "AIGC",
  },
  {
    id: "6.1",
    title: "神域",
    year: "2023",
    description: "一座宏伟的古典雕像在此静静矗立了千年，祂是这片圣地的古老守护者。岁月在祂身上刻下了斑驳的痕迹，残破的臂膀与攀附而上的藤蔓，无声地诉说着一段辉煌而又孤寂的过往。",
    image: `${basePath}/painting/6.1.png`,
    category: "Blender+PS",
  },
  {
    id: "7",
    title: "传送门",
    year: "2023",
    description: "在宇宙的至深之处，三座巨大的“传送门”正缓缓旋转，如同被捕获的星系，散发着连接未知时空的神秘幽光。它们是跨越维度的桥梁，是通往全新世界的入口。",
    image: `${basePath}/painting/7.png`,
    category: "Blender+PS",
  },
  {
    id: "8",
    title: "月牙迷城",
    year: "2023",
    description: "某个星球上出现一个月牙形状的遗迹，这个遗迹似乎由一个域外文明所留，里面有许多传说和未解之谜。",
    image: `${basePath}/painting/8.png`,
    category: "AIGC",
  },
  {
    id: "9",
    title: "荒漠行者",
    year: "2023",
    description: "在这片被烈日炙烤的无垠荒漠之上，一座城市拥有了生命与脚步。",
    image: `${basePath}/painting/9.png`,
    category: "PS",
  },
  {
    id: "10",
    title: "荒野守卫",
    year: "2023",
    description: "莫兰迪尔--来源于远古森林，象征着雄壮的猛兽和森林的未知。他是一位领土意识强、保护神秘森林不受侵犯的守护者。",
    image: `${basePath}/painting/10.png`,
    category: "AIGC",
  },
  {
    id: "11",
    title: "摘花女",
    year: "2022",
    description: "",
    image: `${basePath}/painting/11.png`,
    category: "PS",
  },
  {
    id: "11.1",
    title: "场景写生",
    year: "2022",
    description: "",
    image: `${basePath}/painting/11.1.png`,
    category: "场景油画",
  },
  {
    id: "12",
    title: "静物写生",
    year: "2022",
    description: "",
    image: `${basePath}/painting/12.jpg`,
    category: "静物油画",
  },
  {
    id: "13",
    title: "红色圣女",
    year: "2021",
    description: "",
    image: `${basePath}/painting/13.jpg`,
    category: "PS",
  },
  {
    id: "14",
    title: "女性2",
    year: "2021",
    description: "",
    image: `${basePath}/painting/14.jpg`,
    category: "PS",
  },
  {
    id: "15",
    title: "男性",
    year: "2021",
    description: "",
    image: `${basePath}/painting/15.jpg`,
    category: "PS",
  },
  {
    id: "16",
    title: "女性1",
    year: "2021",
    description: "",
    image: `${basePath}/painting/16.jpg`,
    category: "PS",
  },
  {
    id: "17",
    title: "高铁外景2",
    year: "2021",
    description: "",
    image: `${basePath}/painting/17.jpg`,
    category: "PS",
  },
  {
    id: "18",
    title: "高铁外景1",
    year: "2021",
    description: "",
    image: `${basePath}/painting/18.jpg`,
    category: "PS",
  },
  {
    id: "19.1",
    title: "Joker",
    year: "2021",
    description: "",
    image: `${basePath}/painting/19.1.jpg`,
    category: "PS",
  },
  {
    id: "19",
    title: "Godfather",
    year: "2021",
    description: "",
    image: `${basePath}/painting/19.jpg`,
    category: "PS",
  },
  {
    id: "20",
    title: "国画2",
    year: "2020",
    description: "",
    image: `${basePath}/painting/20.jpg`,
    category: "手绘",
  },
  {
    id: "21",
    title: "国画1",
    year: "2020",
    description: "",
    image: `${basePath}/painting/21.jpg`,
    category: "手绘",
  },
  {
    id: "22",
    title: "工笔人物",
    year: "2020",
    description: "",
    image: `${basePath}/painting/22.jpg`,
    category: "手绘",
  },
  {
    id: "23",
    title: "版画",
    year: "2020",
    description: "",
    image: `${basePath}/painting/23.png`,
    category: "雕刻",
  },
  {
    id: "24",
    title: "素描静物写生",
    year: "2020",
    description: "",
    image: `${basePath}/painting/24.jpg`,
    category: "手绘",
  },
  {
    id: "25",
    title: "素描石膏写生2",
    year: "2020",
    description: "",
    image: `${basePath}/painting/25.jpg`,
    category: "手绘",
  },
  {
    id: "26",
    title: "素描石膏写生1",
    year: "2020",
    description: "",
    image: `${basePath}/painting/26.jpg`,
    category: "手绘",
  },
]

const sectionTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
}

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<{ artwork: Artwork; index: number } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<"landing" | "painting" | "3d">("landing")
  const [galleryLayout, setGalleryLayout] = useState<"timeline" | "grid">("timeline")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    document.body.classList.add("no-scrollbar")
    document.documentElement.classList.add("no-scrollbar")

    return () => {
      document.body.classList.remove("no-scrollbar")
      document.documentElement.classList.remove("no-scrollbar")
    }
  }, [])

  const scheduleScrollToTop = useCallback(() => {
    if (typeof window === "undefined") {
      return
    }
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 200)
  }, [])

  const handleArtworkClick = (artwork: Artwork, index: number) => {
    setSelectedArtwork({ artwork, index })
  }

  const handleNextArtwork = () => {
    if (selectedArtwork && selectedArtwork.index < artworks.length - 1) {
      const nextIndex = selectedArtwork.index + 1
      setSelectedArtwork({ artwork: artworks[nextIndex], index: nextIndex })
    }
  }

  const handlePrevArtwork = () => {
    if (selectedArtwork && selectedArtwork.index > 0) {
      const prevIndex = selectedArtwork.index - 1
      setSelectedArtwork({ artwork: artworks[prevIndex], index: prevIndex })
    }
  }

  const handleSectionSelect = (section: "painting" | "3d") => {
    setActiveSection(section)
    scheduleScrollToTop()
  }

  const handleBackToLanding = () => {
    setActiveSection("landing")
    setSelectedArtwork(null)
    scheduleScrollToTop()
  }

  return (
    <ThreeStarfieldBackground className="min-h-screen overflow-hidden">
      <main className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {activeSection === "landing" && (
            <motion.div
              key="landing"
              className="min-h-screen"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={sectionTransition}
            >
              <LandingSection onSelect={handleSectionSelect} />
            </motion.div>
          )}

          {activeSection === "painting" && (
            <motion.div
              key="painting"
              className="min-h-screen"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={sectionTransition}
            >
              <SectionContainer
                onBack={handleBackToLanding}
                label="绘画作品"
              >
                {galleryLayout === 'timeline' ? (
                  <TimelineGallery
                    artworks={artworks}
                    onArtworkClick={handleArtworkClick}
                    isLoaded={isLoaded}
                    onLayoutChange={setGalleryLayout}
                  />
                ) : (
                  <GridGallery
                    artworks={artworks}
                    onArtworkClick={handleArtworkClick}
                    onLayoutChange={setGalleryLayout}
                  />
                )}
              </SectionContainer>
            </motion.div>
          )}

          {activeSection === "3d" && (
            <motion.div
              key="3d"
              className="min-h-screen"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={sectionTransition}
            >
              <SectionContainer onBack={handleBackToLanding} label="3D 模型呈现">
                <ThreeDShowcase
                  items={threeDShowcaseItems}
                  onItemClick={(item) =>
                    setSelectedArtwork({
                      artwork: {
                        id: item.id,
                        title: item.title,
                        year: item.year ?? "",
                        description: item.description ?? "",
                        image: item.image ?? "",
                        category: "3D",
                      },
                      index: -1,
                    })
                  }
                />
              </SectionContainer>
            </motion.div>
          )}
        </AnimatePresence>

        <ArtworkModal
          artwork={selectedArtwork?.artwork ?? null}
          currentIndex={selectedArtwork?.index ?? -1}
          totalCount={artworks.length}
          onClose={() => setSelectedArtwork(null)}
          onNext={handleNextArtwork}
          onPrev={handlePrevArtwork}
        />
      </main>
    </ThreeStarfieldBackground>
  )
}

interface LandingSectionProps {
  onSelect: (section: "painting" | "3d") => void
}

function LandingSection({ onSelect }: LandingSectionProps) {
  const cards: Array<{
    id: "painting" | "3d"
    title: string
    description: string
    image: string
    accent: string
    glow: string
  }> = [
      {
        id: "painting",
        title: "时光画廊",
        description: "循着时间的脉络，浏览我的绘画作品，感受每一笔的情感与故事。",
        image: `${basePath}/painting/1.png`,
        accent: "from-[#4cc9f0]/35 via-transparent to-transparent",
        glow: "from-[#4cc9f0]/65 via-[#4361ee]/40 to-transparent",
      },
      {
        id: "3d",
        title: "三维塑造",
        description: "进入可交互的立体空间，近距离观赏我的 3D 模型作品。",
        image: `${basePath}/3D/3d-placeholder.svg`,
        accent: "from-[#f72585]/30 via-transparent to-transparent",
        glow: "from-[#f72585]/60 via-[#b5179e]/40 to-transparent",
      },
    ]

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden">
      <Link
        href="/?scene=robot"
        className="group fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 md:left-8 md:top-8"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        返回主页
      </Link>
      {/* --- MODIFICATION START --- */}
      {/* 1. 大幅减少了顶部 padding (pt-20)，让内容整体上移 */}
      {/* 2. 减小了标题和卡片之间的间距 (gap-12)，进一步压缩垂直空间 */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-20 md:pt-24">
        {/* --- MODIFICATION END --- */}
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground md:text-sm">Art Gallery</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-6xl">探索我的视觉宇宙</h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            这里记录了我的创作轨迹与思考，点击卡片，开启一段视觉之旅。
          </p>
        </div>

        <div className="grid place-items-center gap-12 md:grid-cols-2">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelect(card.id)}
              // --- MODIFICATION START ---
              // 1. 使用 h-[70vh] 让卡片高度为屏幕高度的70%，实现高挑且响应式的效果
              // 2. 使用 min-h/max-h 避免在极端屏幕比例下尺寸异常
              // 3. 调整了 max-w 以匹配新的高挑比例
              className="group relative flex h-[70vh] min-h-[580px] max-h-[720px] w-full max-w-[380px] flex-col overflow-hidden rounded-[36px] border border-white/10 bg-black/35 transition-transform duration-500 hover:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
            // --- MODIFICATION END ---
            >
              <span
                className={`pointer-events-none absolute -inset-[2px] rounded-[38px] bg-gradient-to-br ${card.glow} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100`}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/12 via-transparent to-white/8 opacity-0 transition-opacity duration-700 group-hover:opacity-60" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[36px] bg-zinc-950/60">
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80 mix-blend-screen`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_65%)]" />
                </div>
                {/* --- MODIFICATION START --- */}
                {/* 使用 flex-1 让图片容器自动填充剩余空间，适应动态的卡片总高度 */}
                <div className="relative flex-1 overflow-hidden rounded-t-[36px]">
                  {/* --- MODIFICATION END --- */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-[1400ms] ease-[0.16,1,0.3,1] will-change-transform group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={card.id === "painting"}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-80" />
                </div>
                <div className="relative flex flex-col items-start gap-3 px-6 pb-6 pt-4 text-left">
                  <h2 className="text-3xl font-semibold text-white md:text-4xl">{card.title}</h2>
                  <p className="text-base leading-relaxed text-white/70">{card.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

interface SectionContainerProps {
  onBack: () => void
  label: string
  children: ReactNode
}

function SectionContainer({ onBack, label, children }: SectionContainerProps) {
  return (
    <section className="relative flex min-h-screen flex-col bg-background">
      <div className="sticky top-0 z-40 flex items-center justify-end px-6 py-6">
        <button
          type="button"
          onClick={onBack}
          className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        >
          <ArrowLeft className="h-4 w-4" />
          返回分类
        </button>

        <span className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{label}</span>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </section>
  )
}
