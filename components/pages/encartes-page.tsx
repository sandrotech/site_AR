"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, ChevronRight, ChevronLeft, Bell, Sparkles } from "lucide-react"
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

// ─── Minimal Zoom Viewer ───────────────────────────────────────────────────────
// Mouse wheel zoom (desktop) + pinch-to-zoom (mobile) + drag when zoomed

function ZoomImage({ src, alt, onClose, leftNode, rightNode, closeNode }: { src: string; alt: string; onClose: () => void; leftNode?: React.ReactNode; rightNode?: React.ReactNode; closeNode?: React.ReactNode }) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const posRef = useRef({ x: 0, y: 0 })
  const lastDist = useRef<number | null>(null)
  const dragging = useRef(false)
  const lastTouch = useRef({ x: 0, y: 0 })
  const lastMouse = useRef({ x: 0, y: 0 })
  const isDragClick = useRef(false)

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

  const applyScale = useCallback((next: number) => {
    const s = clamp(next, 1, 3) // Restricted max zoom to 3x
    scaleRef.current = s
    setScale(s)
    if (s === 1) { posRef.current = { x: 0, y: 0 }; setPos({ x: 0, y: 0 }) }
  }, [])

  // ── Mouse wheel ────────────────────────────────────────────────────────────
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.15 : -0.15
    applyScale(scaleRef.current + delta)
  }, [applyScale])

  // ── Mouse drag ─────────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragClick.current = false
    if (scaleRef.current <= 1) return
    dragging.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return
    isDragClick.current = true
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    posRef.current = { x: posRef.current.x + dx, y: posRef.current.y + dy }
    setPos({ ...posRef.current })
  }, [])

  const onMouseUp = useCallback(() => { dragging.current = false }, [])

  // ── Touch pinch ────────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastDist.current = Math.hypot(dx, dy)
    } else if (e.touches.length === 1 && scaleRef.current > 1) {
      dragging.current = true
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 2 && lastDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const ratio = dist / lastDist.current
      lastDist.current = dist
      applyScale(scaleRef.current * ratio)
    } else if (e.touches.length === 1 && dragging.current) {
      const dx = e.touches[0].clientX - lastTouch.current.x
      const dy = e.touches[0].clientY - lastTouch.current.y
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      posRef.current = { x: posRef.current.x + dx, y: posRef.current.y + dy }
      setPos({ ...posRef.current })
    }
  }, [applyScale])

  const onTouchEnd = useCallback(() => {
    lastDist.current = null
    dragging.current = false
    if (scaleRef.current <= 1) { posRef.current = { x: 0, y: 0 }; setPos({ x: 0, y: 0 }) }
  }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        background: "transparent",
        overflow: "hidden",
        cursor: scale > 1 ? (dragging.current ? "grabbing" : "grab") : "default",
        touchAction: "none",
        userSelect: "none",
      }}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDragClick.current) {
          onClose()
        }
      }}
    >
      {leftNode}
      <div style={{ position: "relative", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            maxWidth: "calc(100vw - 200px)", // Leaves room for 64px buttons + gaps
            maxHeight: "90vh", // Using 90vh to ensure it respects viewport height precisely
            objectFit: "contain",
            display: "block",
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: dragging.current ? "none" : "transform 0.12s ease-out",
            transformOrigin: "center center",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {closeNode}
      </div>
      {rightNode}
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

  const currentIndex = selected ? currentFlyers.findIndex(f => f.id === selected.id) : -1
  const hasNext = currentIndex >= 0 && currentIndex < currentFlyers.length - 1
  const hasPrev = currentIndex > 0

  const close = useCallback(() => setSelected(null), [])
  const goNext = useCallback(() => { if (hasNext) setSelected(currentFlyers[currentIndex + 1]) }, [hasNext, currentIndex, currentFlyers])
  const goPrev = useCallback(() => { if (hasPrev) setSelected(currentFlyers[currentIndex - 1]) }, [hasPrev, currentIndex, currentFlyers])

  // Escape key (moved mostly to Portal, but kept here just in case)
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

      {/* Modal rendered via portal to escape PageTransition stacking context */}
      <ViewerPortal
        selected={selected}
        currentLabel={currentLabel}
        onClose={close}
        onNext={goNext}
        onPrev={goPrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </>
  )
}

// ─── Portal wrapper — escapes PageTransition filter/transform stacking context ─

function ViewerPortal({
  selected,
  currentLabel,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  selected: Flyer | null
  currentLabel: string
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") onNext()
      else if (e.key === "ArrowLeft") onPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, onNext, onPrev])

  if (!mounted || typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {selected && (
        <motion.div
          key="viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Full-area zoom image with adjacent navigation nodes */}
          <div style={{ position: "absolute", inset: 0 }}>
            <ZoomImage 
              src={selected.image} 
              alt={`${currentLabel} — ${selected.title}`} 
              onClose={onClose} 
              leftNode={
                hasPrev ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    aria-label="Página anterior"
                    style={{
                      pointerEvents: "auto",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.55)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      zIndex: 10,
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.85)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
                  >
                    <ChevronLeft style={{ width: 40, height: 40, color: "#fff" }} />
                  </button>
                ) : <div style={{ width: 64, flexShrink: 0 }} />
              }
              rightNode={
                hasNext ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    aria-label="Próxima página"
                    style={{
                      pointerEvents: "auto",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.55)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      zIndex: 10,
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.85)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
                  >
                    <ChevronRight style={{ width: 40, height: 40, color: "#fff" }} />
                  </button>
                ) : <div style={{ width: 64, flexShrink: 0 }} />
              }
              closeNode={
                <button
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  aria-label="Fechar (ESC)"
                  style={{
                    position: "absolute",
                    top: -16,
                    right: -16,
                    zIndex: 20,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.15s",
                    pointerEvents: "auto",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.85)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
                >
                  <X style={{ width: 20, height: 20, color: "#fff" }} />
                </button>
              }
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
