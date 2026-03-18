"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlyerViewer } from "@/components/ui/flyer-viewer"

// Categorias organizadas seguindo Miller's Law (5-7 itens máximo)
const categories = [
  { id: "geral", label: "Ofertas Gerais", badge: "Válido até 15/02", featured: true },
  { id: "clube", label: "Clube de Vantagens", badge: "Exclusivo", featured: false },
]

// Encartes reais da pasta public/encartes
const flyers = {
  geral: [
    { id: 1, title: "Encarte Geral - Página 1", image: "/encartes/encarte 1.jpeg", validUntil: "15/02/2026", pages: 4 },
    { id: 2, title: "Encarte Geral - Página 2", image: "/encartes/encarte 1 pagina2.jpeg", validUntil: "15/02/2026", pages: 4 },
    { id: 3, title: "Encarte Geral - Página 3", image: "/encartes/encarte 1 pagina3.jpeg", validUntil: "15/02/2026", pages: 4 },
    { id: 4, title: "Encarte Geral - Página 4", image: "/encartes/encarte 1 pagina4.jpeg", validUntil: "15/02/2026", pages: 4 },
  ],
  clube: [
    { id: 5, title: "Clube de Vantagens - Página 1", image: "/encartes/encarte clube.jpeg", validUntil: "28/02/2026", pages: 3 },
    { id: 6, title: "Clube de Vantagens - Página 2", image: "/encartes/encarte clube pagina2.jpeg", validUntil: "28/02/2026", pages: 3 },
    { id: 7, title: "Clube de Vantagens - Página 3", image: "/encartes/encarte clube pagina3.jpeg", validUntil: "28/02/2026", pages: 3 },
  ],
}

export function EncartesPage() {
  const [activeCategory, setActiveCategory] = useState("geral")
  const [selectedFlyer, setSelectedFlyer] = useState<typeof flyers.geral[0] | null>(null)

  const currentFlyers = flyers[activeCategory as keyof typeof flyers]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Encartes da Semana</h1>
          <p className="text-muted-foreground">Confira nossas ofertas e economize nas suas compras</p>
        </div>

        {/* Category Tabs - Aplicando Von Restorff Effect e Fitts' Law */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 min-h-[48px] ${activeCategory === category.id
                ? category.featured
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105"
                  : "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-card-foreground hover:bg-muted hover:scale-102 shadow-sm"
                }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === category.id
                  ? "bg-white/20 text-white"
                  : "bg-muted-foreground/20 text-muted-foreground"
                  }`}>
                  {category.badge}
                </span>
              </div>
              {/* Featured indicator - Von Restorff Effect */}
              {category.featured && (
                <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                  Novo
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Flyers Grid - Aplicando Aesthetic-Usability Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentFlyers.map((flyer, index) => (
              <motion.div
                key={flyer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedFlyer(flyer)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={flyer.image || "/placeholder.svg"}
                    alt={flyer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Page indicator - Top right */}
                  <div className="absolute top-3 right-3 bg-primary/95 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                    Página {flyer.id - (activeCategory === 'geral' ? 0 : 4)} de {flyer.pages}
                  </div>

                  {/* Content overlay - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{flyer.title}</h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>Válido até {flyer.validUntil}</span>
                    </div>
                  </div>

                  {/* Zoom icon - Appears on hover - Fitts' Law (larger target) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 text-primary p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-2xl">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Modal - Premium Experience */}
        <AnimatePresence>
          {selectedFlyer && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black flex items-center justify-center p-0 md:p-8"
              onClick={(e) => {
                e.stopPropagation()
                // Toggle UI visibility or Zoom could go here
              }}
            >
              {/* --- IMMERSIVE MOBILE-FIRST MODAL --- */}
              {/* 1. Top Gradient Overlay (Always readable text) */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-40 pointer-events-none" />

              {/* 2. Header UI */}
              <div className="absolute top-0 left-0 right-0 p-4 z-50 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col items-start gap-0.5 pointer-events-auto">
                  <h3 className="text-white font-bold text-lg drop-shadow-md">{selectedFlyer.title}</h3>
                  <p className="text-white/80 text-xs font-medium drop-shadow-md flex items-center gap-2">
                    <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                      {selectedFlyer.id - (activeCategory === 'geral' ? 0 : 4)} / {selectedFlyer.pages}
                    </span>
                    <span>Válido até {selectedFlyer.validUntil}</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedFlyer(null)}
                  className="pointer-events-auto bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full border border-white/10 transition-all active:scale-95"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* 3. Main Gesture Area */}
              <div className="relative w-full h-full flex items-center justify-center touch-none">
                <FlyerViewer
                  src={selectedFlyer.image || "/placeholder.svg"}
                  alt={selectedFlyer.title}
                />

                {/* Desktop Navigation Arrows (Hidden on Mobile) */}
                <div className="hidden md:flex absolute inset-x-4 justify-between pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = currentFlyers.findIndex(f => f.id === selectedFlyer.id)
                      const prevIndex = (currentIndex - 1 + currentFlyers.length) % currentFlyers.length
                      setSelectedFlyer(currentFlyers[prevIndex])
                    }}
                    className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full text-white hover:scale-110 transition-all"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = currentFlyers.findIndex(f => f.id === selectedFlyer.id)
                      const nextIndex = (currentIndex + 1) % currentFlyers.length
                      setSelectedFlyer(currentFlyers[nextIndex])
                    }}
                    className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full text-white hover:scale-110 transition-all"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </div>
              </div>

              {/* 4. Bottom Gradient & Controls */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-40 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 z-50 p-4 flex flex-col gap-4 pointer-events-none">
                {/* Mobile Nav & Page Indicator */}
                <div className="md:hidden flex items-center justify-between pointer-events-auto px-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = currentFlyers.findIndex(f => f.id === selectedFlyer.id)
                      const prevIndex = (currentIndex - 1 + currentFlyers.length) % currentFlyers.length
                      setSelectedFlyer(currentFlyers[prevIndex])
                    }}
                    className="p-3 text-white/80 active:text-white"
                  >
                    <ChevronLeft className="h-8 w-8 drop-shadow-md" />
                  </button>

                  <span className="text-white/60 text-xs font-medium uppercase tracking-widest">
                    Deslize para navegar
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = currentFlyers.findIndex(f => f.id === selectedFlyer.id)
                      const nextIndex = (currentIndex + 1) % currentFlyers.length
                      setSelectedFlyer(currentFlyers[nextIndex])
                    }}
                    className="p-3 text-white/80 active:text-white"
                  >
                    <ChevronRight className="h-8 w-8 drop-shadow-md" />
                  </button>
                </div>

                {/* Thumbnails - Glassmorphism Dock */}
                <div className="hidden md:flex justify-center pointer-events-auto pb-4">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2">
                    {currentFlyers.map((flyer) => (
                      <button
                        key={flyer.id}
                        onClick={() => setSelectedFlyer(flyer)}
                        className={`relative h-16 w-12 rounded-lg overflow-hidden transition-all ${selectedFlyer.id === flyer.id
                          ? 'ring-2 ring-primary scale-110 opacity-100'
                          : 'opacity-50 hover:opacity-80'
                          }`}
                      >
                        <img src={flyer.image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Download CTA */}
        <div className="mt-12 text-center">
          <div className="bg-primary rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Receba nossos encartes por WhatsApp!
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Cadastre-se e receba as ofertas diretamente no seu celular
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
            >
              Quero Receber Ofertas
            </Button>
          </div>
        </div>
      </div>
    </div >
  )
}
