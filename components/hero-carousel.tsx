"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Banner Data - Using the uploaded images
const BANNERS = [
    {
        id: 1,
        title: "Ofertas Imperdíveis",
        subtitle: "Qualidade e preço baixo para sua família",
        image: "/banners/Gemini_Generated_Image_whkqsvwhkqsvwhkq.png",
        cta: "Ver Encarte",
        color: "from-blue-900",
    },
    {
        id: 2,
        title: "Cartão Tricard",
        subtitle: "Facilidade e prazo para pagar suas compras",
        image: "/banners/Gemini_Generated_Image_acqx5gacqx5gacqx.png",
        cta: "Peça o Seu",
        color: "from-orange-700",
    },
    {
        id: 3,
        title: "Baixe o App",
        subtitle: "Ofertas exclusivas na palma da sua mão",
        image: "/banners/Gemini_Generated_Image_5lbwk55lbwk55lbw.png",
        cta: "Baixar Agora",
        color: "from-green-800",
    },
]

export function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    // Autoplay functionality
    useEffect(() => {
        if (!emblaApi || isPaused) return

        const autoplay = setInterval(() => {
            emblaApi.scrollNext()
        }, 5000)

        return () => clearInterval(autoplay)
    }, [emblaApi, isPaused])

    // Update selected index when carousel changes
    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    )

    return (
        <section
            className="relative w-full overflow-hidden bg-muted/20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Full Viewport Height Minus Header (88px) */}
            <div className="relative group h-[calc(100vh-88px)] w-full">
                {/* Embla Viewport */}
                <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                    <div className="flex h-full w-full touch-pan-y">
                        {BANNERS.map((banner) => (
                            <div
                                key={banner.id}
                                className="relative flex-[0_0_100%] min-w-0 h-full w-full"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    {/* Gradient Overlay for Text Readability */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-r via-black/40 to-transparent opacity-90",
                                        banner.color
                                    )} />
                                </div>

                                {/* Content Overlay - Centered Vertically */}
                                <div className="relative container mx-auto h-full flex items-center justify-center px-4 md:px-12">
                                    <div className="max-w-4xl w-full text-center md:text-left">
                                        <AnimatePresence mode="wait">
                                            {selectedIndex === BANNERS.indexOf(banner) && (
                                                <div className="space-y-8">
                                                    {/* Hero Title - Massive Scale */}
                                                    <motion.h2
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-[0.95]"
                                                    >
                                                        {banner.title}
                                                    </motion.h2>

                                                    {/* Subtitle - Larger for Full Screen */}
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                                        className="text-2xl md:text-3xl lg:text-4xl text-white/95 max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium"
                                                    >
                                                        {banner.subtitle}
                                                    </motion.p>

                                                    {/* CTA Button - Premium Scale */}
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.4, delay: 0.4 }}
                                                        className="flex justify-center md:justify-start"
                                                    >
                                                        <Button
                                                            size="lg"
                                                            className="bg-secondary hover:bg-orange-700 text-white font-bold text-xl md:text-2xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-[0_20px_70px_-10px_rgba(255,102,0,0.5)] transition-all hover:-translate-y-2 hover:scale-105 active:scale-95"
                                                        >
                                                            {banner.cta}
                                                        </Button>
                                                    </motion.div>
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ultra-Minimal Navigation Arrows - Chevron Only (Cometa Style) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 md:px-8">
                    {/* Previous Arrow */}
                    <button
                        onClick={scrollPrev}
                        className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-500 text-white hover:scale-125 active:scale-95 p-2"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="h-12 w-12 md:h-16 md:w-16" strokeWidth={1.5} />
                    </button>

                    {/* Next Arrow */}
                    <button
                        onClick={scrollNext}
                        className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-500 text-white hover:scale-125 active:scale-95 p-2"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="h-12 w-12 md:h-16 md:w-16" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Pagination Dots - Larger for Full Screen */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 pointer-events-none">
                    {BANNERS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "pointer-events-auto w-4 h-4 rounded-full transition-all duration-300 shadow-lg",
                                selectedIndex === index
                                    ? "bg-secondary scale-125 w-12"
                                    : "bg-white/40 hover:bg-white/70 hover:scale-110"
                            )}
                            aria-label={`Ir para slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
