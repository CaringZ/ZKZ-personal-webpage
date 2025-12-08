"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import ReactDOM from "react-dom"
import { ArrowRight, ArrowLeftRight, Maximize2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ComparisonSliderProps {
    beforeImage: string
    afterImage: string
    beforeLabel?: string
    afterLabel?: string
    isFullscreen?: boolean
}

export function ComparisonSlider({
    beforeImage,
    afterImage,
    beforeLabel = "BEFORE",
    afterLabel = "AFTER",
    isFullscreen = false
}: ComparisonSliderProps) {
    const [isResizing, setIsResizing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

    // Prevent scrolling when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const width = rect.width
        const newPosition = Math.min(Math.max((x / width) * 100, 0), 100)

        setPosition(newPosition)
    }, [])

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing) return
        e.preventDefault()
        handleMove(e.clientX)
    }, [isResizing, handleMove])

    const onMouseUp = useCallback(() => {
        setIsResizing(false)
    }, [])

    const onTouchMove = useCallback((e: TouchEvent) => {
        if (!isResizing) return
        handleMove(e.touches[0].clientX)
    }, [isResizing, handleMove])

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", onMouseMove)
            window.addEventListener("mouseup", onMouseUp)
            window.addEventListener("touchmove", onTouchMove)
            window.addEventListener("touchend", onMouseUp)
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mouseup", onMouseUp)
            window.removeEventListener("touchmove", onTouchMove)
            window.removeEventListener("touchend", onMouseUp)
        }
    }, [isResizing, onMouseMove, onMouseUp, onTouchMove])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsResizing(true)
        handleMove(e.clientX)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsResizing(true)
        handleMove(e.touches[0].clientX)
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative select-none cursor-ew-resize overflow-hidden group",
                isFullscreen ? "w-auto h-auto inline-block" : "w-full h-full"
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* Hidden image for sizing in fullscreen mode */}
            {isFullscreen && (
                <img
                    src={afterImage}
                    alt=""
                    className="max-w-[90vw] max-h-[85vh] opacity-0 pointer-events-none"
                />
            )}

            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center bg-[#0f0f0f]">
                    {/* Placeholder for After Image if URL is a placeholder */}
                    {afterImage.startsWith("ASSET_SLOT") ? (
                        <div className="flex flex-col items-center justify-center text-emerald-500/20">
                            <span className="font-mono text-lg mb-2">{afterLabel}</span>
                            <span className="text-xs border border-emerald-900/50 px-2 py-1 rounded bg-black/50">{afterImage}</span>
                        </div>
                    ) : (
                        <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 w-full h-full select-none"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                    {beforeImage.startsWith("ASSET_SLOT") ? (
                        <div className="flex flex-col items-center justify-center text-emerald-500/20">
                            <span className="font-mono text-lg mb-2">{beforeLabel}</span>
                            <span className="text-xs border border-emerald-900/50 px-2 py-1 rounded bg-black/50">{beforeImage}</span>
                        </div>
                    ) : (
                        <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute inset-y-0 w-1 bg-emerald-500 cursor-ew-resize flex items-center justify-center z-20 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-shadow"
                style={{ left: `${position}%` }}
            >
                <div className="w-8 h-8 bg-[#0a0a0a] border border-emerald-500 rounded-full flex items-center justify-center shadow-lg -ml-0.5">
                    <ArrowLeftRight className="w-4 h-4 text-emerald-500" />
                </div>
            </div>

            {/* Labels (Optional overlay) */}
            <div className="absolute bottom-4 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold text-emerald-500 bg-black/80 px-2 py-1 rounded border border-emerald-500/30">{beforeLabel}</span>
            </div>
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold text-emerald-500 bg-black/80 px-2 py-1 rounded border border-emerald-500/30">{afterLabel}</span>
            </div>
            {/* Maximize Button */}
            {!isFullscreen && (
                <button
                    className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white/70 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:text-white"
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(true)
                    }}
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
            )}

            {/* Lightbox Modal */}
            {typeof document !== 'undefined' && !isFullscreen && ReactDOM.createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
                            onClick={() => setIsOpen(false)}
                        >
                            <button
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur border border-white/10 text-white/70 hover:text-white transition-colors z-50"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsOpen(false)
                                }}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ComparisonSlider
                                    beforeImage={beforeImage}
                                    afterImage={afterImage}
                                    beforeLabel={beforeLabel}
                                    afterLabel={afterLabel}
                                    isFullscreen={true}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    )
}
