"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { type Project } from "@/lib/projects-data"
import { MatureProjectTheme } from "@/components/projects/mature-theme"
import { PluginProjectTheme } from "@/components/projects/plugin-theme"
import { PluginThemeLora } from "@/components/projects/plugin-theme-lora"
import { PluginThemeBlender } from "@/components/projects/plugin-theme-blender"
import { HobbyProjectTheme } from "@/components/projects/hobby-theme"

interface ProjectDetailClientProps {
    project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Link
                href="/showcase"
                className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>返回项目展示</span>
            </Link>

            <AnimatePresence mode="wait">
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {project.type === "mature" && <MatureProjectTheme project={project} />}
                    {project.type === "plugin" && project.id === "plugin-3" ? (
                        <PluginThemeLora project={project} />
                    ) : project.type === "plugin" && project.id === "plugin-4" ? (
                        <PluginThemeBlender project={project} />
                    ) : project.type === "plugin" ? (
                        <PluginProjectTheme project={project} />
                    ) : null}
                    {project.type === "hobby" && <HobbyProjectTheme project={project} />}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
