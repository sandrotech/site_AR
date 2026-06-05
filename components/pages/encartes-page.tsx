"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Calendar, Download, ChevronRight, ZoomIn, ZoomOut,
  RotateCcw, Bell, Bookmark, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types & Data ──────────────────────────────────────────────────────────────

type Flyer = { id: number; title: string; image: string; validUntil: string }

const categories = [
  { id: "geral", label: "Ofertas Gerais", badge: "Válido até 15/02" },
  { id: "clube", label: "Clube de Vantagens", badge: "Exclusivo" },
]

const flyers: Record<string, Flyer[]> = {
  geral: [
    { id: 1, title: "Página 1", image: "/encartes/encarte 1.jpeg", validUntil: "15/02/2026" },
    { id: 2, title: "Página 2", image: "/encartes/encarte 1 pagina2.jpeg", validUntil: "15/02/2026" },
    { id: 3, title: "Página 3", image: "/encartes/encarte 1 pagina3.jpeg", validUntil: "15/02/2026" },
    { id: 4, title: "Página 4", image: "/encartes/encarte 1 pagina4.jpeg", validUntil: "15/02/2026" },
  ],
  clube: [
    { id: 5, title: "Página 1", image: "/encartes/encarte clube.jpeg", validUntil: "28/02/2026" },
    { id: 6, title: "Página 2", image: "/encartes/encarte clube pagina2.jpeg", validUntil: "28/02/2026" },
    { id: 7, title: "Página 3", image: "/encartes/encarte clube pagina3.jpeg", validUntil: "28/02/2026" },
  ],
}

// ─── Pinch-to-Zoom Viewer ─────────────────────────────────────────────────────

function PinchViewer({ src, alt }: { src: string; alt: string }) {
  const [scale, setScale] = useState(1)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const lastDist = useRef<number | null>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const lastTouch = useRef({ x: 0, y: 0 })

  const reset = () => { setScale(1); setOrigin({ x: 0, y: 0 }) }

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastDist.current = Math.hypot(dx, dy)
    } else if (e.touches.length === 1 && scale > 1) {
      dragging.current = true
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }, [scale])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 2 && lastDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const ratio = dist / lastDist.current
      lastDist.current = dist
      setScale(s => clamp(s * ratio, 1, 5))
    } else if (e.touches.length === 1 && dragging.current) {
      const dx = e.touches[0].clientX - lastTouch.current.x
      const dy = e.touches[0].clientY - lastTouch.current.y
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      setOrigin(o => ({ x: o.x + dx, y: o.y + dy }))
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    lastDist.current = null
    dragging.current = false
    if (scale <= 1) setOrigin({ x: 0, y: 0 })
  }, [scale])

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Zoom bar */}
      <div className="flex items-center justify-center gap-4 px-4 py-2.5 bg-slate-900/90 backdrop-blur-sm shrink-0">
        <button onClick={() => setScale(s => { const n = clamp(s - 0.5, 1, 5); if (n === 1) setOrigin({ x: 0, y: 0 }); return n })}
          disabled={scale <= 1}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-all active:scale-90"
          aria-label="Diminuir">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-white text-xs font-bold tabular-nums w-12 text-center">{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale(s => clamp(s + 0.5, 1, 5))}
          disabled={scale >= 5}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-all active:scale-90"
          aria-label="Ampliar">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={reset} disabled={scale === 1}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-all active:scale-90"
          aria-label="Resetar">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <span className="text-slate-500 text-[10px] ml-1 hidden sm:inline">Pinch ou use os botões</span>
      </div>

      {/* Image container — fills ALL remaining space */}
      <div
        className="flex-1 overflow-hidden flex items-center justify-center touch-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onDoubleClick={() => scale === 1 ? setScale(2.5) : reset()}
        ref={imgRef}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="select-none pointer-events-none"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`,
            transition: dragging.current ? "none" : "transform 0.15s ease",
            transformOrigin: "center center",
          }}
        />
      </div>

      {scale === 1 && (
        <div className="py-2 text-center shrink-0">
          <span className="text-slate-600 text-[10px]">Toque 2× para ampliar • Pinche com 2 dedos</span>
        </div>
      )}
    </div>
  )
}

// ─── Flyer Card ────────────────────────────────────────────────────────────────

function FlyerCard({ flyer, index, label, onClick }: { flyer: Flyer; index: number; label: string; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow hover:shadow-xl transition-all duration-300 active:scale-[0.97] text-left w-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flyer.image}
          alt={`${label} — ${flyer.title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Validity pill — top left */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
          <Calendar className="w-3 h-3 text-orange-500 shrink-0" />
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-wide">Até {flyer.validUntil}</span>
        </div>

        {/* Page number — bottom right */}
        <div className="absolute bottom-2 right-2 bg-blue-700 text-white rounded-md px-2 py-0.5">
          <span className="text-[10px] font-black">{flyer.title}</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg">
            <span className="text-blue-700 font-black text-sm">Ver Encarte</span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function EncartesPage() {
  const [activeCategory, setActiveCategory] = useState("geral")
  const [selected, setSelected] = useState<Flyer | null>(null)

  const currentFlyers = flyers[activeCategory] ?? []
  const currentLabel = categories.find(c => c.id === activeCategory)?.label ?? ""

  const close = useCallback(() => setSelected(null), [])

  // Escape key
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [close])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [selected])

  return (
    <>
      {/* ─── Page content ────────────────────────────────────── */}
      <div className="min-h-screen bg-slate-50">

        {/* Hero — compact */}
        <section className="bg-blue-900 pt-24 pb-10 px-4 text-white relative overflow-hidden">
          {/* subtle pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" }}
          />
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-xs font-black uppercase tracking-widest">Economia Garantida</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3">
                Nossos <span className="text-orange-400">Encartes</span>
              </h1>
              <p className="text-blue-200 text-sm sm:text-base max-w-md leading-relaxed">
                Ofertas atualizadas de hortifruti, açougue e mercearia. Toque para abrir e dar zoom em qualquer detalhe.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main */}
        <main className="container mx-auto max-w-5xl px-4 py-8">

          {/* Category tabs */}
          <div className="flex gap-2 mb-7">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-0.5 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 border",
                  activeCategory === cat.id
                    ? "bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-700/20"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                )}
              >
                <span>{cat.label}</span>
                <span className={cn("text-[10px] font-medium",
                  activeCategory === cat.id ? "text-blue-200" : "text-slate-400"
                )}>{cat.badge}</span>
              </button>
            ))}
          </div>

          {/* Flyers grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
            >
              {currentFlyers.map((flyer, idx) => (
                <FlyerCard
                  key={flyer.id}
                  flyer={flyer}
                  index={idx}
                  label={currentLabel}
                  onClick={() => setSelected(flyer)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* VIP banner */}
          <div className="mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-2">
                <Bell className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Grupo VIP</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black mb-1 leading-snug">
                Receba os próximos encartes antes de todo mundo!
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Entre no nosso grupo do WhatsApp e fique por dentro das ofertas exclusivas.
              </p>
            </div>
            <button
              onClick={() => window.open("https://wa.me/5585982075102", "_blank")}
              className="shrink-0 flex items-center gap-2 px-5 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-orange-500/25 w-full sm:w-auto justify-center"
            >
              Entrar no Grupo VIP
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* ─── Fullscreen Modal / Viewer ───────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 flex flex-col bg-black"
            style={{ zIndex: 99999 }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-3 sm:px-5 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <Bookmark className="w-4 h-4 text-orange-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm leading-tight line-clamp-1">{currentLabel} — {selected.title}</p>
                  <p className="text-slate-400 text-[10px] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-orange-400 shrink-0" />
                    Válido até {selected.validUntil}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <button
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = selected.image
                    a.download = `encarte-${selected.id}.jpg`
                    a.click()
                  }}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all active:scale-90"
                  aria-label="Baixar"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={close}
                  className="p-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all active:scale-90 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Viewer — takes all remaining height */}
            <div className="flex-1 min-h-0">
              <PinchViewer src={selected.image} alt={`${currentLabel} — ${selected.title}`} />
            </div>

            {/* Modal footer */}
            <div className="flex flex-col xs:flex-row items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-t border-slate-800 shrink-0">
              <p className="text-slate-400 text-xs text-center xs:text-left">
                Gostou? Entre no grupo e receba os próximos encartes no WhatsApp!
              </p>
              <button
                onClick={() => window.open("https://wa.me/5585982075102", "_blank")}
                className="w-full xs:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all active:scale-95 min-h-[44px]"
              >
                Receber no WhatsApp <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
