"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, Phone, Clock, Facebook, Instagram, Star, ShoppingBasket } from "lucide-react"

interface FooterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FooterSection({ title, children, defaultOpen = false }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-primary/30 md:border-0">
      <button
        className="flex items-center justify-between w-full py-4 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-primary-foreground">{title}</span>
        <ChevronDown className={`h-5 w-5 text-primary-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <h3 className="hidden md:block font-semibold text-primary-foreground mb-4">{title}</h3>
      <AnimatePresence>
        {(isOpen || typeof window !== "undefined" && window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:overflow-visible"
          >
            <div className="pb-4 md:pb-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden md:block">{children}</div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8">
          {/* Logo & About */}
          <div className="py-4 md:py-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <ShoppingBasket className="h-10 w-10 text-secondary" />
                <Star className="h-5 w-5 text-secondary absolute -top-1 -right-1 fill-secondary" />
              </div>
              <div>
                <span className="text-secondary font-bold text-xl">Ana</span>
                <span className="text-primary-foreground font-bold text-xl ml-1">Risorlange</span>
                <span className="text-secondary text-xs block -mt-1">SUPERMERCADO</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Trazendo o melhor para você desde 2010. Qualidade, preço justo e atendimento de excelência.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Store 1 */}
          <FooterSection title="Loja Bom Jardim">
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-secondary" />
                <span>R. Maria Júlia, 980 - Bom Jardim, Fortaleza - CE, 60540-250</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-secondary" />
                <span>(85) 9 9996.0267</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0 text-secondary" />
                <span>Seg - Sáb: 7h às 21h<br />Dom: 7h às 13h</span>
              </div>
            </div>
          </FooterSection>

          {/* Store 2 */}
          <FooterSection title="Loja Bonsucesso">
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-secondary" />
                <span>R. Verbena, 630 - Bonsucesso, Fortaleza - CE, 60545-350</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-secondary" />
                <span>(85) 9 9660.2873</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0 text-secondary" />
                <span>Seg - Sáb: 7h às 21h<br />Dom: 7h às 13h</span>
              </div>
            </div>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Links Rápidos">
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-secondary transition-colors">Encartes da Semana</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Cartão Tricard</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Baixe nosso App</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Política de Privacidade</a></li>
            </ul>
          </FooterSection>
        </div>

        <div className="border-t border-primary/30 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2026 Ana Risorlange Supermercado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
