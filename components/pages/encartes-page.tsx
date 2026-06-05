"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Download, Eye, LayoutGrid, Bell, ChevronRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

// Categorias organizadas (Miller's Law)
const categories = [
  { id: "geral", label: "Ofertas Gerais", badge: "Válido até 15/02" },
  { id: "clube", label: "Clube de Vantagens", badge: "Exclusivo" },
]

// Encartes
const flyers = {
  geral: [
    { id: 1, title: "Encarte Geral - Página 1", image: "/encartes/encarte 1.jpeg", validUntil: "15/02/2026" },
    { id: 2, title: "Encarte Geral - Página 2", image: "/encartes/encarte 1 pagina2.jpeg", validUntil: "15/02/2026" },
    { id: 3, title: "Encarte Geral - Página 3", image: "/encartes/encarte 1 pagina3.jpeg", validUntil: "15/02/2026" },
    { id: 4, title: "Encarte Geral - Página 4", image: "/encartes/encarte 1 pagina4.jpeg", validUntil: "15/02/2026" },
  ],
  clube: [
    { id: 5, title: "Clube de Vantagens - Página 1", image: "/encartes/encarte clube.jpeg", validUntil: "28/02/2026" },
    { id: 6, title: "Clube de Vantagens - Página 2", image: "/encartes/encarte clube pagina2.jpeg", validUntil: "28/02/2026" },
    { id: 7, title: "Clube de Vantagens - Página 3", image: "/encartes/encarte clube pagina3.jpeg", validUntil: "28/02/2026" },
  ],
}

export function EncartesPage() {
  const [activeCategory, setActiveCategory] = useState("geral")
  const [selectedFlyer, setSelectedFlyer] = useState<any>(null)
  const [viewerOpen, setViewerOpen] = useState(false)

  const filteredFlyers = flyers[activeCategory as keyof typeof flyers] || []

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 pb-16">
      
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-slate-900 pt-32 pb-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold tracking-widest uppercase mb-4 border border-secondary/30">
                <ShieldCheck className="w-3.5 h-3.5" /> Economia Garantida
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
                Nossos <span className="text-secondary italic">Encartes</span>
              </h1>
              <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
                As melhores ofertas de hortifruti, açougue, mercearia e muito mais. Preços baixos atualizados diretamente no seu celular.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loss Aversion VIP Banner (Top - Primacy Effect) removed as requested */}

      {/* Main Content Area */}
      <main className="container mx-auto px-4 mt-10">
        
        {/* Category Navigation (Hick's / Miller's Law) */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 border border-slate-200/60 max-w-md w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[48px]",
                  activeCategory === cat.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <span>{cat.label}</span>
                <span className={cn(
                  "text-[10px] font-medium opacity-80",
                  activeCategory === cat.id ? "text-primary/70" : "text-slate-400"
                )}>
                  {cat.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Flyers Grid - Highly Responsive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredFlyers.map((flyer, index) => (
              <motion.div
                key={flyer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => { setSelectedFlyer(flyer); setViewerOpen(true); }}
              >
                {/* Image Aspect ratio container for flyers */}
                <div className="relative aspect-[3/4.2] w-full bg-slate-50 overflow-hidden">
                  <Image
                    src={flyer.image}
                    alt={flyer.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-640px) 100vw, (max-w-768px) 50vw, (max-w-1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Calendar Validity badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    Até {flyer.validUntil}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-extrabold text-slate-850 group-hover:text-primary transition-colors text-base line-clamp-1">
                    {flyer.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Clique para abrir</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                      <Eye className="w-3.5 h-3.5" /> Ver Encarte
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Loss Aversion VIP Section (Bottom - Recency Effect) */}
      <section className="container mx-auto px-4 mt-20">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-8 md:p-12 shadow-2xl border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-80" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
              Garanta os melhores preços antes de todo mundo!
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 leading-relaxed">
              Assine nosso grupo VIP no WhatsApp. Os encartes e descontos mais urgentes são disparados lá antes mesmo de irem ao ar. Economize tempo e dinheiro sem perder nenhuma oferta!
            </p>
            <Button
              onClick={() => window.open("https://wa.me/5585982075102", "_blank")}
              className="w-full sm:w-auto px-4 sm:px-8 py-4 h-auto bg-secondary hover:bg-secondary/90 text-primary font-black rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-secondary/15 transition-all hover:scale-102 min-h-[48px] whitespace-normal text-center"
            >
              <span>Entrar no Grupo de Ofertas VIP</span>
              <ChevronRight className="w-5 h-5 shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Zoom Viewer Modal */}
      <AnimatePresence>
        {viewerOpen && selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-md"
            onClick={() => setViewerOpen(false)}
          >
            {/* Modal Header */}
            <div 
              className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 text-white relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="font-extrabold text-base md:text-lg line-clamp-1">{selectedFlyer.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-secondary" /> Válido até {selectedFlyer.validUntil}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors min-h-[48px] min-w-[48px]"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = selectedFlyer.image;
                    link.download = `${selectedFlyer.title}.jpg`;
                    link.click();
                  }}
                  title="Baixar Encarte"
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => setViewerOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-850 hover:bg-red-600 hover:text-white text-slate-300 transition-colors min-h-[48px] min-w-[48px]"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Modal Body / Viewer */}
            <div 
              className="flex-1 relative overflow-hidden flex items-center justify-center p-2 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <TransformWrapper
                initialScale={1}
                minScale={0.8}
                maxScale={5}
                centerOnInit
              >
                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                  <div className="relative max-w-full max-h-[80vh] shadow-2xl rounded-lg overflow-hidden bg-slate-900">
                    <img
                      src={selectedFlyer.image}
                      alt={selectedFlyer.title}
                      className="max-w-full max-h-[80vh] object-contain block mx-auto"
                    />
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>

            {/* VIP CTA inside Viewer (Peak-End / Post-interaction Delight) */}
            <div 
              className="p-4 border-t border-slate-800 bg-slate-900 text-center flex flex-col sm:flex-row items-center justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs md:text-sm text-slate-400 text-left">
                Gostou das ofertas? <strong>Entre no grupo VIP</strong> e receba os próximos encartes direto no WhatsApp!
              </p>
              <Button
                onClick={() => window.open("https://wa.me/5585982075102", "_blank")}
                className="w-full sm:w-auto h-11 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-md min-h-[48px]"
              >
                Receber no WhatsApp
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
