"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const hasNavigatedRef = useRef(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 60)
    return () => window.clearTimeout(timeout)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflowY
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflowY = "hidden"
    document.body.classList.add("no-scrollbar")
    document.documentElement.classList.add("no-scrollbar")

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflowY = originalHtmlOverflow
      document.body.classList.remove("no-scrollbar")
      document.documentElement.classList.remove("no-scrollbar")
    }
  }, [])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY >= -60) {
        return
      }
      if (window.scrollY > 0 || hasNavigatedRef.current || isTransitioning) {
        return
      }
      hasNavigatedRef.current = true
      setIsTransitioning(true)
      window.setTimeout(() => {
        router.push("/?from=dashboard")
      }, 450)
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [isTransitioning, router])

  // 定义角落辉光样式，用于静态应用到小卡片上
  const glowBorderBase = "relative before:content-[''] before:absolute before:-inset-px before:rounded-3xl before:-z-10"
  const glowBorderTopRight = `${glowBorderBase} before:bg-[radial-gradient(ellipse_150%_100%_at_100%_0%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]`
  const glowBorderTopLeft = `${glowBorderBase} before:bg-[radial-gradient(ellipse_150%_100%_at_0%_0%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]`


  const primarySections: PrimarySection[] = [
    {
      id: "business",
      href: "/business-cases",
      label: "智能商业闭环",
      headline: "AI驱动的全链路增长方案",
      description: "通过AI赋能电商自动化，将复杂的市场策略转化为可执行的数据故事，实现15000+ SKU从0到1的快速上线与验证。",
      metricLabel: "上线SKU",
      metricValue: "15000+",
    },
    {
      id: "projects",
      href: "/projects",
      label: "智能工具生态系统",
      headline: "AI驱动的开发项目合辑",
      description: "以AI作为核心，驱动生产链路的效率杀手锏。",
      metricLabel: "项目覆盖",
      metricValue: "跨平台",
    },
    {
      id: "art",
      href: "/art-gallery",
      label: "个人绘画心路历程",
      headline: "时间线画廊",
      description: "生成式艺术与传统创作媒介融合，呈现实验性视觉探索。",
      metricLabel: "作品类型",
      metricValue: "插画 / 3D",
    },
  ]

  const summaryBlocks: SummaryBlock[] = [
    {
      id: "business-summary",
      title: "案例亮点",
      body: "通过AI赋能电商自动化，将复杂的市场策略转化为可执行的数据故事，实现个人1.5个月内15000+SKU从0到1的快速上线与验证。",
    },
    {
      id: "projects-summary",
      title: "研发节奏",
      body: "这里是探索AI技术边界与应用潜能的创新空间。通过一系列从概念原型到成熟产品的开发实践，本人致力于将创意想法结合AI转化为现实。",
    },
    {
      id: "art-summary",
      title: "创作基调",
      body: "呈现了创作工具从实体画笔到智能算法的演进，以及各阶段的学习经历与风格探索，时间线沉浸式画廊。",
    },
  ] as const

  return (
    <div
      className="min-h-screen overflow-hidden bg-background text-foreground"
      style={{
        opacity: isTransitioning ? 0 : isVisible ? 1 : 0,
        transform: isVisible && !isTransitioning ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.7s ease",
      }}
    >
      <div className="flex w-full flex-col gap-14 px-6 py-12 sm:px-10 lg:px-20 lg:py-14 xl:px-32">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">项目主页</h1>
          <p className="mx-auto max-w-5xl text-xl text-muted-foreground sm:text-2xl">
            从商业策略到视觉叙事，呈现我在策略规划、产品开发与艺术创作中的整体能力。
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-12">
          {/* --- 第一行 --- */}
          <div className="group/card card-breathe relative h-full xl:col-span-8" data-index="0">
            <span className="card-outer-glow pointer-events-none absolute -inset-8 rounded-[46px] opacity-0 transition duration-500 group-hover/card:opacity-95 group-focus-within/card:opacity-95" />
            <Link
              href={primarySections[0].href}
              className="group animated-card-glow relative flex h-full w-full items-start justify-between gap-12 overflow-hidden rounded-3xl shadow-none ring-1 ring-border/40 transition duration-500 hover:-translate-y-1 hover:ring-white/60"
            >
              <div
                className="absolute inset-0 z-0 blur"
                style={{
                  backgroundImage: "url('/images/1.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <SectionCard section={primarySections[0]} layout="inline" />
            </Link>
          </div>
          <SummaryCard
            block={summaryBlocks[0]}
            className={`h-full rounded-3xl bg-zinc-900 px-8 py-14 xl:col-span-4 ring-1 ring-border/80 ${glowBorderTopRight}`}
          />

          {/* --- 第二行 --- */}
          <SummaryCard
            block={summaryBlocks[1]}
            className={`h-full rounded-3xl bg-zinc-900 px-8 py-14 xl:col-span-4 ring-1 ring-border/80 ${glowBorderTopLeft}`}
          />
          <div className="group/card card-breathe relative h-full xl:col-span-8" data-index="1">
            <span className="card-outer-glow pointer-events-none absolute -inset-8 rounded-[46px] opacity-0 transition duration-500 group-hover/card:opacity-95 group-focus-within/card:opacity-95" />
            <Link
              href={primarySections[1].href}
              className="group animated-card-glow relative flex h-full w-full items-start justify-between gap-12 overflow-hidden rounded-3xl shadow-none ring-1 ring-border/40 transition duration-500 hover:-translate-y-1 hover:ring-white/60"
            >
              <div
                className="absolute inset-0 z-0 blur"
                style={{
                  backgroundImage: "url('/images/2.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <SectionCard section={primarySections[1]} layout="inline" reverse />
            </Link>
          </div>

          {/* --- 第三行 --- */}
          <div className="group/card card-breathe relative h-full xl:col-span-8" data-index="2">
            <span className="card-outer-glow pointer-events-none absolute -inset-8 rounded-[46px] opacity-0 transition duration-500 group-hover/card:opacity-95 group-focus-within/card:opacity-95" />
            <Link
              href={primarySections[2].href}
              className="group animated-card-glow relative flex h-full w-full items-start justify-between gap-12 overflow-hidden rounded-3xl shadow-none ring-1 ring-border/40 transition duration-500 hover:-translate-y-1 hover:ring-white/60"
            >
              <div
                className="absolute inset-0 z-0 blur"
                style={{
                  backgroundImage: "url('/images/3.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <SectionCard section={primarySections[2]} layout="inline" />
            </Link>
          </div>
          <SummaryCard
            block={summaryBlocks[2]}
            className={`h-full rounded-3xl bg-zinc-900 px-8 py-14 xl:col-span-4 ring-1 ring-border/80 ${glowBorderTopRight}`}
          />
        </div>
      </div>
    </div>
  )
}

interface PrimarySection {
  id: string
  href: string
  label: string
  headline: string
  description: string
  metricLabel: string
  metricValue: string
}

interface SummaryBlock {
  id: string
  title: string
  body: string
  details?: readonly string[]
}

interface SectionCardProps {
  section: PrimarySection
  layout?: "stacked" | "inline"
  reverse?: boolean
}

function SectionCard({ section, layout = "stacked", reverse = false }: SectionCardProps) {
  const isInline = layout === "inline"
  const arrowClasses =
    "absolute text-muted-foreground/70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
  const arrowPosition = reverse ? "left-8 top-8 lg:left-10" : "right-8 top-8 lg:right-10"

  return (
    <div
      className={`relative z-10 flex h-full w-full flex-col justify-start gap-8 rounded-[26px] bg-black/30 px-10 py-24 lg:py-20 ${
        isInline ? (reverse ? "lg:flex-row-reverse lg:justify-between lg:items-start" : "lg:flex-row lg:justify-between lg:items-start") : ""
      }`}
    >
      <ArrowUpRight className={`${arrowClasses} z-10 ${arrowPosition}`} />
      <div
        className={`relative z-10 flex w-full ${
          isInline
            ? reverse
              ? "flex-col lg:max-w-[50%] lg:items-end lg:text-right"
              : "flex-col lg:max-w-[55%]"
            : "flex-col"
        } gap-5`}
      >
        <div
          className={`flex items-center ${
            isInline
              ? reverse
                ? "justify-center lg:justify-between"
                : "justify-center lg:justify-between"
              : "justify-between"
          } text-sm text-muted-foreground`}
        >
          <span className={`${reverse ? "lg:text-right" : ""}`}>{section.label}</span>
        </div>
        <h2
          className={`text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl ${
            isInline ? (reverse ? "text-center lg:text-right" : "text-center lg:text-left") : ""
          }`}
        >
          {section.headline}
        </h2>
        {!isInline && <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{section.description}</p>}
      </div>
      <div
        className={`relative z-10 flex w-full flex-col items-start justify-between gap-4 text-sm text-muted-foreground ${
          isInline
            ? reverse
              ? "lg:max-w-[26%] lg:items-start lg:text-left"
              : "lg:max-w-[28%] lg:items-end lg:text-right"
            : ""
        }`}
      >
        <span className="uppercase tracking-[0.3em] text-xs">{section.metricLabel}</span>
        <span className="text-3xl font-bold text-foreground sm:text-4xl">{section.metricValue}</span>
      </div>
    </div>
  )
}

interface SummaryCardProps {
  block: SummaryBlock
  className?: string
}

function SummaryCard({ block, className = "" }: SummaryCardProps) {
  const variantClass =
    block.id === "business-summary"
      ? "summary-card summary-card--aqua"
      : block.id === "projects-summary"
        ? "summary-card summary-card--amber"
        : block.id === "art-summary"
          ? "summary-card summary-card--violet"
          : "summary-card"

  return (
    <div className={`${variantClass} flex h-full flex-col justify-between gap-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">{block.title}</div>
      </div>
      <p className="text-lg leading-relaxed text-muted-foreground/90">{block.body}</p>
      {block.details && (
        <ul className="summary-card__meta space-y-1.5 text-sm text-muted-foreground/80">
          {block.details.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="summary-card__dot" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
