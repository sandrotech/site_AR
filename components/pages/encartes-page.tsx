"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Download, Eye, ShieldCheck, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  { id: "geral", label: "Ofertas Gerais", badge: "Válido até 15/02" },
  { id: "clube", label: "Clube de Vantagens", badge: "Exclusivo" },
]

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

type Flyer = (typeof flyers.geral)[0]

// ─── Zoom Image Viewer ─────────────────────────────────────────────────────────

function ZoomViewer({ src, alt }: { src: string; alt: string }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 })
  const lastTouchDist = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const clampPosition = useCallback((pos: { x: number; y: number }, sc: number) => {
    if (!containerRef.current) return pos
    const el = containerRef.current
    const maxX = Math.max(0, (el.offsetWidth * sc - el.offsetWidth) / 2)
    const maxY = Math.max(0, (el.offsetHeight * sc - el.offsetHeight) / 2)
    return {
      x: Math.max(-maxX, Math.min(maxX, pos.x)),
      y: Math.max(-maxY, Math.min(maxY, pos.y)),
    }
  }, [])

  const resetView = () => { setScale(1); setPosition({ x: 0, y: 0 }) }

  const zoom = (delta: number) => {
    const next = Math.max(1, Math.min(5, scale + delta))
    setScale(next)
    if (next === 1) setPosition({ x: 0, y: 0 })
    else setPosition(p => clampPosition(p, next))
  }

  // Touch pinch-to-zoom
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastTouchDist.current = Math.hypot(dx, dy)
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true)
      dragStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        px: position.x,
        py: position.y,
      }
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist.current !== null) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const delta = (dist - lastTouchDist.current) * 0.01
      lastTouchDist.current = dist
      const next = Math.max(1, Math.min(5, scale + delta))
      setScale(next)
      if (next === 1) setPosition({ x: 0, y: 0 })
    } else if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStart.current.x
      const dy = e.touches[0].clientY - dragStart.current.y
      setPosition(clampPosition({ x: dragStart.current.px + dx, y: dragStart.current.py + dy }, scale))
    }
  }

  const onTouchEnd = () => {
    lastTouchDist.current = null
    setIsDragging(false)
  }

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, px: position.x, py: position.y }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition(clampPosition({
      x: dragStart.current.px + (e.clientX - dragStart.current.x),
      y: dragStart.current.py + (e.clientY - dragStart.current.y),
    }, scale))
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <div className="flex flex-col h-full">
      {/* Zoom Controls */}
      <div className="flex items-center justify-center gap-3 py-2 px-4 bg-slate-900/80 border-b border-slate-800">
        <button
          onClick={() => zoom(-0.5)}
          disabled={scale <= 1}
          className="p-2 rounded-lg bg-slate-800 text-white disabled:opacity-40 hover:bg-slate-700 transition-colors touch-target"
          aria-label="Diminuir zoom"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-white text-xs font-bold w-14 text-center">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => zoom(0.5)}
          disabled={scale >= 5}
          className="p-2 rounded-lg bg-slate-800 text-white disabled:opacity-40 hover:bg-slate-700 transition-colors touch-target"
          aria-label="Aumentar zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          disabled={scale === 1}
          className="p-2 rounded-lg bg-slate-800 text-white disabled:opacity-40 hover:bg-slate-700 transition-colors touch-target"
          aria-label="Resetar zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Image Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative flex items-center justify-center bg-slate-950 select-none"
        style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Double-tap to zoom */}
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.2s ease",
            transformOrigin: "center center",
          }}
          onDoubleClick={() => scale === 1 ? zoom(1.5) : resetView()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[55vh] sm:max-h-[65vh] object-contain block pointer-events-none"
            draggable={false}
          />
        </div>
        {scale === 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
            <span className="bg-black/60 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-sm">
              Toque duas vezes ou use os botões para dar zoom
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Flyer Card ────────────────────────────────────────────────────────────────

function FlyerCard({ flyer, index, onClick }: { flyer: Flyer; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-shadow duration-300 active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] w-full bg-slate-50 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flyer.image}
          alt={flyer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

        {/* Validity badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 text-slate-800 text-[10px] font-black uppercase tracking-wide shadow-sm">
          <Calendar className="w-3 h-3 text-orange-500" />
          Até {flyer.validUntil}
        </div>

        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/95 rounded-xl px-5 py-3 flex items-center gap-2 shadow-lg">
            <Eye className="w-4 h-4 text-blue-700" />
            <span className="text-sm font-bold text-blue-700">Ver Encarte</span>
          </div>
        </div>
      </div>

      <div className="p-3.5">
        <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-700 transition-colors">
          {flyer.title}
        </h3>
        <p className="text-[11px] text-slate-400 mt-1">Toque para abrir e dar zoom</p>
      </div>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function EncartesPage() {
  const [activeCategory, setActiveCategory] = useState("geral")
  const [selectedFlyer, setSelectedFlyer] = useState<Flyer | null>(null)

  const filteredFlyers = flyers[activeCategory as keyof typeof flyers] || []

  const openFlyer = (flyer: Flyer) => setSelectedFlyer(flyer)
  const closeFlyer = useCallback(() => setSelectedFlyer(null), [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeFlyer() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [closeFlyer])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedFlyer ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [selectedFlyer])

  return (
    <div className="min-h-screen bg-[#F2F4F7] text-slate-900 pb-20">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-28 pb-14 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.06) 40px, rgba(255,255,255,.06) 80px)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 border border-orange-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Economia Garantida
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-4">
              Nossos <span className="text-orange-400">Encartes</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-lg leading-relaxed">
              Ofertas de hortifruti, açougue, mercearia e mais. Preços atualizados direto no seu celular — com zoom para ver cada detalhe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Tabs ─────────────────────────────────────── */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-xl flex gap-1 border border-slate-200 shadow-sm w-full max-w-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-1 py-3 px-3 rounded-lg text-sm font-bold transition-all flex flex-col items-center gap-0.5 min-h-[52px]",
                  activeCategory === cat.id
                    ? "bg-blue-700 text-white shadow"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
              >
                <span>{cat.label}</span>
                <span className={cn("text-[10px] font-medium",
                  activeCategory === cat.id ? "text-blue-200" : "text-slate-400"
                )}>{cat.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {filteredFlyers.map((flyer, index) => (
              <FlyerCard
                key={flyer.id}
                flyer={flyer}
                index={index}
                onClick={() => openFlyer(flyer)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── VIP CTA ───────────────────────────────────────────── */}
      <section className="container mx-auto px-4 mt-16">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 to-transparent" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-xs font-black uppercase tracking-widest">Grupo VIP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-2">
                Receba os encartes antes de todo mundo!
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Entre no nosso grupo do WhatsApp e receba ofertas exclusivas no seu celular, antes mesmo de irem ao ar.
              </p>
            </div>
            <button
              onClick={() => window.open("https://wa.me/5585982075102", "_blank")}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-orange-500/20 whitespace-nowrap min-h-[52px]"
            >
              Entrar no Grupo VIP
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Viewer Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-slate-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
              <div className="min-w-0 mr-2">
                <h3 className="font-bold text-white text-sm line-clamp-1">{selectedFlyer.title}</h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-orange-400" />
                  Válido até {selectedFlyer.validUntil}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* Download */}
                <button
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = selectedFlyer.image
                    link.download = `${selectedFlyer.title}.jpg`
                    link.click()
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  aria-label="Baixar encarte"
                >
                  <Download className="w-5 h-5" />
                </button>
                {/* Close */}
                <button
                  onClick={closeFlyer}
                  className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Zoom Viewer */}
            <div className="flex-1 overflow-hidden">
              <ZoomViewer src={selectedFlyer.image} alt={selectedFlyer.title} />
            </div>

            {/* Footer CTA */}
            <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                Gostou das ofertas? Receba as próximas no WhatsApp!
              </p>
              <button
                onClick={() => window.open("https://wa.me/5585982075102", "_blank")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-all active:scale-95 min-h-[48px]"
              >
                Receber no WhatsApp
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
