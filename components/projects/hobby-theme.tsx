"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Code2, Coffee, Play, Terminal, Cpu, Layout, Lightbulb, FileJson, FileCode, GitBranch, Search, Settings, MoreHorizontal, History, Activity, Box, Users, Zap } from "lucide-react"
import type { Project } from "@/lib/projects-data"
import { useState } from "react"

interface HobbyProjectThemeProps {
    project: Project
}

// Enhanced syntax highlighter for VS Code look
const HighlightedCode = ({ code }: { code: string }) => {
    const tokens = code.split(/(\s+|[(){}[\],.;:])/g).map((token, i) => {
        if (token.match(/^(const|let|var|function|return|import|from|export|default|class|interface|type|async|await)$/)) {
            return <span key={i} className="text-[#c586c0]">{token}</span> // Keywords (Purple)
        }
        if (token.match(/^(true|false|null|undefined)$/)) {
            return <span key={i} className="text-[#569cd6]">{token}</span> // Booleans/Null (Blue)
        }
        if (token.match(/^(['"`]).*\1$/)) {
            return <span key={i} className="text-[#ce9178]">{token}</span> // Strings (Orange)
        }
        if (token.match(/^[A-Z][a-zA-Z0-9]*$/)) {
            return <span key={i} className="text-[#4ec9b0]">{token}</span> // Types/Classes (Teal)
        }
        if (token.match(/^[a-z][a-zA-Z0-9]*\($/)) {
            return <span key={i} className="text-[#dcdcaa]">{token}</span> // Functions (Yellow)
        }
        if (token.match(/^\d+$/)) {
            return <span key={i} className="text-[#b5cea8]">{token}</span> // Numbers (Light Green)
        }
        if (token.match(/^[A-Z_]+$/)) {
            return <span key={i} className="text-[#4fc1ff]">{token}</span> // Constants (Light Blue)
        }
        return <span key={i} className="text-[#d4d4d4]">{token}</span>
    })

    return <code className="font-mono text-sm leading-relaxed">{tokens}</code>
}

const iconMap: Record<string, any> = {
    Layout,
    Cpu,
    History,
    Activity,
    Box,
    Users,
    Zap
}

export function HobbyProjectTheme({ project }: HobbyProjectThemeProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "terminal">("preview")
    const ultimatePain = project.description
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
    const withBasePath = (path: string) => path?.startsWith('http') ? path : `${basePath}${path}`
    const assetBase = `/showcase/hobby/${project.id}`
    const screenRecording = withBasePath(`${assetBase}/screen-recording.mp4`)
    const screenPoster = withBasePath(`${assetBase}/screen-recording.png`)
    const theme = (() => {
        switch (project.hobby?.colorTheme) {
            case "orange": return { primary: "#f97316", secondary: "#fb923c", border: "rgba(249, 115, 22, 0.3)" }
            case "purple": return { primary: "#a855f7", secondary: "#c084fc", border: "rgba(168, 85, 247, 0.3)" }
            case "emerald": return { primary: "#10b981", secondary: "#34d399", border: "rgba(16, 185, 129, 0.3)" }
            case "blue":
            default: return { primary: "#4fc1ff", secondary: "#60a5fa", border: "rgba(79, 193, 255, 0.3)" }
        }
    })()

    const splitInsight = (text: string) => {
        const [body, takeaway] = text.split("收获:")
        return {
            body: (body || text).trim(),
            takeaway: (takeaway || "把问题拆开，先填坑，再总结。").trim(),
        }
    }

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono selection:bg-[#264f78] overflow-x-hidden">
            {/* IDE Header / Tabs */}
            <div className="sticky top-0 z-50 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-4 h-12 shadow-md">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2d2d2d] text-white text-xs rounded-t border-t border-x border-[#444] translate-y-[1px] relative z-10 min-w-[120px]">
                            <span className="text-[#569cd6] font-bold">TS</span>
                            <span>{project.title}.tsx</span>
                            <div className="w-2 h-2 rounded-full bg-white/20 ml-auto" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 text-[#999] text-xs hover:bg-[#2d2d2d]/50 rounded cursor-pointer transition-colors">
                            <span className="text-[#ce9178] font-bold">MD</span>
                            <span>README.md</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-[#666]">
                    <Layout className="w-4 h-4" />
                    <Search className="w-4 h-4" />
                    <GitBranch className="w-4 h-4" />
                    <MoreHorizontal className="w-4 h-4" />
                </div>
            </div>

            <div className="flex min-h-[calc(100vh-48px)]">
                {/* Activity Bar */}
                <div className="hidden md:flex flex-col items-center w-12 border-r border-[#333] bg-[#181818] py-4 gap-6 text-[#666]">
                    <FileCode className="w-6 h-6 text-white" />
                    <Search className="w-6 h-6 hover:text-white transition-colors" />
                    <GitBranch className="w-6 h-6 hover:text-white transition-colors" />
                    <div className="flex-1" />
                    <Settings className="w-6 h-6 hover:text-white transition-colors" />
                </div>

                {/* Line Numbers Sidebar */}
                <div className="hidden lg:flex flex-col items-end pr-4 py-8 w-16 text-[#858585] text-sm select-none border-r border-[#333] bg-[#1e1e1e]">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="leading-relaxed opacity-50 hover:opacity-100 transition-opacity font-mono text-xs">{i + 1}</div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
                    {/* Project Title as Code Comment */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="text-[#6a9955] font-mono text-sm sm:text-base mb-4">
                            <span className="block">/**</span>
                            <span className="block"> * <span className="text-[#569cd6]">@project</span> {project.title}</span>
                            {project.hobby?.tagline && (
                                <span className="block"> * <span className="text-[#569cd6]">@tagline</span> {project.hobby.tagline}</span>
                            )}
                            <span className="block"> * <span className="text-[#569cd6]">@description</span> {project.description}</span>
                            <span className="block"> * <span className="text-[#569cd6]">@version</span> 1.0.0</span>
                            <span className="block"> * <span className="text-[#569cd6]">@status</span> {project.status}</span>
                            <span className="block"> */</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap items-center gap-3" style={{ color: theme.primary }}>
                            <span className="text-[#c586c0] text-2xl md:text-4xl">const</span>
                            <span className="text-[#dcdcaa]">{project.title.replace(/\s+/g, '')}</span>
                            <span className="text-[#d4d4d4] text-2xl md:text-4xl">=</span>
                            <span className="text-[#ce9178]">&quot;My Passion Project&quot;</span>
                            <span className="text-[#d4d4d4] text-2xl md:text-4xl">;</span>
                        </h1>
                    </motion.div>

                    {/* Motivation (README.md style) */}
                    {project.hobby?.motivation && (
                        <section className="mb-20">
                            <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-2">
                                <FileCode className="w-5 h-5" style={{ color: theme.primary }} />
                                <h2 className="text-lg font-bold text-[#d4d4d4] uppercase tracking-wider">README.md // 开发动机</h2>
                            </div>
                            <div
                                className="bg-[#1e1e1e] rounded-lg border border-[#333] p-8 relative overflow-hidden group transition-colors"
                                style={{ borderColor: '#333' }}
                            >
                                <div
                                    className="absolute inset-0 border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                    style={{ borderColor: theme.border }}
                                />
                                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                    <Lightbulb className="w-40 h-40 text-white" />
                                </div>
                                <div className="relative z-10 font-mono text-sm leading-relaxed text-[#d4d4d4]">
                                    <span className="font-bold" style={{ color: theme.primary }}># Why I made this</span>
                                    <br /><br />
                                    {project.hobby.motivation}
                                </div>
                            </div>
                        </section>
                    )}



                    {/* Features (Module Config style) */}
                    {project.hobby?.features && (
                        <section className="mb-20">
                            <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-2">
                                <Settings className="w-5 h-5" style={{ color: theme.primary }} />
                                <h2 className="text-lg font-bold text-[#d4d4d4] uppercase tracking-wider">Module Config // 功能亮点</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {project.hobby.features.map((feature, idx) => {
                                    const Icon = iconMap[feature.icon] || Box
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-[#1e1e1e] rounded-lg border border-[#333] overflow-hidden transition-colors group relative"
                                        >
                                            <div
                                                className="absolute inset-0 border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity rounded-lg z-20"
                                                style={{ borderColor: theme.border }}
                                            />
                                            <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#333]">
                                                <Icon className="w-4 h-4" style={{ color: theme.primary }} />
                                                <span className="text-[#d4d4d4] text-xs font-mono">{feature.title}</span>
                                            </div>
                                            <div className="p-6 font-mono text-sm text-[#d4d4d4] leading-relaxed">
                                                <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">config</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">&quot;{feature.desc}&quot;</span>;
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )}

                    {/* Use Cases (Test Scenarios style) */}
                    {project.hobby?.useCases && (
                        <section className="mb-20">
                            <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-2">
                                <Terminal className="w-5 h-5" style={{ color: theme.primary }} />
                                <h2 className="text-lg font-bold text-[#d4d4d4] uppercase tracking-wider">Test Scenarios // 使用场景</h2>
                            </div>
                            <div className="space-y-4">
                                {project.hobby.useCases.map((useCase, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#1e1e1e] rounded-lg border border-[#333] p-6 font-mono text-sm transition-colors relative"
                                    >
                                        <div
                                            className="absolute inset-0 border pointer-events-none opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                                            style={{ borderColor: theme.border }}
                                        />
                                        <div className="text-[#c586c0]">describe<span className="text-[#d4d4d4]">(</span><span className="text-[#ce9178]">&quot;{useCase.title}&quot;</span><span className="text-[#d4d4d4]">, () </span><span className="text-[#c586c0]">{`=>`}</span><span className="text-[#d4d4d4]"> {`{`}</span></div>
                                        <div className="pl-8 mt-2 space-y-2 border-l border-[#333] ml-2">
                                            <div>
                                                <span className="text-[#6a9955]">// Pain: {useCase.pain}</span>
                                            </div>
                                            <div>
                                                <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">solution</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">&quot;{useCase.solution}&quot;</span>;
                                            </div>
                                            <div>
                                                <span className="text-[#dcdcaa]">expect</span><span className="text-[#d4d4d4]">(</span><span className="text-[#9cdcfe]">problem</span><span className="text-[#d4d4d4]">).</span><span className="text-[#dcdcaa]">toBeSolvedBy</span><span className="text-[#d4d4d4]">(</span><span className="text-[#9cdcfe]">solution</span><span className="text-[#d4d4d4]">);</span>
                                            </div>
                                        </div>
                                        <div className="text-[#d4d4d4] mt-2">{`})`}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Tech Stack "Imports" */}
                    <div
                        className="mb-20 space-y-3 pl-6 border-l border-[#333] transition-colors hover:border-opacity-50"
                        style={{ borderColor: '#333' }}
                    >
                        {project.technologies.map((tech, i) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-sm sm:text-base font-mono"
                            >
                                <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">{`{ ${tech} }`}</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">&quot;@/libs/{tech.toLowerCase()}&quot;</span>;
                            </motion.div>
                        ))}
                    </div>

                    {/* The "Demo" Monitor */}
                    <section className="mb-24">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Play className="w-4 h-4" style={{ color: theme.primary }} />
                                <span className="text-[#d4d4d4] font-bold text-sm tracking-wider">RUN_DEBUG</span>
                            </div>
                            <div className="flex bg-[#252526] rounded-md p-0.5 border border-[#333]">
                                <button
                                    onClick={() => setActiveTab("preview")}
                                    className={`px-3 py-1 text-xs rounded-sm transition-all ${activeTab === "preview" ? "bg-[#37373d] text-white shadow-sm" : "text-[#999] hover:text-white"}`}
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => setActiveTab("terminal")}
                                    className={`px-3 py-1 text-xs rounded-sm transition-all ${activeTab === "terminal" ? "bg-[#37373d] text-white shadow-sm" : "text-[#999] hover:text-white"}`}
                                >
                                    Terminal
                                </button>
                            </div>
                        </div>

                        <div className="relative aspect-video bg-[#1e1e1e] rounded-lg border border-[#333] shadow-2xl overflow-hidden group ring-1 ring-black/50">
                            {/* Browser Toolbar (overlay, no layout shift) */}
                            <div className="absolute top-0 left-0 right-0 h-9 bg-[#252526]/90 flex items-center px-4 gap-3 border-b border-[#1e1e1e] z-20 pointer-events-none">
                                <div className="flex gap-1.5 opacity-70">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="bg-[#1e1e1e] px-4 py-1 rounded text-[10px] text-[#999] font-sans flex items-center gap-2 w-2/3 justify-center border border-[#333]">
                                        <span className="w-2 h-2 rounded-full bg-[#6a9955] animate-pulse" />
                                        localhost:3000
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 bg-[#0f0f0f]">
                                {activeTab === "preview" ? (
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        <video
                                            src={screenRecording + "#t=0.001"}
                                            controls
                                            className="w-full h-full object-cover"
                                            playsInline
                                            preload="metadata"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full p-6 font-mono text-xs text-[#d4d4d4] overflow-y-auto bg-[#1e1e1e]">
                                        <div className="mb-2 text-[#6a9955]">➜  project-root git:(main) <span className="text-[#d4d4d4]">npm run dev</span></div>
                                        <div className="mb-2">
                                            <span className="text-[#4fc1ff]">ready</span> - started server on 0.0.0.0:3000, url: http://localhost:3000
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-[#c586c0]">event</span> - compiled client and server successfully in 1241 ms (156 modules)
                                        </div>
                                        <div className="mb-2 text-[#999]">
                                            [HMR] waiting for update signal from WDS...
                                        </div>
                                        <div className="flex items-center gap-2 text-[#d4d4d4]">
                                            <span>$</span>
                                            <span className="w-2 h-4 bg-[#d4d4d4] animate-pulse" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>


                    {/* Encountered Problems (first-person) */}
                    {project.insights && project.insights.length > 0 && (
                        <section className="mb-24">
                            <div className="flex items-center gap-3 mb-8 border-b border-[#333] pb-2">
                                <Lightbulb className="w-5 h-5 text-[#dcdcaa]" />
                                <h2 className="text-lg font-bold text-[#d4d4d4] uppercase tracking-wider">Development Notes // 开发心得</h2>
                            </div>

                            <div className="space-y-6">
                                {project.insights.map((insight, idx) => {
                                    const { body, takeaway } = splitInsight(insight.content)
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                                            viewport={{ once: true }}
                                            className="bg-[#1e1e1e] rounded-lg border border-[#333] overflow-hidden transition-colors group relative"
                                        >
                                            <div
                                                className="absolute inset-0 border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity rounded-lg z-20"
                                                style={{ borderColor: theme.border }}
                                            />
                                            <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#333]">
                                                <span className="text-[#c586c0] text-xs">function</span>
                                                <span className="text-[#dcdcaa] text-xs">solveIssue_{String(idx + 1).padStart(2, '0')}</span>
                                                <span className="text-[#d4d4d4] text-xs">()</span>
                                            </div>

                                            <div className="p-6">
                                                {/* Comment-style header */}
                                                <div className="text-[#6a9955] font-mono text-sm mb-4">
                                                    <span className="block">/**</span>
                                                    <span className="block"> * {insight.title}</span>
                                                    <span className="block"> * </span>
                                                    <span className="block"> * <span className="text-[#569cd6]">@return</span> {takeaway}</span>
                                                    <span className="block"> */</span>
                                                </div>

                                                {/* Content as code comment */}
                                                <div className="pl-4 border-l-2 border-[#333] group-hover:border-[#6a9955]/50 transition-colors">
                                                    <p className="text-[#d4d4d4] leading-relaxed text-sm font-mono">
                                                        {body}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </section>
                    )}



                    {/* Development Roadmap (Checklist) - Moved to bottom */}
                    <section className="mt-24 pt-12 border-t border-[#333]">
                        <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-2">
                            <Coffee className="w-5 h-5 text-[#ce9178]" />
                            <h2 className="text-lg font-bold text-[#d4d4d4] uppercase tracking-wider">Development Log // 开发日志 & 未来展望</h2>
                        </div>

                        <div className="bg-[#1e1e1e] rounded-lg border border-[#333] p-8 space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <Cpu className="w-40 h-40 text-white" />
                            </div>
                            {project.hobby?.devLog.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group relative z-10">
                                    {item.status === "done" ? (
                                        <CheckCircle2 className="w-5 h-5 text-[#6a9955]" />
                                    ) : item.status === "active" ? (
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            <div
                                                className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin"
                                                style={{ borderColor: theme.primary, borderTopColor: 'transparent' }}
                                            />
                                        </div>
                                    ) : (
                                        <Circle className="w-5 h-5 text-[#444]" />
                                    )}
                                    <span className={`font-mono text-sm ${item.status === "done" ? "text-[#666] line-through decoration-[#666]" : "text-[#d4d4d4]"}`}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>

        </div>
    )
}
