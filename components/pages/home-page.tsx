"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Gift,
  Smartphone,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Apple,
  Star,
  Percent,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { EventsSection } from "@/components/events-section"

const banners = [
  {
    id: 1,
    title: "Ofertas do Dia",
    subtitle: "Aproveite descontos incríveis",
    image: "/cards/card_clube.png",
    cta: "Ver Ofertas",
  },
  {
    id: 2,
    title: "Cartão Tricard",
    subtitle: "Pague em até 40 dias",
    image: "/cards/card_cartao.jpeg",
    cta: "Solicitar Cartão",
  },
  {
    id: 3,
    title: "Baixe nosso App",
    subtitle: "Frete grátis na 1ª compra",
    image: "/cards/card_app.jpeg",
    cta: "Baixar Agora",
  },
]

const quickLinks = [
  { id: 1, label: "Cartão da Loja", image: "/cards/card_cartao.jpeg" },
  { id: 2, label: "Clube de Descontos", image: "/cards/card_clube.png" },
  { id: 3, label: "Compre no App", image: "/cards/card_app.jpeg" },
  { id: 4, label: "SAC", image: "/cards/card_Cartao2.jpeg" },
]



export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Quick Links Cards */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,56,130,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex flex-col items-center bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative w-full aspect-[3/4] bg-white overflow-hidden">
                  {/* Fallback pattern if image is missing/loading (can be replaced by skeleton later) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50" />

                  <Image
                    src={link.image}
                    alt={link.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                <div className="p-4 w-full text-center bg-white relative z-10">
                  <span className="text-secondary font-bold text-base md:text-lg group-hover:text-primary transition-colors duration-300">
                    {link.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-12 bg-primary">
        {/* App Download Section */}
        <section className="py-16 relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

          <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center md:text-left space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-secondary blur-sm rounded-full opacity-50 animate-pulse" />
                    <Smartphone className="h-5 w-5 text-secondary relative z-10" />
                  </div>
                  <span className="text-secondary font-bold tracking-wide text-sm uppercase">Novo App Oficial</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                    O supermercado inteiro <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-300">
                      na palma da sua mão
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 max-w-xl mx-auto md:mx-0 leading-relaxed">
                    Faça suas compras de onde estiver e receba em casa com conforto.
                    <span className="block mt-2 font-semibold text-secondary text-2xl">
                      Frete Grátis na 1ª compra! 🚚💨
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/10"
                  >
                    <Apple className="h-8 w-8" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider opacity-80">Disponível na</div>
                      <div className="text-lg font-bold leading-none">App Store</div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 bg-transparent hover:bg-white/10 text-white px-6 py-3.5 rounded-xl shadow-lg border-2 border-white/20 hover:border-white transition-all backdrop-blur-sm"
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider opacity-80">Baixe no</div>
                      <div className="text-lg font-bold leading-none">Google Play</div>
                    </div>
                  </motion.button>
                </motion.div>
              </div>

              <div className="flex-1 flex justify-center md:justify-end relative">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-[390px] md:w-[450px] aspect-[9/19.5]"
                >
                  {/* Bloom effect behind phone */}
                  <div className="absolute inset-0 bg-secondary/30 blur-[60px] rounded-full transform scale-90" />

                  <Image
                    src="/cards/card_app_loja.png"
                    alt="App Ana Risorlange"
                    fill
                    className="object-contain drop-shadow-2xl z-10 cursor-pointer hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Floating badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -right-8 top-1/3 bg-white text-primary p-3 rounded-2xl shadow-xl z-20 flex flex-col items-center gap-1 hidden md:flex"
                  >
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Percent className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-bold text-xs">Ofertas</span>
                    <span className="font-extrabold text-sm text-green-600">HOT</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Events Section */}
      <EventsSection />

      {/* Tricard Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            <div className="flex-1 flex justify-center md:justify-start relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full transform scale-75" />

              <motion.div
                className="relative w-full max-w-md aspect-[3/4] z-10"
                animate={{
                  rotate: [0, 5, -5, 5, 0],
                  y: [0, -15, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "bottom center" }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/cards/card_cartao.jpeg"
                  alt="Cartão Tricard Ana Risorlange"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Floating badge for card */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -left-4 bottom-20 bg-white text-orange-600 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 hidden md:flex"
                >
                  <div className="bg-orange-100 p-2 rounded-full">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Limite</div>
                    <div className="font-extrabold text-lg leading-none">Liberado</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="flex-1 text-center md:text-left text-white">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                  <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                  <span className="text-white font-semibold text-sm tracking-wide">Benefícios Exclusivos</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                  Cartão Tricard <br />
                  <span className="text-yellow-300">Mais Vantagens</span>
                </h2>

                <p className="text-white/90 mb-10 text-lg md:text-xl font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
                  A liberdade que você precisa para comprar tudo o que deseja no seu tempo.
                  <span className="block mt-2 opacity-100 font-bold bg-white/10 p-2 rounded-lg inline-block border border-white/10">
                    Até 40 dias para pagar sem juros!
                  </span>
                </p>

                <ul className="text-white mb-10 space-y-5 text-left inline-block bg-black/5 p-8 rounded-3xl border border-white/10 shadow-lg backdrop-blur-sm w-full max-w-lg">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-2 rounded-full bg-white text-orange-600 shadow-md group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg">Aprovação rápida e facilitada</span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-2 rounded-full bg-white text-orange-600 shadow-md group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg">Sem anuidade no primeiro ano</span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-2 rounded-full bg-white text-orange-600 shadow-md group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg">Descontos exclusivos toda semana</span>
                  </motion.li>
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    size="lg"
                    className="group relative h-16 px-10 text-xl font-bold bg-white text-orange-600 hover:bg-white hover:text-orange-700 rounded-2xl shadow-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 w-full md:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <CreditCard className="w-6 h-6" />
                      Peça já seu cartão
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
