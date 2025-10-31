"use client"

import { useState, useEffect } from "react"
import { TimelineGallery } from "@/components/timeline-gallery"
import { ArtworkModal } from "@/components/artwork-modal"
import { GalleryHeader } from "@/components/gallery-header"

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
    description: "未来都市的霓虹灯光，科技与人性的交织。",
    image: "${basePath}/1.png",
    category: "人物",
  },
  {
    id: "2",
    title: "雨后夕阳",
    year: "2024",
    description: "魔法世界的宏伟建筑，充满神秘与冒险。",
    image: "${basePath}/2.png",
    category: "风景",
  },
  {
    id: "3",
    title: "沼泽地",
    year: "2023",
    description: "深空探索的科幻场景，人类的星际梦想。",
    image: "${basePath}/3.png",
    category: "场景",
  },
  {
    id: "4",
    title: "石树谷2",
    year: "2023",
    description: "后启示录世界的荒凉景象，生存与希望的挣扎。",
    image: "${basePath}/4.png",
    category: "场景",
  },
  {
    id: "5",
    title: "石树谷1",
    year: "2023",
    description: "神秘的水下世界，探索未知的海洋奇观。",
    image: "${basePath}/5.png",
    category: "场景",
  },
  {
    id: "6",
    title: "冰封秘境",
    year: "2023",
    description: "探索时间与空间的交织，通过抽象的色彩表达永恒的瞬间。",
    image: "${basePath}/6.png",
    category: "场景",
  },
  {
    id: "6.1",
    title: "神域",
    year: "2023",
    description: "探索时间与空间的交织，通过抽象的色彩表达永恒的瞬间。",
    image: "/${basePath}6.1.png",
    category: "场景",
  },
  {
    id: "7",
    title: "传送门",
    year: "2023",
    description: "现代都市的光影交错，记录着每个人的故事与梦想。",
    image: "${basePath}/7.png",
    category: "科幻",
  },
  {
    id: "8",
    title: "月牙迷城",
    year: "2023",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/8.png",
    category: "场景",
  },
  {
    id: "9",
    title: "荒漠行者",
    year: "2023",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/9.png",
    category: "场景",
  },
  {
    id: "10",
    title: "荒野守卫",
    year: "2023",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/10.png",
    category: "角色",
  },
  {
    id: "11",
    title: "摘花女",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/11.png",
    category: "角色",
  },
  {
    id: "11.1",
    title: "红色圣女",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/11.1.jpg",
    category: "角色",
  },
  {
    id: "12",
    title: "女性2",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/12.jpg",
    category: "角色",
  },
  {
    id: "13",
    title: "男性",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/13.jpg",
    category: "角色",
  },
  {
    id: "14",
    title: "女性1",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/14.jpg",
    category: "角色",
  },
  {
    id: "15",
    title: "高铁窗外景2",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/15.jpg",
    category: "角色",
  },
  {
    id: "16",
    title: "高铁窗外景1",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/16.jpg",
    category: "角色",
  },
  {
    id: "17",
    title: "Joker",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/17.jpg",
    category: "角色",
  },
  {
    id: "18",
    title: "Godfather",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/18.jpg",
    category: "角色",
  },
  {
    id: "19。1",
    title: "场景写生",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/19.1.png",
    category: "角色",
  },
  {
    id: "19",
    title: "静物写生",
    year: "2022",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/19.jpg",
    category: "角色",
  },
  {
    id: "20",
    title: "国画2",
    year: "2021",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/20.jpg",
    category: "角色",
  },
  {
    id: "21",
    title: "国画1",
    year: "2021",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/21.jpg",
    category: "角色",
  },
  {
    id: "22",
    title: "工笔人物",
    year: "2021",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/22.jpg",
    category: "角色",
  },
  {
    id: "23",
    title: "版画",
    year: "2021",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/23.png",
    category: "角色",
  },
  {
    id: "24",
    title: "素描静物写生",
    year: "2020",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/24.jpg",
    category: "角色",
  },
  {
    id: "25",
    title: "素描石膏写生2",
    year: "2020",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/25.jpg",
    category: "角色",
  },
  {
    id: "26",
    title: "素描石膏写生1",
    year: "2020",
    description: "聆听大自然的呼吸，感受生命的律动与和谐。",
    image: "${basePath}/26.jpg",
    category: "角色",
  },
]

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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

  return (
    <main className="min-h-screen bg-background">
      <GalleryHeader isLoaded={isLoaded} />
      <TimelineGallery artworks={artworks} onArtworkClick={setSelectedArtwork} isLoaded={isLoaded} />
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </main>
  )
}
