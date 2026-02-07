"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Facebook, Instagram, Linkedin, ShoppingBasket, Star, Home, Tag, MapPin, Phone, Briefcase, Info, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
    { id: "/", label: " Home", icon: Home },
    { id: "/institucional", label: "Institucional", icon: Info },
    { id: "/onde-estamos", label: "Onde Estamos", icon: MapPin },
    { id: "/encartes", label: "Encartes", icon: Tag },
    { id: "/blog", label: "Mídias", icon: MessageCircle },
    { id: "/contato", label: "Contato", icon: Phone },
    { id: "/trabalhe-conosco", label: "Trabalhe Conosco", icon: Briefcase },
]

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 bg-primary shadow-2xl transition-all duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-[88px]">

                    {/* Logo Area - Left */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 md:gap-3 group flex-shrink-0"
                    >
                        <div className="relative bg-white/10 p-1.5 md:p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                            <ShoppingBasket className="h-6 w-6 md:h-9 md:w-9 text-secondary" />
                            <Star className="h-3 w-3 md:h-4 md:w-4 text-secondary absolute -top-1 -right-1 fill-secondary animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-baseline">
                                <span className="text-secondary font-extrabold text-lg md:text-2xl tracking-tighter leading-none">Ana</span>
                                <span className="text-white font-extrabold text-lg md:text-2xl tracking-tighter leading-none ml-1">Risorlange</span>
                            </div>
                            <span className="text-white/60 text-[8px] md:text-[10px] font-semibold tracking-[0.3em] uppercase -mt-0.5 ml-0.5">Supermercado</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden xl:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.id}
                                onMouseEnter={() => setHoveredTab(item.id)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={`relative px-1 py-2 text-[15px] font-medium transition-colors duration-200 ${pathname === item.id
                                    ? "text-secondary font-bold"
                                    : "text-white/90 hover:text-white"
                                    }`}
                            >
                                <span>{item.label}</span>

                                {/* Active Underline */}
                                {pathname === item.id && (
                                    <motion.div
                                        layoutId="activeUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-secondary rounded-full"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}

                                {/* Hover Underline (lighter) */}
                                {hoveredTab === item.id && pathname !== item.id && (
                                    <motion.div
                                        layoutId="hoverUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/30 rounded-full"
                                        initial={{ opacity: 0, width: "0%" }}
                                        animate={{ opacity: 1, width: "100%" }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Area - Socials Only */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center gap-6">
                            <a href="https://www.instagram.com/anarisorlangesupermercados?igsh=cnR4bGxmNnJ1b3J2" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition-all hover:scale-110 transform duration-200 p-2 hover:bg-white/5 rounded-full" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/anarisorlangesupermercado/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition-all hover:scale-110 transform duration-200 p-2 hover:bg-white/5 rounded-full" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://chat.whatsapp.com/HGHcPl4PkiC6pbliDVTdWu?mode=ac_t" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition-all hover:scale-110 transform duration-200 p-2 hover:bg-white/5 rounded-full" aria-label="WhatsApp">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/share/1C2stztYuP/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-secondary transition-all hover:scale-110 transform duration-200 p-2 hover:bg-white/5 rounded-full" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button - Visible only on mobile */}
                    <div className="xl:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 text-white hover:bg-white/10"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-9 w-9" /> : <Menu className="h-9 w-9" />}
                        </Button>
                    </div>

                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 xl:hidden backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background z-50 shadow-2xl xl:hidden flex flex-col border-l border-border"
                        >
                            {/* Drawer Header - Branded & Personal */}
                            <div className="relative p-6 pb-8 bg-gradient-to-br from-primary via-blue-700 to-blue-900 border-b border-white/10 overflow-hidden flex flex-col justify-end min-h-[220px]">

                                {/* Close Button - Glassmorphism */}
                                <div className="absolute top-4 right-4 z-20">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 hover:text-white transition-all backdrop-blur-md border border-white/10 shadow-lg group"
                                    >
                                        <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                                    </Button>
                                </div>

                                {/* Decorative Background Elements */}
                                <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-secondary/20 rounded-full blur-[80px]" />
                                <div className="absolute bottom-[-20%] left-[-20%] w-40 h-40 bg-blue-400/10 rounded-full blur-[60px]" />
                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col gap-4">

                                    {/* Badge */}
                                    <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
                                        <ShoppingBasket className="h-3.5 w-3.5 text-secondary" />
                                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Menu Principal</span>
                                    </div>

                                    {/* Brand Typography */}
                                    <div className="space-y-1 mt-2">
                                        <h3 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase ml-0.5">Supermercado</h3>
                                        <div className="flex flex-col">
                                            <span className="text-4xl font-black text-white leading-[0.9] tracking-tighter">
                                                Ana
                                            </span>
                                            <span className="text-4xl font-black text-secondary leading-[0.9] tracking-tighter">
                                                Risorlange
                                            </span>
                                        </div>
                                    </div>

                                    {/* Slogan with Separator */}
                                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                                        <div className="h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent" />
                                        <p className="text-blue-100/90 text-xs font-medium italic whitespace-nowrap">
                                            Trazendo o melhor para você!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Drawer Links - Staggered Animation */}
                            <motion.nav
                                className="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-50/50"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={{
                                            hidden: { opacity: 0, x: 20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <Link
                                            href={item.id}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`w-full flex items-center gap-4 p-3.5 rounded-xl font-medium transition-all duration-200 border ${pathname === item.id
                                                ? "bg-white border-blue-100 shadow-sm text-primary"
                                                : "bg-transparent border-transparent text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm"
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg ${pathname === item.id ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"
                                                }`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-base text-left flex-1">{item.label}</span>
                                            {pathname === item.id && <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,102,0,0.6)]" />}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Endomarketing Card - App Download */}
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary to-blue-900 text-white shadow-lg relative overflow-hidden group"
                                >
                                    <div className="relative z-10 flex flex-col items-start">
                                        <span className="bg-secondary text-xs font-bold px-2 py-0.5 rounded text-white mb-2">NOVIDADE</span>
                                        <h3 className="font-bold text-lg leading-tight mb-1">Baixe o App!</h3>
                                        <p className="text-blue-100 text-xs mb-3">Ofertas na palma da sua mão.</p>
                                        <Button size="sm" className="w-full bg-white text-primary hover:bg-gray-100 font-bold text-xs h-8">
                                            Baixar Agora
                                        </Button>
                                    </div>
                                    {/* Decorative circle */}
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                                </motion.div>

                            </motion.nav>

                            {/* Footer - Socials */}
                            <div className="p-6 bg-white border-t border-gray-100">
                                <div className="flex justify-center gap-5">
                                    <a href="https://www.instagram.com/anarisorlangesupermercados?igsh=cnR4bGxmNnJ1b3J2" className="text-gray-400 hover:text-secondary hover:scale-110 transition-all"><Instagram className="w-6 h-6" /></a>
                                    <a href="https://chat.whatsapp.com/HGHcPl4PkiC6pbliDVTdWu?mode=ac_t" className="text-gray-400 hover:text-green-500 hover:scale-110 transition-all">
                                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                    </a>
                                    <a href="https://www.linkedin.com/company/anarisorlangesupermercado/" className="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all"><Linkedin className="w-6 h-6" /></a>
                                </div>
                                <p className="text-center text-[10px] text-gray-300 mt-4">v1.0.0 • Ana Risorlange</p>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}
