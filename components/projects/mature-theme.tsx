"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion"
import { FileText, Cpu, Layers, Lightbulb, PenTool, Maximize2, ArrowDown, Quote, Code2, AlertTriangle } from "lucide-react"
import type { Project } from "@/lib/projects-data"

interface MatureProjectThemeProps {
    project: Project
}

export function MatureProjectTheme({ project }: MatureProjectThemeProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Flashlight effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const ultimatePain = project.mature?.motivation || project.description
    const assetBase = `/showcase/mature/${project.id}`
    const blueprintSrc = `${assetBase}/blueprint.png`
    const techDemoSrc = (idx: number) => `${assetBase}/tech-demo-${String(idx + 1).padStart(2, '0')}.png`

    const splitInsight = (text: string) => {
        const [body, takeaway] = text.split("收获:")
        return {
            body: (body || text).trim(),
            takeaway: (takeaway || "先看痛点，再定方案，最后总结收获。").trim(),
        }
    }

    return (
        <div
            ref={containerRef}
            className="relative min-h-[300vh] bg-[#050505] text-slate-200 font-sans selection:bg-white/20"
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#1a1a1a,transparent)]" />

                {/* Flashlight Beam */}
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`
                    }}
                />
            </div>

            {/* Section 1: The Origin (Personal Note) & Hero */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 z-10 pt-20 pb-32">
                <div className="max-w-5xl mx-auto w-full space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10 text-center flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 text-white/30 font-mono text-xs tracking-[0.2em] uppercase">
                            <span className="w-6 h-px bg-white/20" />
                            Project Archive 00{project.id.split('-')[1] || '1'}
                            <span className="w-6 h-px bg-white/20" />
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9]">
                            {project.title}
                        </h1>

                        <div className="max-w-2xl mx-auto">
                            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
                                {project.mature?.tagline || project.description}
                            </p>
                        </div>

                        <div className="pt-8 flex flex-wrap justify-center gap-x-12 gap-y-6">
                            {project.mature?.heroStats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</div>
                                    <div className="text-2xl text-white/90 font-mono font-light">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/10 flex flex-col items-center gap-4"
                    animate={{ opacity: [0.1, 0.3, 0.1], y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase">System Blueprint</span>
                </motion.div>
            </section>

            {/* Section 2: The Blueprint (Architecture) */}
            <section className="relative py-32 px-6 z-10 border-t border-white/5 bg-[#080808]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-20">
                        <div className="space-y-10 sticky top-32 h-fit">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white/40">
                                    <Layers className="w-5 h-5" />
                                    <span className="text-xs tracking-[0.2em] uppercase">Architecture</span>
                                </div>
                                <h2 className="text-4xl font-bold text-white">系统蓝图</h2>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {project.description}
                                </p>
                            </div>

                            <div className="space-y-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
                                {project.mature?.architecture.techStack.map((stack, i) => (
                                    <div key={i} className="flex justify-between bg-[#0c0c0c] p-4 hover:bg-[#111] transition-colors">
                                        <span className="text-xs text-slate-500 uppercase tracking-wider">{stack.category}</span>
                                        <span className="text-sm text-slate-300 font-mono">{stack.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            {/* Blueprint Visualizer */}
                            <div className="aspect-[16/10] bg-[#0c0c0c] rounded-sm border border-white/10 p-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[linear-gradient(#ffffff03_1px,transparent_1px),linear-gradient(90deg,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />

                                <div className="h-full w-full border border-white/5 bg-[#0a0a0a] relative overflow-hidden">
                                    {/* Handwritten Notes Effect */}
                                    <div className="absolute top-8 right-8 -rotate-6 text-yellow-100/40 font-handwriting text-sm max-w-[150px] hidden md:block z-20 pointer-events-none mix-blend-plus-lighter">
                                        {project.mature?.architecture.diagramNote}
                                        <svg className="absolute top-full left-0 w-12 h-12 text-yellow-100/20" viewBox="0 0 100 100">
                                            <path d="M10,10 Q50,50 20,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src={blueprintSrc}
                                            alt="System architecture blueprint"
                                            className="max-w-full max-h-full object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between text-[10px] text-white/20 font-mono uppercase tracking-widest">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why I Made This (Moved) */}
            <section className="relative py-32 px-6 z-10 bg-[#050505] border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-2xl blur-sm opacity-50" />
                        <div className="relative bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 md:p-12 space-y-8 shadow-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80">
                                    <AlertTriangle className="w-4 h-4" />
                                </div>
                                <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Core Motivation</div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white">我为什么要做这个项目</h3>
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                    {ultimatePain}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/30 font-mono">
                                <span>ORIGIN STORY</span>
                                <div className="flex items-center gap-2">
                                    <span>READ FULL STORY</span>
                                    <ArrowDown className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Encountered Problems (first-person) */}
            {project.insights && project.insights.length > 0 && (
                <section className="relative py-32 px-6 z-10 bg-[#050505]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/3 space-y-6 sticky top-32 h-fit">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                                    <span className="text-[10px] tracking-[0.2em] uppercase">Engineering Log</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white">从痛点出发的<br />解决思路</h2>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    记录做事时遇到的阻力和当时的行动方案，先把坑填平，再谈优化。
                                </p>
                            </div>

                            <div className="md:w-2/3 grid gap-6">
                                {project.insights.map((insight, i) => {
                                    const { body, takeaway } = splitInsight(insight.content)
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            className="group relative p-8 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 hover:bg-[#0f0f0f] transition-all duration-500"
                                        >
                                            <div className="absolute top-8 right-8 text-[10px] font-mono text-white/20">0{i + 1}</div>

                                            <div className="mb-6">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Challenge</p>
                                                <h3 className="text-xl font-bold text-white leading-tight">
                                                    {insight.title}
                                                </h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="pl-4 border-l border-white/10">
                                                    <p className="text-slate-400 leading-relaxed text-sm">
                                                        {body}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-white/40 bg-white/[0.02] p-3 rounded">
                                                    <Lightbulb className="w-3 h-3 text-yellow-500/50" />
                                                    <span>收获：{takeaway}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Section 3: The Breakthroughs (Challenges) */}
            <section className="relative py-32 px-6 z-10 bg-[#080808] border-t border-white/5">
                <div className="max-w-6xl mx-auto space-y-32">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">技术突破与挑战</h2>
                        <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">Solving the "Impossible"</p>
                    </div>

                    {project.mature?.features.map((item, idx) => (
                        <div key={idx} className="group relative">
                            <div className={`grid md:grid-cols-2 gap-16 items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                <div className={`${idx % 2 === 0 ? 'md:text-right md:order-1' : 'md:order-2'} space-y-8`}>
                                    <div className={`inline-flex p-3 rounded-xl bg-white/5 text-white/80 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                        <Maximize2 className="w-5 h-5" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                                    <div className="space-y-4 text-slate-400">
                                        <div>
                                            <strong className="text-white/30 text-[10px] uppercase tracking-widest block mb-2">{item.subtitle}</strong>
                                            <p className="leading-relaxed">{item.desc}</p>
                                        </div>
                                            <div className={`flex gap-2 flex-wrap ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                                                {item.stats.map((stat, sIdx) => (
                                                    <span key={sIdx} className="text-[10px] border border-white/10 px-2 py-1 rounded text-white/40 font-mono">{stat}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative`}>
                                    <div className="aspect-video bg-[#050505] rounded-lg border border-white/10 overflow-hidden relative group-hover:border-white/20 transition-colors shadow-2xl">
                                        <img
                                            src={techDemoSrc(idx)}
                                            alt={`${item.title} visual`}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        {/* Holographic Overlay Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Takeaways */}
            {project.insights && project.insights.length > 0 && (
                <section className="relative py-32 px-6 z-10 bg-[#050505] border-t border-white/5">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                            <Lightbulb className="w-6 h-6 text-white/60" />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-white">心得体会</h2>
                            <p className="text-slate-400 text-sm">做完之后最重要的收获与反思。</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            {project.insights.map((insight, idx) => {
                                const { takeaway } = splitInsight(insight.content)
                                return (
                                    <div key={idx} className="p-6 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="text-[10px] text-white/30 mb-3 font-mono uppercase tracking-wider">Takeaway 0{idx + 1}</div>
                                        <h3 className="text-base text-white font-medium mb-2">{insight.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{takeaway}</p>
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
