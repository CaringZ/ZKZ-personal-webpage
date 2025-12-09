"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Box, Layers, Settings, Sliders, Terminal, Wand2, Wrench, Hammer, Zap, Image as ImageIcon, CheckCircle2, Activity } from "lucide-react"
import type { Project } from "@/lib/projects-data"
import { ComparisonSlider } from "@/components/ui/comparison-slider"
import { ImageLightbox } from "@/components/ui/image-lightbox"

interface PluginThemeLoraProps {
    project: Project
}

export function PluginThemeLora({ project }: PluginThemeLoraProps) {
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
    const splitInsight = (text: string) => {
        const [body, takeaway] = text.split("收获:")
        return {
            body: (body || text).trim(),
            takeaway: (takeaway || "").trim(),
        }
    }

    return (
        <div ref={containerRef} className="relative min-h-[250vh] bg-[#0a0a0a] text-zinc-400 font-mono selection:bg-emerald-500/30">
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
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        {project.title}
                    </h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-lg">
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
                                核心痛点 // CORE PAIN POINT
                            </div>
                            <h2 className="text-4xl font-bold text-white">我为什么要做这个工具</h2>
                            <p className="text-zinc-400 leading-relaxed text-lg border-l-2 border-red-500/30 pl-6">
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
                            <div className="aspect-[4/3] bg-[#050505] rounded-xl border border-dashed border-emerald-900/30 flex items-center justify-center relative overflow-hidden shadow-2xl">
                                {/* Generative Style Drift Animation */}
                                <div className="grid grid-cols-4 gap-4 p-8 w-full h-full">
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
                            <h2 className="text-3xl font-bold text-white">从问题到行动的过程</h2>
                            <p className="text-zinc-400 max-w-3xl mx-auto text-sm md:text-base">
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
                                                <div className="text-[10px] text-emerald-600 uppercase tracking-[0.2em] mb-1">Problem → Solution</div>
                                                <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-zinc-400 leading-relaxed text-sm">{body}</p>
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
                                模型展示 // Model Showcase
                            </h2>
                            <div className="h-px w-12 bg-emerald-900/30" />
                        </div>

                        <div className="space-y-32">
                            {project.plugin.items.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="space-y-12"
                                >
                                    {/* Item Header */}
                                    <div className="text-center space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-800/60 text-emerald-400 text-xs tracking-widest uppercase">
                                            {item.tag}
                                        </div>
                                        <h3 className="text-4xl font-bold text-white">{item.title}</h3>
                                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                                        {/* Left Column: Training Set + Features + Training Thoughts */}
                                        <div className="flex flex-col gap-6">
                                            {/* Training Set */}
                                            {item.trainingImage && (
                                                <div className="aspect-video bg-[#0f0f0f] rounded-xl border border-emerald-900/30 overflow-hidden relative group shrink-0 shadow-2xl">
                                                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-emerald-500/20 text-emerald-500/90 text-[10px] font-bold tracking-widest uppercase shadow-lg">
                                                        <ImageIcon className="w-3 h-3" />
                                                        Training Set
                                                    </div>
                                                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                                                    <ImageLightbox
                                                        src={withBasePath(item.trainingImage)}
                                                        alt="Training Set"
                                                        variant="emerald"
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                            )}

                                            {/* Features (Top) */}
                                            {item.features && (
                                                <div className="bg-[#0f0f0f] border border-emerald-900/30 rounded-xl p-5">
                                                    <div className="text-xs text-emerald-500/70 uppercase tracking-wider font-bold mb-3">Key Features</div>
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-emerald-500/60">
                                                        {item.features?.map((feature, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <Zap className="w-3 h-3 shrink-0" />
                                                                <span>{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Training Thoughts (Bottom) */}
                                            {item.trainingThoughts && (
                                                <div className="bg-[#0f0f0f] border border-emerald-900/30 rounded-xl p-5 relative overflow-hidden flex-1">
                                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                                        <Box className="w-16 h-16 text-emerald-500" />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center gap-2 text-emerald-500/70 uppercase tracking-wider font-bold text-xs mb-3">
                                                            <Layers className="w-4 h-4" />
                                                            训练思路 // Methodology
                                                        </div>
                                                        <p className="text-zinc-400 leading-relaxed text-sm">
                                                            {item.trainingThoughts}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Command */}
                                            {item.command && (
                                                <div className="flex items-center gap-2 p-3 bg-black/40 rounded-lg border border-emerald-900/30">
                                                    <Terminal className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    <code className="font-mono text-sm text-emerald-400 break-all">
                                                        {item.command}
                                                    </code>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column: Comparison + Training Params */}
                                        <div className="flex flex-col gap-6">
                                            {/* Comparison Slider */}
                                            <div className="relative aspect-video bg-[#0f0f0f] rounded-xl border border-emerald-900/30 overflow-hidden group shadow-2xl shrink-0">
                                                {item.comparisonImage ? (
                                                    <ComparisonSlider
                                                        beforeImage={withBasePath(item.image)}
                                                        afterImage={withBasePath(item.comparisonImage)}
                                                        beforeLabel="BEFORE"
                                                        afterLabel="AFTER"
                                                    />
                                                ) : (
                                                    <ImageLightbox
                                                        src={withBasePath(item.image)}
                                                        alt={item.title}
                                                        variant="emerald"
                                                        className="w-full h-full"
                                                    />
                                                )}
                                            </div>

                                            {/* Training Parameters */}
                                            {item.trainingParams && (
                                                <div className="bg-[#0f0f0f] border border-emerald-900/30 rounded-xl p-5 flex-1">
                                                    <div className="flex items-center gap-2 text-emerald-500/70 uppercase tracking-wider font-bold text-xs mb-5">
                                                        <Activity className="w-4 h-4" />
                                                        训练参数 // Training Specs
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                                        <div>
                                                            <div className="text-[10px] uppercase tracking-wider text-emerald-500/40 mb-1">Resolution</div>
                                                            <div className="text-sm text-emerald-100 font-mono">{item.trainingParams.resolution}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] uppercase tracking-wider text-emerald-500/40 mb-1">Rank</div>
                                                            <div className="text-sm text-emerald-100 font-mono">{item.trainingParams.rank}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] uppercase tracking-wider text-emerald-500/40 mb-1">Dataset</div>
                                                            <div className="text-sm text-emerald-100 font-mono">{item.trainingParams.dataset}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] uppercase tracking-wider text-emerald-500/40 mb-1">Steps</div>
                                                            <div className="text-sm text-emerald-100 font-mono">{item.trainingParams.steps}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] uppercase tracking-wider text-emerald-500/40 mb-1">Learning Rate</div>
                                                            <div className="text-sm text-emerald-100 font-mono">{item.trainingParams.learningRate}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] uppercase tracking-wider text-emerald-500/40 mb-1">Base Model</div>
                                                            <div className="text-sm text-emerald-100 font-mono truncate" title={item.trainingParams.baseModel}>{item.trainingParams.baseModel}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 pt-4 border-t border-emerald-900/30">
                                                        <div className="text-[10px] uppercase tracking-wider text-emerald-500/40 mb-2">Trigger Word</div>
                                                        <div className="text-xs text-emerald-400 font-mono bg-emerald-950/30 px-3 py-2 rounded border border-emerald-900/30 select-all break-all">
                                                            {item.trainingParams.triggerWord}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    {idx < (project.plugin?.items?.length || 0) - 1 && (
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-900/30 to-transparent" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Before / After Comparison (Conditional) */}
            {project.plugin?.hasGlobalComparison !== false && (
                <section className="relative z-10 py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">效果对比 // Impact Analysis</h2>
                            <p className="text-zinc-400">Direct comparison of efficiency and output quality.</p>
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
            {project.conclusion && (
                <section className="relative z-10 py-24 px-6 bg-[#0a0a0a] border-t border-emerald-900/30">
                    <div className="max-w-4xl mx-auto space-y-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-900/20 border border-emerald-800/60 text-emerald-400 text-[11px] tracking-[0.2em] uppercase">
                            心得体会
                        </div>
                        <h2 className="text-3xl font-bold text-white">做完之后的收获</h2>
                        <div className="p-8 rounded-2xl bg-[#0f0f0f] border border-emerald-900/40 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-900/0 via-emerald-500/50 to-emerald-900/0 opacity-50" />
                            <p className="text-zinc-400 text-lg leading-loose text-left indent-8 font-light">
                                {project.conclusion}
                            </p>
                            <div className="absolute -bottom-4 -right-4 text-emerald-900/10 rotate-12">
                                <Zap className="w-32 h-32" />
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </div>
    )
}
