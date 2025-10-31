"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import type { JSX } from "react/jsx-runtime"
import { ArrowLeft } from "lucide-react"

import { projects, projectTypeConfig, type Project, type ProjectType } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

interface TreeNode {
  project: Project
  x: number
  y: number
  angle: number
  depth: number
  offsetX: number
  offsetY: number
  rotation: number
}

interface BackgroundParticle {
  left: number
  top: number
  size: number
  duration: number
  delay: number
}

interface CanopyHighlight {
  label: string
  description: string
  delay: number
  offset: number
}

export function SkillTree() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const canopyHighlights = useMemo<CanopyHighlight[]>(() => {
    return [
      {
        label: "精准捕捉",
        description: "亲身经历挖掘痛点",
        delay: 0.2,
        offset: -18,
      },
      {
        label: "高效实现",
        description: "LLM+Code快速落地",
        delay: 0.45,
        offset: 0,
      },
      {
        label: "探索创新",
        description: "AI + 可视化实验",
        delay: 0.7,
        offset: 18,
      },
    ]
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const treeNodes = useMemo(() => {
    const nodes: TreeNode[] = []
    const centerX = 50
    const centerY = 55

    // 按类型分组
    const matureProjects = projects.filter((p) => p.type === "mature")
    const pluginProjects = projects.filter((p) => p.type === "plugin")
    const hobbyProjects = projects.filter((p) => p.type === "hobby")

    matureProjects.forEach((project, index) => {
      const offsetX = index === 0 ? -6.5 : 6.5
      const offsetY = index === 0 ? -1.5 : 1.5
      nodes.push({
        project,
        x: centerX + offsetX,
        y: centerY + offsetY,
        angle: 0,
        depth: 1,
        offsetX: (Math.random() - 0.5) * 1.5,
        offsetY: (Math.random() - 0.5) * 1.5,
        rotation: (Math.random() - 0.5) * 6,
      })
    })

    pluginProjects.forEach((project, index) => {
      const positions = [
        { x: 23, y: 20 }, // 向上
        { x: 16, y: 20 }, // 中上
        { x: 25, y: 5 }, // 最上
        { x: 12, y: 38 }, // 中间
        { x: 21, y: 35 }, // 中上
        { x: 32, y: 20 }, // 中下
      ]
      const pos = positions[index % positions.length]
      nodes.push({
        project,
        x: pos.x,
        y: pos.y,
        angle: -135 + index * 10,
        depth: 2,
        offsetX: (Math.random() - 0.5) * 2.5,
        offsetY: (Math.random() - 0.5) * 2.5,
        rotation: (Math.random() - 0.5) * 10,
      })
    })

    hobbyProjects.forEach((project, index) => {
      const positions = [
        { x: 82, y: 20 }, // 向上
        { x: 70, y: 28 }, // 中上
        { x: 75, y: 5 }, // 最上
        { x: 85, y: 40 }, // 中间
        { x: 78, y: 35 }, // 中上
        { x: 85, y: 48 }, // 中下
      ]
      const pos = positions[index % positions.length]
      nodes.push({
        project,
        x: pos.x,
        y: pos.y,
        angle: -45 - index * 10,
        depth: 3,
        offsetX: (Math.random() - 0.5) * 3,
        offsetY: (Math.random() - 0.5) * 3,
        rotation: (Math.random() - 0.5) * 10,
      })
    })

    return nodes
  }, [])

  const backgroundParticles = useMemo<BackgroundParticle[]>(() => {
    return Array.from({ length: 14 }, (_, index) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 0.2 + Math.random() * 0.5,
      duration: 9 + Math.random() * 7,
      delay: index * 0.4,
    }))
  }, [])

  const getNodeSize = (type: ProjectType) => {
    switch (type) {
      case "mature":
        return "w-36 h-36"
      case "plugin":
        return "w-24 h-24"
      case "hobby":
        return "w-24 h-24"
    }
  }

  const getNodeGlow = (type: ProjectType) => {
    switch (type) {
      case "mature":
        return "bg-[radial-gradient(circle_at_40%_30%,rgba(255,196,120,0.32),transparent_70%)] shadow-[0_0_45px_rgba(255,178,89,0.45)] ring-2 ring-amber-400/35 mix-blend-screen"
      case "plugin":
        return "bg-[radial-gradient(circle_at_50%_50%,rgba(93,233,210,0.28),transparent_75%)] shadow-[0_0_38px_rgba(0,200,180,0.35)] ring-2 ring-cyan-400/30 mix-blend-screen"
      case "hobby":
        return "bg-[radial-gradient(circle_at_50%_55%,rgba(196,171,255,0.3),transparent_78%)] shadow-[0_0_36px_rgba(162,126,255,0.35)] ring-2 ring-violet-400/30 mix-blend-screen"
    }
  }

  const createOrganicTrunk = () => {
    const paths: JSX.Element[] = []
    const centerX = 50
    const centerY = 55

    // 主树干
    const trunkPath = `M ${centerX} 100 Q ${centerX - 1.5} 88, ${centerX} 78 Q ${centerX + 1.5} 68, ${centerX} ${centerY}`
    paths.push(
      <path
        key="main-trunk"
        d={trunkPath}
        stroke="url(#trunkGradient)"
        strokeWidth="6"
        fill="none"
        className="trunk-grow"
        strokeLinecap="round"
      />,
    )

    const leftMainBranches = [
      // 第一层主分支 - 向左上
      {
        path: `M ${centerX} ${centerY} Q ${centerX - 8.5} ${centerY - 7.5}, ${centerX - 14.2} ${centerY - 11.3}`,
        width: 4.5,
        delay: 0.3,
      },
      // 第二层向上
      {
        path: `M ${centerX - 14} ${centerY - 12} Q ${centerX - 20} ${centerY - 20}, ${centerX - 24} ${centerY - 28}`,
        width: 3.2,
        delay: 0.5,
      },
      // 第二层水平
      {
        path: `M ${centerX - 14} ${centerY - 12} Q ${centerX - 18} ${centerY - 10}, ${centerX - 22} ${centerY - 8}`,
        width: 3,
        delay: 0.6,
      },
      // 第三层向上分支
      {
        path: `M ${centerX - 24} ${centerY - 28} Q ${centerX - 28} ${centerY - 35}, ${centerX - 30} ${centerY - 42}`,
        width: 2.2,
        delay: 0.8,
      },
      // 第三层向下分支（轻微）
      {
        path: `M ${centerX - 22} ${centerY - 8} Q ${centerX - 26} ${centerY - 5}, ${centerX - 28} ${centerY}`,
        width: 2,
        delay: 0.9,
      },
      // 额外的细分支向上
      {
        path: `M ${centerX - 14} ${centerY - 12} Q ${centerX - 16} ${centerY - 20}, ${centerX - 18} ${centerY - 28}`,
        width: 2.5,
        delay: 0.7,
      },
    ]

    leftMainBranches.forEach((branch, index) => {
      paths.push(
        <path
          key={`left-main-${index}`}
          d={branch.path}
          stroke="url(#leftBranchGradient)"
          strokeWidth={branch.width}
          fill="none"
          className="branch-grow"
          style={{ animationDelay: `${branch.delay}s` }}
          strokeLinecap="round"
        />,
      )
    })

    const rightMainBranches = [
      // 第一层主分支 - 向右上
      {
        path: `M ${centerX} ${centerY} Q ${centerX + 7.8} ${centerY - 8.6}, ${centerX + 13.5} ${centerY - 12.4}`,
        width: 4.5,
        delay: 0.3,
      },
      // 第二层向上
      {
        path: `M ${centerX + 14} ${centerY - 12} Q ${centerX + 20} ${centerY - 20}, ${centerX + 24} ${centerY - 28}`,
        width: 3.2,
        delay: 0.5,
      },
      // 第二层水平
      {
        path: `M ${centerX + 14} ${centerY - 12} Q ${centerX + 18} ${centerY - 10}, ${centerX + 22} ${centerY - 8}`,
        width: 3,
        delay: 0.6,
      },
      // 第三层向上分支
      {
        path: `M ${centerX + 24} ${centerY - 28} Q ${centerX + 28} ${centerY - 35}, ${centerX + 30} ${centerY - 42}`,
        width: 2.2,
        delay: 0.8,
      },
      // 第三层向下分支（轻微）
      {
        path: `M ${centerX + 22} ${centerY - 8} Q ${centerX + 26} ${centerY - 5}, ${centerX + 28} ${centerY}`,
        width: 2,
        delay: 0.9,
      },
      // 额外的细分支向上
      {
        path: `M ${centerX + 14} ${centerY - 12} Q ${centerX + 16} ${centerY - 20}, ${centerX + 18} ${centerY - 28}`,
        width: 2.5,
        delay: 0.7,
      },
    ]

    rightMainBranches.forEach((branch, index) => {
      paths.push(
        <path
          key={`right-main-${index}`}
          d={branch.path}
          stroke="url(#rightBranchGradient)"
          strokeWidth={branch.width}
          fill="none"
          className="branch-grow"
          style={{ animationDelay: `${branch.delay}s` }}
          strokeLinecap="round"
        />,
      )
    })

    treeNodes.forEach((node, index) => {
      let startX = centerX
      let startY = centerY
      let branchWidth = 1.5

      // 根据节点位置智能选择起始点和粗细
      if (node.project.type === "plugin") {
        // 左侧节点 - 从不同的分支点出发
        if (node.y < 25) {
          startX = centerX - 24
          startY = centerY - 28
          branchWidth = 1.8
        } else if (node.y > 48) {
          startX = centerX - 28
          startY = centerY
          branchWidth = 1.6
        } else {
          startX = centerX - 22
          startY = centerY - 8
          branchWidth = 1.7
        }
      } else if (node.project.type === "hobby") {
        // 右侧节点 - 从不同的分支点出发
        if (node.y < 25) {
          startX = centerX + 24
          startY = centerY - 28
          branchWidth = 1.8
        } else if (node.y > 48) {
          startX = centerX + 28
          startY = centerY
          branchWidth = 1.6
        } else {
          startX = centerX + 22
          startY = centerY - 8
          branchWidth = 1.7
        }
      } else {
        // mature节点直接从中心连接
        branchWidth = 2.5
      }

      // 创建更自然的曲线路径
      const midX = (startX + node.x + node.offsetX) / 2
      const midY = (startY + node.y + node.offsetY) / 2
      const controlX1 = midX + (Math.random() - 0.5) * 8
      const controlY1 = midY + (Math.random() - 0.5) * 8
      const controlX2 = (midX + node.x + node.offsetX) / 2 + (Math.random() - 0.5) * 5
      const controlY2 = (midY + node.y + node.offsetY) / 2 + (Math.random() - 0.5) * 5

      const gradientId =
        node.project.type === "plugin"
          ? "thinLeftBranchGradient"
          : node.project.type === "hobby"
            ? "thinRightBranchGradient"
            : "thinBranchGradient"

      paths.push(
        <path
          key={`node-branch-${node.project.id}`}
          d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${node.x + node.offsetX} ${node.y + node.offsetY}`}
          stroke={`url(#${gradientId})`}
          strokeWidth={branchWidth}
          fill="none"
          className={cn("branch-grow transition-all duration-500", hoveredId === node.project.id && "branch-glow")}
          style={{ animationDelay: `${1 + index * 0.08}s` }}
          strokeLinecap="round"
        />,
      )
    })

    const leaves = [
      { x: centerX - 30, y: centerY - 42, delay: 1.5 },
      { x: centerX - 18, y: centerY - 28, delay: 1.7 },
      { x: centerX - 28, y: centerY, delay: 1.6 },
      { x: centerX + 30, y: centerY - 42, delay: 1.5 },
      { x: centerX + 18, y: centerY - 28, delay: 1.7 },
      { x: centerX + 28, y: centerY, delay: 1.6 },
    ]

    leaves.forEach((leaf, index) => {
      paths.push(
        <circle
          key={`leaf-${index}`}
          cx={leaf.x}
          cy={leaf.y}
          r="0.4"
          fill="url(#leafGradient)"
          className="leaf-appear"
          style={{ animationDelay: `${leaf.delay}s` }}
          opacity="0.7"
        />,
      )
    })

    return paths
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Link
        href="/dashboard"
        className="group absolute left-8 top-8 z-50 flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition hover:border-border hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        返回主页
      </Link>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/40 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/35 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-amber-500/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-64 h-64 bg-emerald-500/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] opacity-50" />
        <div className="absolute inset-0 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(56,189,248,0.1),rgba(147,51,234,0.08),rgba(249,115,22,0.08),rgba(56,189,248,0.1))] opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_45%)] opacity-70" />
        <div className="absolute inset-0">
          {mounted &&
            backgroundParticles.map((particle, index) => (
              <span
                key={`particle-${index}`}
                className="absolute rounded-full bg-white/70 backdrop-blur-sm mix-blend-screen animate-particle-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}rem`,
                  height: `${particle.size}rem`,
                  animationDuration: `${particle.duration}s`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
        </div>
      </div>

      <div className="relative z-20 pt-20 pb-12 text-center space-y-3">
        <h1 className="text-5xl font-bold text-balance text-white tracking-wide">项目技能树</h1>
        <p className="text-lg text-gray-300/90 max-w-3xl mx-auto leading-relaxed">
          探索我的开发历程、技术积累与项目心路，在枝干的交错中梳理不同阶段的成长轨迹。
        </p>
      </div>

      <div className="absolute left-1/2 top-[35%] z-10 -translate-x-1/2 w-[420px] max-w-[80vw]">
        <div className="relative flex items-center justify-center gap-6 pt-6 pb-10">
          <div className="absolute inset-x-[10%] -top-4 h-28 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.22),transparent_70%)] blur-2xl opacity-80 mix-blend-screen" />
          <div className="absolute inset-x-[20%] top-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
          <div className="absolute inset-x-[25%] top-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />
          {mounted &&
            canopyHighlights.map((item) => (
              <div key={item.label} className="relative" style={{ transform: `translateX(${item.offset}%)` }}>
                <div
                  className="relative flex flex-col items-center text-center px-4 py-3 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/12 shadow-[0_10px_35px_rgba(56,189,248,0.15)] text-white/90 animate-canopy-pop"
                  style={{
                    animationDelay: `${item.delay}s`,
                  }}
                >
                  <span className="text-sm font-semibold tracking-wide uppercase text-cyan-200/90">{item.label}</span>
                  <span className="mt-1 text-xs text-gray-200/80">{item.description}</span>
                  <span className="absolute -z-10 -inset-4 bg-[radial-gradient(circle_at_50%_30%,rgba(244,114,182,0.18),transparent_70%)] blur-2xl opacity-70" />
                  <span className="absolute -bottom-2 w-12 h-12 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.22),transparent_65%)] blur-xl opacity-70" />
                </div>
              </div>
            ))}
        </div>
      </div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.45 0.12 60)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="oklch(0.55 0.15 80)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(0.65 0.18 180)" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="leftBranchGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.65 0.18 180)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="oklch(0.55 0.15 200)" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="rightBranchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.65 0.18 180)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="oklch(0.55 0.18 300)" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="thinBranchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.55 0.15 80)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.45 0.12 60)" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="thinLeftBranchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.55 0.15 200)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.45 0.12 180)" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="thinRightBranchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.55 0.18 300)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.45 0.15 280)" stopOpacity="0.15" />
          </linearGradient>

          <radialGradient id="leafGradient">
            <stop offset="0%" stopColor="oklch(0.75 0.15 140)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.55 0.12 160)" stopOpacity="0.5" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {mounted && createOrganicTrunk()}
      </svg>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 z-0">
        <div className="w-full h-full bg-gradient-to-t from-amber-500/50 via-cyan-500/25 to-transparent rounded-t-full blur-2xl" />
      </div>

      {/* 项目节点 */}
      <div className="relative z-10 w-full h-full">
        {mounted &&
          treeNodes.map((node, index) => {
            const config = projectTypeConfig[node.project.type]
            const isHovered = hoveredId === node.project.id

            return (
              <Link
                key={node.project.id}
                href={`/projects/${node.project.id}`}
                className="absolute group"
                style={{
                  left: `${node.x + node.offsetX}%`,
                  top: `${node.y + node.offsetY}%`,
                  transform: `translate(-50%, -50%) rotate(${node.rotation}deg)`,
                  animationDelay: `${index * 0.15}s`,
                }}
                onMouseEnter={() => setHoveredId(node.project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={cn(
                    getNodeSize(node.project.type),
                    "relative transition-all duration-500 ease-out",
                    isHovered && "scale-110 -translate-y-2 rotate-0",
                  )}
                >
                  {/* 发光效果 */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl transition-all duration-500",
                      getNodeGlow(node.project.type),
                      isHovered && "glow-pulse scale-110",
                    )}
                  />

                  {/* 节点内容 */}
                  <div
                    className={cn(
                      "relative w-full h-full rounded-2xl border-2 backdrop-blur-sm",
                      "flex flex-col items-center justify-center p-4 text-center",
                      "transition-all duration-300",
                      "bg-card/90 border-border",
                      isHovered && "bg-card border-primary",
                    )}
                  >
                    <div className={cn("mb-2", node.project.type === "mature" ? "text-4xl" : "text-3xl")}>
                      {config.icon}
                    </div>
                    <div
                      className={cn(
                        "font-semibold line-clamp-2 text-balance",
                        node.project.type === "mature" ? "text-base" : "text-sm",
                      )}
                    >
                      {node.project.title}
                    </div>

                    {/* 悬停时显示更多信息 */}
                    {isHovered && (
                      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-56 p-4 bg-popover/95 backdrop-blur-md border border-border rounded-lg shadow-2xl z-50">
                        <p className="text-xs text-popover-foreground mb-2 line-clamp-3">{node.project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {node.project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
      </div>

      <style jsx>{`
        @keyframes leaf-appear {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 0.7;
            transform: scale(1);
          }
        }
        .leaf-appear {
          animation: leaf-appear 0.6s ease-out forwards;
          opacity: 0;
        }
        @keyframes particle-float {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          50% {
            transform: translate3d(5px, -18px, 0) scale(1.15);
            opacity: 0.65;
          }
          100% {
            transform: translate3d(-8px, -36px, 0) scale(0.85);
            opacity: 0;
          }
        }
        .animate-particle-float {
          animation: particle-float linear infinite;
        }
        @keyframes glow-pulse {
          0%,
          100% {
            filter: saturate(120%);
            opacity: 1;
          }
          50% {
            filter: saturate(180%);
            opacity: 1.08;
          }
        }
        .glow-pulse {
          animation: glow-pulse 1.6s ease-in-out infinite;
        }
        @keyframes canopy-pop {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.92);
          }
          60% {
            opacity: 1;
            transform: translateY(-6px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-canopy-pop {
          animation: canopy-pop 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
