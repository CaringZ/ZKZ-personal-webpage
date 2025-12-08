"use client"

import * as React from "react"
import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageLightboxProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    variant?: "default" | "emerald" | "blue" | "warm" | "orange" | "purple"
    className?: string
}

export function ImageLightbox({
    src,
    alt,
    variant = "default",
    className,
    ...props
}: ImageLightboxProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    // Prevent scrolling when lightbox is open
    React.useEffect(() => {
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
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    const variants = {
        default: {
            overlay: "bg-black/90",
            close: "text-white hover:text-white/80",
            border: "border-white/10"
        },
        emerald: {
            overlay: "bg-black/90 backdrop-blur-sm",
            close: "text-emerald-400 hover:text-emerald-300",
            border: "border-emerald-500/20"
        },
        blue: {
            overlay: "bg-slate-950/90 backdrop-blur-sm",
            close: "text-blue-400 hover:text-blue-300",
            border: "border-blue-500/20"
        },
        warm: {
            overlay: "bg-stone-950/90 backdrop-blur-sm",
            close: "text-orange-400 hover:text-orange-300",
            border: "border-orange-500/20"
        },
        orange: {
            overlay: "bg-black/90 backdrop-blur-sm",
            close: "text-orange-400 hover:text-orange-300",
            border: "border-orange-500/20"
        },
        purple: {
            overlay: "bg-black/90 backdrop-blur-sm",
            close: "text-purple-400 hover:text-purple-300",
            border: "border-purple-500/20"
        }
    }

    const currentVariant = variants[variant]

    return (
        <>
            <div
                className={cn(
                    "relative group cursor-zoom-in overflow-hidden",
                    className
                )}
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={src}
                    alt={alt}
                    draggable={false}
                    className={cn("w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none")}
                    {...props}
                />

            </div>

            {typeof document !== 'undefined' && ReactDOM.createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={cn("fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10", currentVariant.overlay)}
                            onClick={() => setIsOpen(false)}
                        >
                            <button
                                className={cn("absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur border transition-colors z-50", currentVariant.close, currentVariant.border)}
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
                                className="relative max-w-full max-h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={src}
                                    alt={alt}
                                    draggable={false}
                                    className={cn(
                                        "max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none border",
                                        currentVariant.border
                                    )}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}
