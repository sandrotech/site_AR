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
            <div className="relative group h-[28rem] md:h-[34rem] lg:h-[40rem] w-full">
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

                                {/* Content Overlay */}
                                <div className="relative container mx-auto h-full flex items-center px-4 md:px-12">
                                    <div className="max-w-2xl w-full">
                                        <AnimatePresence mode="wait">
                                            {selectedIndex === BANNERS.indexOf(banner) && (
                                                <div className="space-y-6">
                                                    {/* Staggered Text Reveal */}
                                                    <motion.h2
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                                                    >
                                                        {banner.title}
                                                    </motion.h2>

                                                    <motion.p
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                                        className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
                                                    >
                                                        {banner.subtitle}
                                                    </motion.p>

                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.4, delay: 0.4 }}
                                                    >
                                                        <Button
                                                            size="lg"
                                                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
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

                {/* Navigation Arrows - Visible on Hover (Desktop) / Always (Mobile) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 md:px-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="pointer-events-auto h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className="h-8 w-8" />
                        <span className="sr-only">Anterior</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="pointer-events-auto h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="h-8 w-8" />
                        <span className="sr-only">Próximo</span>
                    </Button>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 pointer-events-none">
                    {BANNERS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "pointer-events-auto w-3 h-3 rounded-full transition-all duration-300 shadow-sm",
                                selectedIndex === index
                                    ? "bg-white scale-125 w-8"
                                    : "bg-white/40 hover:bg-white/60"
                            )}
                            aria-label={`Ir para slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
