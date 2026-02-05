"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "hortifruti", label: "Hortifruti", badge: "Seg & Ter" },
  { id: "acougue", label: "Açougue", badge: "Qua & Qui" },
  { id: "fimdesemana", label: "Fim de Semana", badge: "Sex - Dom" },
  { id: "mensal", label: "Mensal", badge: "Válido até 28/02" },
]

const flyers = {
  hortifruti: [
    { id: 1, title: "Hortifruti em Oferta", image: "/images/banner-sorteio.jpg", validUntil: "Terça-feira" },
    { id: 2, title: "Frutas da Estação", image: "/images/banner-app.jpg", validUntil: "Terça-feira" },
  ],
  acougue: [
    { id: 3, title: "Carnes Selecionadas", image: "/images/banner-tricard.jpg", validUntil: "Quinta-feira" },
    { id: 4, title: "Churrasco Completo", image: "/images/banner-sorteio.jpg", validUntil: "Quinta-feira" },
  ],
  fimdesemana: [
    { id: 5, title: "Super Fim de Semana", image: "/images/banner-app.jpg", validUntil: "Domingo" },
    { id: 6, title: "Ofertas Especiais", image: "/images/banner-tricard.jpg", validUntil: "Domingo" },
  ],
  mensal: [
    { id: 7, title: "Encarte Mensal", image: "/images/banner-sorteio.jpg", validUntil: "28/02/2026" },
    { id: 8, title: "Promoções do Mês", image: "/images/banner-app.jpg", validUntil: "28/02/2026" },
  ],
}

export function EncartesPage() {
  const [activeCategory, setActiveCategory] = useState("hortifruti")
  const [selectedFlyer, setSelectedFlyer] = useState<typeof flyers.hortifruti[0] | null>(null)

  const currentFlyers = flyers[activeCategory as keyof typeof flyers]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Encartes da Semana</h1>
          <p className="text-muted-foreground">Confira nossas ofertas e economize nas suas compras</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              {category.label}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                activeCategory === category.id
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}>
                {category.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Flyers Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentFlyers.map((flyer, index) => (
              <motion.div
                key={flyer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedFlyer(flyer)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={flyer.image || "/placeholder.svg"}
                    alt={flyer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{flyer.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Válido até {flyer.validUntil}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedFlyer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedFlyer(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedFlyer(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors z-10"
                  aria-label="Fechar"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
                <img
                  src={selectedFlyer.image || "/placeholder.svg"}
                  alt={selectedFlyer.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedFlyer.title}</h2>
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="h-5 w-5" />
                    <span>Válido até {selectedFlyer.validUntil}</span>
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const currentIndex = currentFlyers.findIndex(f => f.id === selectedFlyer.id)
                    const prevIndex = (currentIndex - 1 + currentFlyers.length) % currentFlyers.length
                    setSelectedFlyer(currentFlyers[prevIndex])
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const currentIndex = currentFlyers.findIndex(f => f.id === selectedFlyer.id)
                    const nextIndex = (currentIndex + 1) % currentFlyers.length
                    setSelectedFlyer(currentFlyers[nextIndex])
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors"
                  aria-label="Próximo"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </motion.div>
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
    </div>
  )
}
