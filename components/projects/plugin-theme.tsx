"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Box, Layers, Settings, Sliders, Terminal, Wand2, Wrench, Hammer, Zap, Image as ImageIcon, CheckCircle2 } from "lucide-react"
import type { Project } from "@/lib/projects-data"
import { ComparisonSlider } from "@/components/ui/comparison-slider"

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

    const ultimatePain = project.plugin?.painPoint.desc || project.description
    const assetBase = `/showcase/plugins/${project.id}`
    const painPointSrc = `${assetBase}/painpoint.png`
    const impactBefore = `${assetBase}/impact-before.png`
    const impactAfter = `${assetBase}/impact-after.png`
    const splitInsight = (text: string) => {
        const [body, takeaway] = text.split("收获:")
        return {
            body: (body || text).trim(),
            takeaway: (takeaway || "先找痛点，再落方案，最后复盘。").trim(),
        }
    }

    return (
        <div ref={containerRef} className="relative min-h-[250vh] bg-[#0a0a0a] text-emerald-50 font-mono selection:bg-emerald-500/30">
            {/* Blueprint Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:200px_200px] opacity-50" />
            </div>

            {/* Header: Workbench Style */}
            <header className="relative h-screen flex flex-col items-center justify-center z-10 border-b border-emerald-900/30 bg-[#0a0a0a]/50 backdrop-blur-sm">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-emerald-500/20 rounded-lg opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[380px] border border-dashed border-emerald-500/20 rounded-lg opacity-30" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 bg-[#0a0a0a]/90 p-12 backdrop-blur-sm border border-emerald-500/30 rounded-xl max-w-3xl shadow-2xl shadow-emerald-900/20"
                >
                    <div className="flex items-center justify-center gap-3 text-emerald-500 mb-4">
                        <Wrench className="w-5 h-5" />
                        <span className="text-sm tracking-widest uppercase">工具规格说明书 // Tool Spec</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-emerald-100 tracking-tight">
                        {project.title}
                    </h1>
                    <p className="text-emerald-400/60 max-w-xl mx-auto text-lg">
                        {project.description}
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <div className="px-4 py-1 rounded-full border border-emerald-800 bg-emerald-950/30 text-xs text-emerald-400">
                            v1.2.0
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-emerald-500/30 text-xs animate-pulse"
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
                            <h2 className="text-4xl font-bold text-emerald-50">我为什么要做这个工具</h2>
                            <p className="text-emerald-200/60 leading-relaxed text-lg border-l-2 border-red-500/30 pl-6">
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
                            <div className="aspect-[4/3] bg-[#111] rounded-xl border border-dashed border-emerald-800/50 flex items-center justify-center relative overflow-hidden group hover:border-emerald-600 transition-colors shadow-2xl">
                                {/* Scattered Files Animation Placeholder */}
                                <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-4 p-8 opacity-50 group-hover:opacity-30 transition-opacity">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <div key={i} className="w-12 h-16 bg-emerald-900/20 border border-emerald-800 rounded flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                            <div className="w-8 h-1 bg-emerald-800/50" />
                                        </div>
                                    ))}
                                </div>
                                <img
                                    src={painPointSrc}
                                    alt="Pain point visual"
                                    className="z-10 max-h-full max-w-full object-contain drop-shadow-[0_10px_30px_rgba(16,185,129,0.25)]"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-4 right-4 text-[10px] text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded bg-black/70 backdrop-blur shadow-lg">
                                    {painPointSrc}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Encountered Problems (first-person) */}
            {project.insights && project.insights.length > 0 && (
                <section className="relative z-10 py-24 px-6 bg-[#0a0a0a] border-y border-emerald-900/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center space-y-3 mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-900/20 border border-emerald-800/60 text-emerald-400 text-[11px] tracking-[0.2em] uppercase">
                                遇到的问题
                            </div>
                            <h2 className="text-3xl font-bold text-emerald-100">从痛点到行动的过程</h2>
                            <p className="text-emerald-200/60 max-w-3xl mx-auto text-sm md:text-base">
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
                                        className="group relative bg-[#0f0f0f] border border-emerald-900/40 rounded-lg p-8 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-emerald-900/30">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-900/20 text-emerald-400 flex items-center justify-center text-sm font-mono border border-emerald-800/60">
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[10px] text-emerald-600 uppercase tracking-[0.2em] mb-1">Pain → Solution</div>
                                                <h3 className="text-lg font-bold text-emerald-50">{insight.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-emerald-200/80 leading-relaxed text-sm mb-4">{body}</p>
                                        <div className="flex items-start gap-2 text-xs text-emerald-400/80 bg-emerald-900/10 p-3 rounded border border-emerald-900/20">
                                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>收获：{takeaway}</span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Collection Showcase - Adaptive Layout Based on Item Count */}
            {project.plugin?.items && (
                <section className="relative z-10 py-32 px-6 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="flex items-center gap-4 justify-center">
                            <div className="h-px w-12 bg-emerald-900/30" />
                            <h2 className="text-2xl font-bold text-emerald-500 tracking-widest uppercase">
                                组件清单 // Collection Items
                            </h2>
                            <div className="h-px w-12 bg-emerald-900/30" />
                        </div>

                        {/* Conditional Layout: Large cards for ≤5 items, compact grid for >5 items */}
                        {project.plugin.items.length <= 5 ? (
                            // Large Card Layout (for projects like Comfy Controller with 3 items)
                            <div className="grid grid-cols-1 gap-24">
                                {project.plugin.items.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-[#0f0f0f] border border-emerald-900/30 rounded-2xl overflow-hidden grid lg:grid-cols-2"
                                    >
                                        {/* Visual Side */}
                                        <div className="relative min-h-[400px] bg-[#050505] border-r border-emerald-900/30 group">
                                            <div className="absolute inset-0 bg-[linear-gradient(45deg,#10b981_1px,transparent_1px)] bg-[size:20px_20px] opacity-5" />

                                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                                {item.image?.startsWith("ASSET_SLOT") ? (
                                                    <div className="text-center space-y-4">
                                                        <div className="text-xs font-mono text-emerald-500/30 border border-emerald-900/50 px-4 py-2 rounded bg-black/50">
                                                            {item.image}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                                )}
                                            </div>

                                            {/* Overlay UI Elements */}
                                            <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
                                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="p-10 lg:p-12 flex flex-col justify-center space-y-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-6">
                                                    <span className="text-xs font-bold text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-950/30">
                                                        {item.tag}
                                                    </span>
                                                    <span className="text-xs font-mono text-emerald-700 ml-auto">ITEM 0{idx + 1}</span>
                                                </div>
                                                <h3 className="text-3xl font-bold text-emerald-100 mb-4">{item.title}</h3>
                                                <p className="text-lg text-emerald-200/60 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {(item.problem || item.solution) && (
                                                <div className="grid gap-4 p-6 bg-[#0a0a0a] rounded-lg border border-emerald-900/20">
                                                    {item.problem && (
                                                        <div className="space-y-1">
                                                            <div className="text-[10px] text-red-400/70 uppercase tracking-wider font-bold flex items-center gap-2">
                                                                <span className="w-1 h-1 bg-red-500 rounded-full" />
                                                                Problem
                                                            </div>
                                                            <p className="text-sm text-emerald-100/70">{item.problem}</p>
                                                        </div>
                                                    )}
                                                    {item.solution && (
                                                        <div className="space-y-1">
                                                            <div className="text-[10px] text-emerald-400/70 uppercase tracking-wider font-bold flex items-center gap-2">
                                                                <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                                                                Solution
                                                            </div>
                                                            <p className="text-sm text-emerald-100/70">{item.solution}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {item.features && item.features.length > 0 && (
                                                <div className="space-y-3">
                                                    <div className="text-xs text-emerald-500/70 uppercase tracking-wider font-bold">Key Features</div>
                                                    <div className="grid gap-2">
                                                        {item.features.map((feature, fIdx) => (
                                                            <div key={fIdx} className="flex items-start gap-2 text-sm text-emerald-200/70">
                                                                <Zap className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                                <span>{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {item.command && (
                                                <div className="flex items-center gap-2 p-4 bg-black/40 rounded-lg border border-emerald-900/30">
                                                    <Terminal className="w-4 h-4 text-emerald-500" />
                                                    <code className="font-mono text-sm text-emerald-400">
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
                                        className="bg-[#0f0f0f] border border-emerald-900/30 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group"
                                    >
                                        {/* Image Section */}
                                        <div className="relative aspect-[3/2] bg-[#050505] border-b border-emerald-900/30 overflow-hidden">
                                            <div className="absolute inset-0 bg-[linear-gradient(45deg,#10b981_1px,transparent_1px)] bg-[size:20px_20px] opacity-5" />

                                            {item.image?.startsWith("ASSET_SLOT") ? (
                                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                                    <div className="text-center space-y-2">
                                                        <div className="text-xs font-mono text-emerald-500/40 border border-emerald-900/50 px-3 py-1.5 rounded bg-black/50">
                                                            {item.image}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                                                <span className="text-[10px] font-bold text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider bg-emerald-950/30">
                                                    {item.tag}
                                                </span>
                                                <span className="text-[10px] font-mono text-emerald-700 ml-auto">#{idx + 1}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-emerald-100 leading-tight">
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm text-emerald-200/60 leading-relaxed line-clamp-3">
                                                {item.desc}
                                            </p>

                                            {/* Command (if exists) */}
                                            {item.command && (
                                                <div className="pt-2 border-t border-emerald-900/20">
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <Terminal className="w-3 h-3 text-emerald-500/50" />
                                                        <code className="font-mono text-emerald-400/70 text-[11px]">
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
            )}

            {/* Before / After Comparison (Conditional) */}
            {project.plugin?.hasGlobalComparison !== false && (
                <section className="relative z-10 py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-emerald-100 mb-4">效果对比 // Impact Analysis</h2>
                            <p className="text-emerald-500/60">Direct comparison of efficiency and output quality.</p>
                        </div>

                        <div className="relative aspect-video bg-[#0f0f0f] rounded-xl border border-emerald-900/30 overflow-hidden group shadow-2xl">
                            <ComparisonSlider
                                beforeImage={impactBefore}
                                afterImage={impactAfter}
                                beforeLabel="BEFORE"
                                afterLabel="AFTER"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Final Takeaways */}
            {project.insights && project.insights.length > 0 && (
                <section className="relative z-10 py-24 px-6 bg-[#0a0a0a] border-t border-emerald-900/30">
                    <div className="max-w-5xl mx-auto space-y-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-900/20 border border-emerald-800/60 text-emerald-400 text-[11px] tracking-[0.2em] uppercase">
                            心得体会
                        </div>
                        <h2 className="text-3xl font-bold text-emerald-100">做完之后的收获</h2>
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            {project.insights.map((insight, idx) => {
                                const { takeaway } = splitInsight(insight.content)
                                return (
                                    <div key={idx} className="p-6 rounded-lg bg-[#0f0f0f] border border-emerald-900/40 hover:border-emerald-500/30 transition-colors">
                                        <div className="text-xs text-emerald-500/70 mb-3 font-mono">收获 #{String(idx + 1).padStart(2, '0')}</div>
                                        <h3 className="text-lg text-emerald-50 font-semibold mb-3">{insight.title}</h3>
                                        <p className="text-emerald-200/80 text-sm leading-relaxed">{takeaway}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

        </div>
    )
}
