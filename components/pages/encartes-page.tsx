"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { X, ZoomIn, Calendar, ChevronLeft, ChevronRight, Download, Share2, Eye, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
<<<<<<< HEAD
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
=======
import Image from "next/image"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { cn } from "@/lib/utils"

// ===== PDF.js types =====
type PdfViewport = { width: number; height: number };
type PdfPage = {
    getViewport: (opts: { scale: number }) => PdfViewport;
    render: (opts: {
        canvasContext: CanvasRenderingContext2D;
        viewport: PdfViewport;
    }) => { promise: Promise<void>; cancel: () => void };
};
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfJsLib = {
    GlobalWorkerOptions: { workerSrc: string };
    getDocument: (src: { data: ArrayBuffer | string }) => { promise: Promise<PdfDoc> };
};

declare global {
    interface Window {
        pdfjsLib?: PdfJsLib;
    }
}

// ===== Load PDF.js =====
async function ensurePdfJs(): Promise<PdfJsLib> {
    if (typeof window !== "undefined" && window.pdfjsLib) {
        return window.pdfjsLib;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";

    await new Promise<void>((res) => {
        script.onload = () => res();
        document.body.appendChild(script);
    });

    return window.pdfjsLib as PdfJsLib;
}

// ===== Mock Data =====
const categories = [
    { id: "all", label: "Todos", icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "hortifruti", label: "Hortifruti", badge: "Seg & Ter" },
    { id: "acougue", label: "Açougue", badge: "Qua & Qui" },
    { id: "fimdesemana", label: "Fim de Semana", badge: "Sex - Dom" },
    { id: "mensal", label: "Catálogo Mensal", badge: "Válido até 28/02" },
]

const flyersData = [
    { id: 1, category: "hortifruti", title: "Hortifruti em Oferta", image: "/encartes/WhatsApp Image 2026-03-11 at 14.44.31.jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 14.44.31.jpeg", validUntil: "Terça-feira", featured: true },
    { id: 2, category: "hortifruti", title: "Frutas da Estação", image: "/encartes/WhatsApp Image 2026-03-11 at 20.46.03.jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 20.46.03.jpeg", validUntil: "Terça-feira" },
    { id: 3, category: "acougue", title: "Carnes Selecionadas", image: "/encartes/WhatsApp Image 2026-03-11 at 20.46.04.jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 20.46.04.jpeg", validUntil: "Quinta-feira" },
    { id: 4, category: "acougue", title: "Churrasco Completo", image: "/encartes/WhatsApp Image 2026-03-11 at 20.46.05.jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 20.46.05.jpeg", validUntil: "Quinta-feira" },
    { id: 5, category: "fimdesemana", title: "Super Fim de Semana", image: "/encartes/WhatsApp Image 2026-03-11 at 20.46.03 (1).jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 20.46.03 (1).jpeg", validUntil: "Domingo" },
    { id: 6, category: "fimdesemana", title: "Ofertas Especiais", image: "/encartes/WhatsApp Image 2026-03-11 at 20.46.04 (1).jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 20.46.04 (1).jpeg", validUntil: "Domingo" },
    { id: 7, category: "mensal", title: "Encarte Mensal", image: "/encartes/WhatsApp Image 2026-03-11 at 20.46.05 (1).jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 20.46.05 (1).jpeg", validUntil: "28/02/2026" },
    { id: 8, category: "mensal", title: "Promoções do Mês", image: "/encartes/WhatsApp Image 2026-03-11 at 20.46.06.jpeg", pdf: "/encartes/WhatsApp Image 2026-03-11 at 20.46.06.jpeg", validUntil: "28/02/2026" },
]

// ===== Tilt Card Component =====
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = event.clientX - rect.left - width / 2;
        const mouseYFromCenter = event.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ perspective: 1000, rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("relative transition-all duration-300 ease-out", className)}
        >
            {children}
        </motion.div>
    );
}

export function EncartesPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [viewerOpen, setViewerOpen] = useState(false)
    const [selectedFlyer, setSelectedFlyer] = useState<typeof flyersData[0] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(0)
    const [rendering, setRendering] = useState(false)
>>>>>>> 2025531b5293375b1bbffd3767c5afc0671012ff

    const docRef = useRef<PdfDoc | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const renderTaskRef = useRef<{ cancel: () => void } | null>(null)

    const filteredFlyers = activeCategory === "all" 
        ? flyersData 
        : flyersData.filter(f => f.category === activeCategory)

<<<<<<< HEAD
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
=======
    // ===== PDF Rendering Logic =====
    const renderCurrentPage = useCallback(async () => {
        const doc = docRef.current;
        const canvas = canvasRef.current;
        if (!doc || !canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (renderTaskRef.current) {
            try { renderTaskRef.current.cancel(); } catch { }
        }

        setRendering(true);

        try {
            const p = await doc.getPage(page);
            const base = p.getViewport({ scale: 1 });
            const scale = Math.min(window.innerWidth * 2, 1600) / base.width;
            const viewport = p.getViewport({ scale });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const task = p.render({ canvasContext: ctx, viewport });
            renderTaskRef.current = task;
            await task.promise;
        } finally {
            setRendering(false);
        }
    }, [page]);

    useEffect(() => {
        if (!viewerOpen || !selectedFlyer?.pdf) return;
        if (!selectedFlyer.pdf.toLowerCase().endsWith(".pdf")) {
            setNumPages(1);
            setPage(1);
            setIsLoading(false);
            return;
        }

        let cancelled = false;
        setIsLoading(true);

        (async () => {
            try {
                const pdfjsLib = await ensurePdfJs();
                pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

                const res = await fetch(selectedFlyer.pdf);
                const buffer = await res.arrayBuffer();
                const task = pdfjsLib.getDocument({ data: buffer });
                const doc = await task.promise;

                if (cancelled) return;

                docRef.current = doc;
                setNumPages(doc.numPages);
                setPage(1);
            } catch (err) {
                console.error("Erro ao carregar PDF", err);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => { cancelled = true; docRef.current = null; };
    }, [viewerOpen, selectedFlyer]);

    useEffect(() => {
        if (docRef.current && viewerOpen && numPages > 0) {
            renderCurrentPage();
        }
    }, [page, numPages, viewerOpen, renderCurrentPage]);

    return (
        <div className="min-h-screen bg-[#F8F9FA] selection:bg-secondary/30">
            {/* Header Section - Asymmetric & Bold */}
            <section className="relative overflow-hidden pt-32 pb-16">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4">
                                Economia Garantida
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-primary leading-tight mb-6">
                                Nossos <span className="text-secondary italic">Encartes</span>
                            </h1>
                            <p className="text-lg text-muted-foreground/80 max-w-xl leading-relaxed">
                                Explore as ofertas exclusivas preparadas para você. Preços baixos em hortifruti, açougue e muito mais, direto no seu dispositivo.
                            </p>
                        </motion.div>
                    </div>
>>>>>>> 2025531b5293375b1bbffd3767c5afc0671012ff
                </div>
            </section>

<<<<<<< HEAD
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
=======
            {/* Content Section */}
            <main className="container mx-auto px-4 pb-24">
                {/* Category Navigation - Floating / Pill style */}
                <div className="sticky top-24 z-30 mb-12 flex justify-center">
                    <div className="bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl shadow-primary/5 border border-white flex flex-wrap gap-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2",
                                    activeCategory === cat.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                )}
                            >
                                {cat.id === "all" && cat.icon}
                                {cat.label}
                                {cat.badge && (
                                    <span className={cn(
                                        "ml-1 text-[10px] px-1.5 py-0.5 rounded-md",
                                        activeCategory === cat.id ? "bg-white/20 text-white" : "bg-secondary/10 text-secondary"
                                    )}>
                                        {cat.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Flyers Staggered Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {filteredFlyers.map((flyer, idx) => (
                            <motion.div
                                key={flyer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={cn(
                                    "group cursor-pointer",
                                    flyer.featured && idx === 0 ? "md:col-span-2 md:row-span-2" : ""
                                )}
                                onClick={() => { setSelectedFlyer(flyer); setViewerOpen(true); }}
                            >
                                <TiltCard className="h-full">
                                    <div className="relative aspect-[3/4.2] rounded-3xl overflow-hidden bg-white shadow-2xl shadow-primary/10 border border-white/50 h-full">
                                        <Image
                                            src={flyer.image}
                                            alt={flyer.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        
                                        {/* Overlay Content */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80" />
                                        
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2 text-secondary mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-tight">Até {flyer.validUntil}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-4 line-clamp-2 leading-tight">
                                                {flyer.title}
                                            </h3>
                                            
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-full bg-white text-primary rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                                    <Eye className="w-4 h-4" />
                                                    Visualizar Agora
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest shadow-lg">
                                            Vigente
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {filteredFlyers.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-muted mt-10">
                        <LayoutGrid className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-primary">Nenhum encarte encontrado</h3>
                        <p className="text-muted-foreground">Tente selecionar outra categoria ou volte mais tarde.</p>
                    </div>
                )}
            </main>

            {/* WhatsApp CTA - Premium Glass */}
            <section className="container mx-auto px-4 pb-24">
                <div className="relative rounded-[40px] overflow-hidden bg-primary p-8 md:p-16 shadow-2xl shadow-primary/30 group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                    
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Ofertas exclusivas no seu <span className="text-secondary">WhatsApp.</span>
                            </h2>
                            <p className="text-lg text-white/70 mb-8 max-w-md">
                                Não perca tempo procurando. Receba nossos melhores preços diretamente no seu celular assim que saírem.
                            </p>
                            <Button 
                                className="h-16 px-10 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg shadow-xl shadow-secondary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                                onClick={() => window.open("https://wa.me/5585982075102", "_blank")}
                            >
                                Quero participar do grupo
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="hidden md:flex justify-center flex-col items-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-secondary blur-3xl opacity-20 animate-pulse" />
                                <div className="w-48 h-48 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-700">
                                    <LayoutGrid className="w-20 h-20 text-white" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary rounded-2xl shadow-2xl flex items-center justify-center -rotate-12 group-hover:-rotate-6 transition-transform duration-700 text-white font-black text-2xl">
                                    %
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PDF VIEWER MODAL (Premium UI) ===== */}
            <AnimatePresence>
                {viewerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary/20 backdrop-blur-2xl px-4 py-6 md:p-10"
                        onClick={() => setViewerOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            className="relative w-full max-w-6xl h-full bg-white rounded-[32px] overflow-hidden shadow-[0_32px_120px_-20px_rgba(0,0,0,0.5)] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <header className="px-6 py-4 border-b flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                        <LayoutGrid className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary leading-none mb-1">{selectedFlyer?.title}</h3>
                                        <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                            <Calendar className="w-3 h-3 text-secondary" />
                                            Válido até 28/02
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button 
                                        className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-colors"
                                        onClick={() => {
                                            if (selectedFlyer?.pdf) {
                                                const link = document.createElement("a");
                                                link.href = selectedFlyer.pdf;
                                                link.download = `${selectedFlyer.title}.pdf`;
                                                link.click();
                                            }
                                        }}
                                        title="Download PDF"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => setViewerOpen(false)}
                                        className="p-2.5 rounded-xl bg-muted/50 hover:bg-destructive hover:text-white text-primary transition-all duration-300"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </header>

                            {/* Viewer Body */}
                            <div className="flex-1 relative overflow-hidden bg-muted/30 group/viewer">
                                <AnimatePresence mode="wait">
                                    {(isLoading || rendering) && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-40 flex items-center justify-center"
                                        >
                                            <div className="text-center">
                                                <div className="w-12 h-12 rounded-full border-4 border-primary/10 border-t-secondary animate-spin mb-4" />
                                                <p className="text-xs font-bold text-primary uppercase tracking-widest animate-pulse">Carregando Encarte...</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <TransformWrapper
                                    initialScale={1}
                                    minScale={0.8}
                                    maxScale={5}
                                    centerOnInit
                                >
                                    <TransformComponent
                                        wrapperClass="!w-full !h-full"
                                        contentClass="!w-full !h-full flex items-center justify-center p-4 md:p-10"
                                    >
                                        <motion.div
                                            key={selectedFlyer?.id + "-" + page}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative shadow-2xl rounded-sm overflow-hidden"
                                        >
                                            {selectedFlyer?.pdf.toLowerCase().endsWith(".pdf") ? (
                                                <canvas ref={canvasRef} className="max-w-full max-h-[75vh] block" />
                                            ) : (
                                                <img 
                                                    src={selectedFlyer?.pdf} 
                                                    alt={selectedFlyer?.title} 
                                                    className="max-w-full max-h-[75vh] object-contain block" 
                                                />
                                            )}
                                        </motion.div>
                                    </TransformComponent>
                                </TransformWrapper>
                                
                                {/* Side Controls (Overlay) */}
                                <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none opacity-0 group-hover/viewer:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page <= 1 || isLoading}
                                        className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto disabled:opacity-0"
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none opacity-0 group-hover/viewer:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                                        disabled={page >= numPages || isLoading}
                                        className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto disabled:opacity-0"
                                    >
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                </div>
                            </div>

                            {/* Viewer Footer - Controls */}
                            <footer className="px-6 py-4 bg-white border-t flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs font-black text-primary uppercase tracking-tighter">
                                    Pg. {page} de {numPages || "--"}
                                </div>

                                <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-2xl">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page <= 1 || isLoading}
                                        className="px-4 py-2 rounded-xl text-primary hover:bg-white hover:shadow-sm transition-all disabled:opacity-30"
                                    >
                                        Anterior
                                    </button>
                                    <div className="w-px h-4 bg-primary/10" />
                                    <button
                                        onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                                        disabled={page >= numPages || isLoading}
                                        className="px-4 py-2 rounded-xl text-primary hover:bg-white hover:shadow-sm transition-all disabled:opacity-30"
                                    >
                                        Próxima
                                    </button>
                                </div>

                                <div className="hidden md:flex items-center gap-4">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">Dica: Use o mouse para dar zoom</span>
                                </div>
                            </footer>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
>>>>>>> 2025531b5293375b1bbffd3767c5afc0671012ff
}
