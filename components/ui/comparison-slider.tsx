"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ArrowRight, ArrowLeftRight } from "lucide-react"

interface ComparisonSliderProps {
    beforeImage: string
    afterImage: string
    beforeLabel?: string
    afterLabel?: string
}

export function ComparisonSlider({
    beforeImage,
    afterImage,
    beforeLabel = "BEFORE",
    afterLabel = "AFTER"
}: ComparisonSliderProps) {
    const [isResizing, setIsResizing] = useState(false)
    const [position, setPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

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
            className="relative w-full h-full select-none cursor-ew-resize overflow-hidden group"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
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
                className="absolute inset-0 h-full overflow-hidden border-r border-emerald-500/50 bg-[#0a0a0a]"
                style={{ width: `${position}%` }}
            >
                <div className="absolute inset-0 w-full h-full">
                    {/* We need to ensure the image stays full width relative to container, not the clipped div */}
                    <div className="absolute inset-0 w-[100vw] max-w-none h-full flex items-center justify-center" style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}>
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
        </div>
    )
}
