"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Box, Layers, Settings, Sliders, Terminal, Wand2, Wrench, Hammer, Zap, Image as ImageIcon, CheckCircle2 } from "lucide-react"
import type { Project } from "@/lib/projects-data"
import { ComparisonSlider } from "@/components/ui/comparison-slider"
import { ImageLightbox } from "@/components/ui/image-lightbox"

interface PluginProjectThemeProps {
    project: Project
}

export function PluginProjectTheme({ project }: PluginProjectThemeProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    useTransform(scrollYProgress, [0, 1], [0, -100])

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const withBasePath = (path?: string) => {
        if (!path) return ''
        return path.startsWith('http') ? path : `${basePath}${path}`
    }

    const ultimatePain = project.plugin?.painPoint.desc || project.description
    const assetBase = `/showcase/plugins/${project.id}`
    const painPointSrc = withBasePath(`${assetBase}/painpoint.png`)
    const impactBefore = withBasePath(`${assetBase}/impact-before.png`)
    const impactAfter = withBasePath(`${assetBase}/impact-after.png`)
    const hideFeatures = project.id === 'plugin-1'
    const theme = (() => {
        switch (project.plugin?.colorTheme) {
            case "orange": return { primary: "#f97316", secondary: "#fb923c", border: "rgba(249, 115, 22, 0.3)", bg: "rgba(249, 115, 22, 0.1)" }
            case "purple": return { primary: "#a855f7", secondary: "#c084fc", border: "rgba(168, 85, 247, 0.3)", bg: "rgba(168, 85, 247, 0.1)" }
            case "blue": return { primary: "#3b82f6", secondary: "#60a5fa", border: "rgba(59, 130, 246, 0.3)", bg: "rgba(59, 130, 246, 0.1)" }
            case "emerald":
            default: return { primary: "#10b981", secondary: "#34d399", border: "rgba(16, 185, 129, 0.3)", bg: "rgba(16, 185, 129, 0.1)" }
        }
    })()

    const splitInsight = (text: string) => {
        const [body, takeaway] = text.split("收获:")
        return {
            body: (body || text).trim(),
            takeaway: (takeaway || "先找痛点，再落方案，最后复盘。").trim(),
        }
    }

    return (
        <div ref={containerRef} className="relative min-h-[250vh] bg-[#0a0a0a] text-white font-mono selection:bg-white/20">
            {/* Blueprint Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
                <div
                    className="absolute inset-0 bg-[size:40px_40px]"
                    style={{ backgroundImage: `linear-gradient(to right, ${theme.primary} 1px, transparent 1px), linear-gradient(to bottom, ${theme.primary} 1px, transparent 1px)` }}
                />
                <div
                    className="absolute inset-0 bg-[size:200px_200px] opacity-50"
                    style={{ backgroundImage: `linear-gradient(to right, ${theme.primary} 1px, transparent 1px), linear-gradient(to bottom, ${theme.primary} 1px, transparent 1px)` }}
                />
            </div>

            {/* Header: Workbench Style */}
            <header className="relative h-screen flex flex-col items-center justify-center z-10 border-b bg-[#0a0a0a]/50 backdrop-blur-sm" style={{ borderColor: theme.border }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border rounded-lg opacity-50" style={{ borderColor: theme.border }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[380px] border border-dashed rounded-lg opacity-30" style={{ borderColor: theme.border }} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 bg-[#0a0a0a]/90 p-12 backdrop-blur-sm border rounded-xl max-w-3xl shadow-2xl"
                    style={{ borderColor: theme.border, boxShadow: `0 25px 50px -12px ${theme.bg}` }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4" style={{ color: theme.primary }}>
                        <Wrench className="w-5 h-5" />
                        <span className="text-sm tracking-widest uppercase">工具规格说明书 // Tool Spec</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ color: theme.secondary }}>
                        {project.title}
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-zinc-400">
                        {project.description}
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <div className="px-4 py-1 rounded-full border text-xs" style={{ borderColor: theme.border, backgroundColor: theme.bg, color: theme.primary }}>
                            v1.2.0
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs animate-pulse"
                    style={{ color: theme.primary, opacity: 0.3 }}
                >
                    SCROLL TO INSPECT
                </motion.div>
            </header>

            {/* Ultimate Pain Point */}
            <section className="relative z-10 py-32 px-6 bg-[#0c0c0c]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-block px-3 py-1 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20 uppercase tracking-[0.2em]">
                                终极痛点 // CRITICAL ERROR
                            </div>
                            <h2 className="text-4xl font-bold text-white">我为什么要做这个工具</h2>
                            <p className="leading-relaxed text-lg border-l-2 border-red-500/30 pl-6 text-zinc-400">
                                {ultimatePain}
                            </p>
                            <div className="grid gap-4">
                                {project.plugin?.painPoint.stats.map((stat, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-red-200/80 font-mono text-sm">{stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            <div
                                className={`aspect-[4/3] rounded-xl border border-dashed flex items-center justify-center relative overflow-hidden shadow-2xl transition-colors group`}
                                style={{
                                    backgroundColor: project.id === 'plugin-1' ? '#050505' : '#111',
                                    borderColor: project.id === 'plugin-1' ? theme.border : theme.border
                                }}
                            >
                                {project.id === 'plugin-1' ? (
                                    <>
                                        {/* Generative Style Drift Animation for Comfy Controller */}
                                        <div className="grid grid-cols-4 gap-4 p-8 w-full h-full select-none pointer-events-none">
                                            {Array.from({ length: 16 }).map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="bg-emerald-900/10 border border-emerald-500/10 rounded relative overflow-hidden"
                                                    animate={{
                                                        opacity: [0.3, 0.6, 0.3],
                                                        borderColor: ["rgba(16, 185, 129, 0.1)", "rgba(239, 68, 68, 0.5)", "rgba(16, 185, 129, 0.1)"], // Emerald -> Red -> Emerald
                                                        backgroundColor: ["rgba(6, 78, 59, 0.1)", "rgba(127, 29, 29, 0.2)", "rgba(6, 78, 59, 0.1)"],
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: i * 0.1, // Staggered delay
                                                    }}
                                                >
                                                    {/* Inner "glitch" line */}
                                                    <motion.div
                                                        className="absolute top-0 left-0 w-full h-[1px] bg-red-500/50"
                                                        animate={{ top: ["0%", "100%"] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-red-500/30 text-red-400 text-xs font-mono tracking-[0.2em] uppercase shadow-lg flex items-center gap-3">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                Quality Issues Detected
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Scattered Files Animation Placeholder for other plugins */}
                                        <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-4 p-8 opacity-50 group-hover:opacity-30 transition-opacity">
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-12 h-16 border rounded flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500"
                                                    style={{ borderColor: theme.primary, backgroundColor: theme.bg }}
                                                >
                                                    <div className="w-8 h-1" style={{ backgroundColor: theme.border }} />
                                                </div>
                                            ))}
                                        </div>
                                        <ImageLightbox
                                            src={painPointSrc}
                                            alt="Pain point visual"
                                            variant={project.plugin?.colorTheme || "emerald"}
                                            className="z-10 max-h-full max-w-full object-contain"
                                            style={{ filter: `drop-shadow(0 10px 30px ${theme.border})` }}
                                        />
                                        <div
                                            className="absolute bottom-4 right-4 text-[10px] border px-3 py-1.5 rounded bg-black/70 backdrop-blur shadow-lg"
                                            style={{ color: theme.primary, borderColor: theme.border }}
                                        >
                                            {painPointSrc}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Encountered Problems (first-person) */}
            {
                project.insights && project.insights.length > 0 && (
                    <section className="relative z-10 py-24 px-6 bg-[#0a0a0a] border-y" style={{ borderColor: theme.border }}>
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center space-y-3 mb-16">
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-1 rounded-full border text-[11px] tracking-[0.2em] uppercase"
                                    style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.primary }}
                                >
                                    遇到的问题
                                </div>
                                <h2 className="text-3xl font-bold text-white">从痛点到行动的过程</h2>
                                <p className="max-w-3xl mx-auto text-sm md:text-base text-zinc-400">
                                    真实碰到的坑和当时的应对，而不只是结果。
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {project.insights.map((insight, idx) => {
                                    const { body, takeaway } = splitInsight(insight.content)
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                                            viewport={{ once: true }}
                                            className="group relative bg-[#0f0f0f] border rounded-lg p-8 transition-all duration-300 hover:-translate-y-1"
                                            style={{ borderColor: theme.border }}
                                        >
                                            <div className="flex items-center gap-4 mb-6 pb-4 border-b" style={{ borderColor: theme.border }}>
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono border"
                                                    style={{ backgroundColor: theme.bg, color: theme.primary, borderColor: theme.border }}
                                                >
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: theme.secondary }}>Pain → Solution</div>
                                                    <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                                                </div>
                                            </div>
                                            <p className="leading-relaxed text-sm mb-4 text-zinc-400">{body}</p>
                                            <div
                                                className="flex items-start gap-2 text-xs p-3 rounded border"
                                                style={{ backgroundColor: theme.bg, color: theme.primary, borderColor: theme.border }}
                                            >
                                                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                                                <span>收获：{takeaway}</span>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Collection Showcase - Adaptive Layout Based on Item Count */}
            {
                project.plugin?.items && (
                    <section className="relative z-10 py-32 px-6 bg-[#0a0a0a]">
                        <div className="max-w-7xl mx-auto space-y-16">
                            <div className="flex items-center gap-4 justify-center">
                                <div className="h-px w-12" style={{ backgroundColor: theme.border }} />
                                <h2 className="text-2xl font-bold tracking-widest uppercase" style={{ color: theme.primary }}>
                                    组件清单 // Collection Items
                                </h2>
                                <div className="h-px w-12" style={{ backgroundColor: theme.border }} />
                            </div>

                            {/* Conditional Layout: Large cards for ≤5 items, compact grid for >5 items */}
                            {project.plugin.items.length <= 5 ? (
                                // Large Card Layout (for projects like Comfy Controller with 3 items)
                                <div className="grid grid-cols-1 gap-16">
                                    {project.plugin.items.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            className="bg-[#0f0f0f] border rounded-2xl overflow-hidden grid lg:grid-cols-2"
                                            style={{ borderColor: theme.border }}
                                        >
                                            {/* Visual Side */}
                                            <div className="bg-[#050505] border-r min-h-[300px] lg:min-h-full flex flex-col" style={{ borderColor: theme.border }}>
                                                <div className="flex-1 w-full h-full flex items-center justify-center p-0 overflow-hidden relative">
                                                    <ImageLightbox
                                                        src={withBasePath(item.image)}
                                                        alt={item.title}
                                                        variant={project.plugin?.colorTheme || "emerald"}
                                                        className="w-full h-auto max-h-full object-contain"
                                                    />
                                                </div>
                                            </div>

                                            {/* Content Side */}
                                            <div className="p-6 lg:p-8 flex flex-col justify-center space-y-6">
                                                <div>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                                        <span className="text-xs font-mono" style={{ color: theme.secondary }}>ITEM 0{idx + 1}</span>
                                                    </div>
                                                    <p className="text-base leading-loose text-zinc-400">
                                                        {item.desc}
                                                    </p>
                                                </div>

                                                {(item.problem || item.solution) && (
                                                    <div className="grid gap-4 p-5 bg-[#0a0a0a] rounded-lg border" style={{ borderColor: theme.border }}>
                                                        {item.problem && (
                                                            <div className="space-y-2">
                                                                <div className="text-[10px] text-red-400/70 uppercase tracking-wider font-bold flex items-center gap-2">
                                                                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                                                                    Problem
                                                                </div>
                                                                <p className="text-sm text-zinc-400 leading-relaxed">{item.problem}</p>
                                                            </div>
                                                        )}
                                                        {item.solution && (
                                                            <div className="space-y-2">
                                                                <div className="text-[10px] uppercase tracking-wider font-bold flex items-center gap-2" style={{ color: theme.primary }}>
                                                                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.primary }} />
                                                                    Solution
                                                                </div>
                                                                <p className="text-sm leading-relaxed text-zinc-400">{item.solution}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {!hideFeatures && item.features && item.features.length > 0 && (
                                                    <div className="space-y-3">
                                                        <div className="text-xs uppercase tracking-wider font-bold" style={{ color: theme.primary }}>Key Features</div>
                                                        <div className="grid gap-2">
                                                            {item.features.map((feature, fIdx) => (
                                                                <div key={fIdx} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: theme.primary, opacity: 0.7 }}>
                                                                    <Zap className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: theme.primary }} />
                                                                    <span className="text-zinc-400">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {item.command && (
                                                    <div className="flex items-center gap-2 p-4 bg-black/40 rounded-lg border" style={{ borderColor: theme.border }}>
                                                        <Terminal className="w-4 h-4" style={{ color: theme.primary }} />
                                                        <code className="font-mono text-sm" style={{ color: theme.secondary }}>
                                                            {item.command}
                                                        </code>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                // Compact Grid Layout (for projects like ZKZNodes with 19 items)
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {project.plugin.items.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            className="bg-[#0f0f0f] border rounded-xl overflow-hidden transition-all duration-300 group"
                                            style={{ borderColor: theme.border }}
                                        >
                                            {/* Image Section */}
                                            <div className="relative aspect-[3/2] bg-[#050505] border-b overflow-hidden" style={{ borderColor: theme.border }}>
                                                <div
                                                    className="absolute inset-0 bg-[size:20px_20px] opacity-5"
                                                    style={{ backgroundImage: `linear-gradient(45deg, ${theme.primary} 1px, transparent 1px)` }}
                                                />

                                                {item.image?.startsWith("ASSET_SLOT") ? (
                                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                                        <div className="text-center space-y-2">
                                                            <div className="text-xs font-mono border px-3 py-1.5 rounded bg-black/50" style={{ color: theme.primary, borderColor: theme.border }}>
                                                                {item.image}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <ImageLightbox
                                                        src={withBasePath(item.image)}
                                                        alt={item.title}
                                                        variant={project.plugin?.colorTheme || "emerald"}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                )}

                                                {/* Overlay UI Elements */}
                                                <div className="absolute top-3 left-3 flex gap-1.5 z-10 pointer-events-none">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-5 space-y-3">
                                                {/* Tag and Index */}
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="text-[10px] font-bold border px-1.5 py-0.5 rounded uppercase tracking-wider"
                                                        style={{ color: theme.primary, borderColor: theme.border, backgroundColor: theme.bg }}
                                                    >
                                                        {item.tag}
                                                    </span>
                                                    <span className="text-[10px] font-mono ml-auto" style={{ color: theme.secondary }}>#{idx + 1}</span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-lg font-bold text-white leading-tight">
                                                    {item.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm leading-relaxed line-clamp-3 text-zinc-400">
                                                    {item.desc}
                                                </p>

                                                {/* Command (if exists) */}
                                                {item.command && (
                                                    <div className="pt-2 border-t" style={{ borderColor: theme.border }}>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <Terminal className="w-3 h-3" style={{ color: theme.primary, opacity: 0.5 }} />
                                                            <code className="font-mono text-[11px]" style={{ color: theme.secondary }}>
                                                                {item.command}
                                                            </code>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )
            }

            {/* Before / After Comparison (Conditional) */}
            {
                project.plugin?.hasGlobalComparison !== false && (
                    <section className="relative z-10 py-32 px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-white mb-4">效果对比 // Impact Analysis</h2>
                                <p className="text-zinc-400">Direct comparison of efficiency and output quality.</p>
                            </div>

                            <div className="relative aspect-video bg-[#0f0f0f] rounded-xl border overflow-hidden group shadow-2xl" style={{ borderColor: theme.border }}>
                                <ComparisonSlider
                                    beforeImage={impactBefore}
                                    afterImage={impactAfter}
                                    beforeLabel="BEFORE"
                                    afterLabel="AFTER"
                                />
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Final Takeaways */}
            {
                project.insights && project.insights.length > 0 && (
                    <section className="relative z-10 py-24 px-6 bg-[#0a0a0a] border-t" style={{ borderColor: theme.border }}>
                        <div className="max-w-5xl mx-auto space-y-10 text-center">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1 rounded-full border text-[11px] tracking-[0.2em] uppercase"
                                style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.primary }}
                            >
                                心得体会
                            </div>
                            <h2 className="text-3xl font-bold text-white">做完之后的收获</h2>
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                {project.insights.map((insight, idx) => {
                                    const { takeaway } = splitInsight(insight.content)
                                    return (
                                        <div
                                            key={idx}
                                            className="p-6 rounded-lg bg-[#0f0f0f] border transition-colors"
                                            style={{ borderColor: theme.border }}
                                        >
                                            <div className="text-xs mb-3 font-mono" style={{ color: theme.primary, opacity: 0.7 }}>收获 #{String(idx + 1).padStart(2, '0')}</div>
                                            <h3 className="text-lg text-white font-semibold mb-3">{insight.title}</h3>
                                            <p className="text-sm leading-relaxed text-zinc-400">{takeaway}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )
            }

        </div >
    )
}
