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
            {/* Banner Container */}
            {/* Full viewport height to ensure the banner is the sole focus initially, starting behind the header */}
            <div className="relative group w-full h-[100vh] min-h-[600px]">
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
                                        "absolute inset-0 bg-linear-to-r via-black/40 to-transparent opacity-90",
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

                {/* Buttons Controls */}
                {BANNERS.length > 1 && (
                    <>
                        <button
                            onClick={scrollPrev}
                            className="absolute top-1/2 -translate-y-1/2 left-2 md:left-10 z-20 text-white/70 hover:text-white transition-colors text-4xl md:text-8xl drop-shadow-lg"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-[1em] h-[1em]" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute top-1/2 -translate-y-1/2 right-2 md:right-10 z-20 text-white/70 hover:text-white transition-colors text-4xl md:text-8xl drop-shadow-lg"
                            aria-label="Próximo"
                        >
                            <ChevronRight className="w-[1em] h-[1em]" />
                        </button>
                    </>
                )}
                {/* Bullets/Dots Navigation - Inside banner over image */}
                {BANNERS.length > 1 && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-30">
                        {BANNERS.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => scrollTo(index)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    scale: selectedIndex === index ? 1.3 : 1,
                                    backgroundColor:
                                        selectedIndex === index
                                            ? "var(--color-secondary)" // Active: Ana Risorlange Secondary/Orange
                                            : "rgba(255, 255, 255, 0.4)", // Inactive: Transparent White
                                    boxShadow: selectedIndex === index ? "0px 0px 8px rgba(255, 102, 0, 0.5)" : "none",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-300 cursor-pointer"
                                aria-label={`Ir para slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
