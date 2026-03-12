"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Facebook, Instagram, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

type NavLink = {
    text: string;
    route: string;
    external?: boolean;
};

export function Header() {
    const links: NavLink[] = [
        { text: "Home", route: "/" },
        { text: "Institucional", route: "/institucional" },
        { text: "Onde Estamos", route: "/onde-estamos" },
        { text: "Encartes", route: "/encartes" },
        { text: "Mídias", route: "/blog" },
        { text: "Contato", route: "/contato" },
        {
            text: "Trabalhe Conosco",
            route: "/trabalhe-conosco",
        },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    // Scroll Behavior
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Body Overflow
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
        }
        return () => {
            if (typeof document !== "undefined") {
                document.body.style.overflow = "auto";
            }
        };
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Close menu with ESC
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const handleHomeClick = useCallback(() => {
        if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push("/");
        }
    }, [pathname, router]);

    const handleNavigation = useCallback(
        (link: NavLink) => {
            setIsMenuOpen(false);
            if (!link.external) {
                router.push(link.route);
            }
        },
        [router]
    );

    const isActive = (route: string) =>
        route === "/" ? pathname === "/" : pathname.startsWith(route);

    // Ana Risorlange Colors for background
    // primary: usually a dark blue for the brand
    const backgroundColor = "var(--color-primary)";

    return (
        <>
            <motion.header
                initial={{ y: 0 }}
                animate={{
                    height: isScrolled ? 70 : 90,
                    backgroundColor,
                    opacity: 1,
                    boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
                    paddingTop: isScrolled ? 8 : 20,
                    paddingBottom: isScrolled ? 8 : 20,
                }}
                transition={{ duration: 0.35 }}
                className={cn(
                    "fixed top-0 left-0 w-full z-50 flex flex-col items-center",
                    isScrolled ? "border-b border-white/10" : "border-b border-transparent"
                )}
                role="navigation"
                aria-label="Navegação principal"
            >
                <div className="w-full max-w-[1440px] xl:max-w-[1536px] px-4 lg:px-5 xl:px-6 items-center gap-6 grid grid-cols-3 md:flex md:justify-between">
                    
                    {/* Botão mobile */}
                    <motion.button
                        type="button"
                        className="md:hidden justify-self-start p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        animate={{ rotate: isMenuOpen ? 90 : 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsMenuOpen((v) => !v)}
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? (
                            <X className="text-white h-8 w-8" />
                        ) : (
                            <Menu className="text-white h-8 w-8" />
                        )}
                    </motion.button>

                    {/* Logo Area */}
                    <motion.div
                        className="cursor-pointer shrink-0 flex justify-center md:justify-start md:w-auto col-span-1 md:col-auto"
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        onClick={handleHomeClick}
                    >
                        <Image
                            src="/logo/logo_horizontal.png"
                            alt="Ana Risorlange Supermercado"
                            width={220}
                            height={60}
                            priority
                            className="object-contain mx-auto md:mx-0 h-[40px] md:h-[50px] w-auto drop-shadow-sm filter brightness-0 invert"
                            onError={(e) => {
                                e.currentTarget.style.filter = "none";
                            }}
                        />
                    </motion.div>

                    {/* Links Desktop */}
                    <ul className="hidden md:flex items-center gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 min-w-0">
                        {links.map((link, i) => (
                            <motion.li
                                key={link.route + "-" + i}
                                className="relative"
                                animate={{ opacity: 1, y: isScrolled ? -2 : 0 }}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
                            >
                                {link.external ? (
                                    <motion.a
                                        href={link.route}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="whitespace-nowrap text-sm md:text-base lg:text-base xl:text-lg text-white/90 hover:text-secondary transition-colors"
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.text}
                                    </motion.a>
                                ) : (
                                    <motion.button
                                        onMouseEnter={() => router.prefetch(link.route)}
                                        onFocus={() => router.prefetch(link.route)}
                                        onClick={() => handleNavigation(link)}
                                        className={[
                                            "whitespace-nowrap text-sm md:text-base lg:text-base xl:text-lg transition-colors",
                                            isActive(link.route)
                                                ? "text-secondary font-bold"
                                                : "text-white/90 hover:text-secondary",
                                        ].join(" ")}
                                        aria-current={isActive(link.route) ? "page" : undefined}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.text}
                                    </motion.button>
                                )}
                                {isActive(link.route) && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-secondary"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Social Icons */}
                    <div className="hidden xl:flex items-center gap-4 ml-2">
                        <a
                            href="https://www.facebook.com/share/1C2stztYuP/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="text-white/80 hover:text-secondary transition-colors"
                        >
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/anarisorlangesupermercados?igsh=cnR4bGxmNnJ1b3J2"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-white/80 hover:text-secondary transition-colors"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/anarisorlangesupermercado/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-white/80 hover:text-secondary transition-colors"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="https://chat.whatsapp.com/HGHcPl4PkiC6pbliDVTdWu?mode=ac_t"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="text-white/80 hover:text-secondary transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.header>

            {/* Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Menu Mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.ul
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden fixed left-0 right-0 z-50 mx-auto w-full max-w-7xl px-4 py-2 flex flex-col gap-1 bg-white rounded-xl shadow-md border border-slate-200"
                        style={{ top: isScrolled ? 70 : 90 }}
                    >
                        {links.map((link, i) => (
                            <motion.li
                                key={link.route + "-" + i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.04 }}
                            >
                                {link.external ? (
                                    <a
                                        href={link.route}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-2 px-2 text-center whitespace-nowrap text-sm sm:text-base text-primary hover:text-secondary"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.text}
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => handleNavigation(link)}
                                        className={[
                                            "block w-full py-2 px-2 text-center whitespace-nowrap text-sm sm:text-base",
                                            isActive(link.route)
                                                ? "text-secondary font-semibold"
                                                : "text-primary hover:text-secondary",
                                        ].join(" ")}
                                        aria-current={isActive(link.route) ? "page" : undefined}
                                    >
                                        {link.text}
                                    </button>
                                )}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </>
    )
}
