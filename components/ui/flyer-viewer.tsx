"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ZoomIn, ZoomOut, Move } from "lucide-react"

export function FlyerViewer({ src, alt }: { src: string; alt: string }) {
    const [isZoomed, setIsZoomed] = useState(false)

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <motion.div
                className={`relative ${isZoomed ? "cursor-grab active:cursor-grabbing touch-none" : "cursor-zoom-in"} flex items-center justify-center`}
                onClick={() => setIsZoomed(!isZoomed)}
                initial={false}
                animate={{
                    scale: isZoomed ? 2.5 : 1,
                    x: 0,
                    y: 0
                }}
                drag={isZoomed}
                dragConstraints={{ left: -1000, right: 1000, top: -800, bottom: 800 }}
                dragElastic={0.1}
                dragMomentum={true}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[100dvh] w-auto h-auto object-contain shadow-2xl select-none"
                    draggable={false}
                />

                {/* Hint Overlay */}
                <div className={`absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm pointer-events-none transition-opacity duration-300 flex items-center gap-2 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                    <ZoomIn className="w-3 h-3" />
                    Clique para ampliar
                </div>
            </motion.div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-50">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsZoomed(!isZoomed)
                    }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-full transition-all hover:scale-110"
                >
                    {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>
            </div>
        </div>
    )
}
