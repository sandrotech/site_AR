"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Navigation, Star, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"

const timeline = [
  {
    year: "2010",
    title: "O Início da Jornada",
    description: "Os fundadores Ana e Risorlange começaram o sonho de trazer qualidade e bons preços para a comunidade.",
    isCompleted: true,
  },
  {
    year: "2015",
    title: "Loja Bom Jardim",
    description: "Abertura da primeira loja no bairro Bom Jardim, na Rua Maria Júlia, 980.",
    isCompleted: true,
  },
  {
    year: "2020",
    title: "Loja Bonsucesso",
    description: "Expansão com a segunda unidade no bairro Bonsucesso, na Rua Verbena, 630.",
    isCompleted: true,
  },
  {
    year: "2027",
    title: "Nova Loja em Breve",
    description: "Em breve, uma nova unidade para atender ainda mais famílias de Fortaleza.",
    isCompleted: false,
  },
]

const stores = [
  {
    id: 1,
    name: "Loja Bom Jardim",
    address: "R. Maria Júlia, 980 - Bom Jardim, Fortaleza - CE, 60540-250",
    phone: "(85) 9 9996.0267",
    hours: "Seg - Sáb: 7h às 21h | Dom: 7h às 13h",
    mapUrl: "https://maps.google.com/?q=R.+Maria+Júlia,+980+-+Bom+Jardim,+Fortaleza+-+CE",
    image: "/images/banner-sorteio.jpg",
  },
  {
    id: 2,
    name: "Loja Bonsucesso",
    address: "R. Verbena, 630 - Bonsucesso, Fortaleza - CE, 60545-350",
    phone: "(85) 9 9660.2873",
    hours: "Seg - Sáb: 7h às 21h | Dom: 7h às 13h",
    mapUrl: "https://maps.google.com/?q=R.+Verbena,+630+-+Bonsucesso,+Fortaleza+-+CE",
    image: "/images/banner-app.jpg",
  },
]

export function LojasPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="relative">
              <ShoppingBasket className="h-12 w-12 text-secondary" />
              <Star className="h-6 w-6 text-secondary absolute -top-1 -right-1 fill-secondary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Nossa História</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desde 2010, trazendo o melhor para você e sua família. Conheça nossa trajetória de crescimento e dedicação.
          </p>
        </div>

        {/* Timeline */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-start gap-6 mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 md:-translate-x-1/2 ${
                    item.isCompleted 
                      ? "bg-secondary border-secondary" 
                      : "bg-background border-muted-foreground border-dashed"
                  }`} />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                  }`}>
                    <div className={`bg-card rounded-xl p-6 shadow-sm ${
                      !item.isCompleted ? "opacity-60 border-2 border-dashed border-muted-foreground" : ""
                    }`}>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 ${
                        item.isCompleted 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-card-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stores Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Nossas Lojas
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-card rounded-2xl overflow-hidden shadow-md"
              >
                <div className="relative h-48">
                  <img
                    src={store.image || "/placeholder.svg"}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {store.name}
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-card-foreground">{store.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                    <a href={`tel:${store.phone.replace(/\D/g, '')}`} className="text-card-foreground hover:text-secondary transition-colors">
                      {store.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-card-foreground">{store.hours}</span>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    <a href={store.mapUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-4 w-4" />
                      Abrir no Google Maps
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mt-16 bg-primary rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2">Missão</h3>
              <p className="text-primary-foreground/80 text-sm">
                Oferecer produtos de qualidade com preços acessíveis, proporcionando uma experiência de compra agradável.
              </p>
            </div>
            <div>
              <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👁️</span>
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2">Visão</h3>
              <p className="text-primary-foreground/80 text-sm">
                Ser referência no varejo alimentar de Fortaleza, reconhecido pelo atendimento e compromisso com a comunidade.
              </p>
            </div>
            <div>
              <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2">Valores</h3>
              <p className="text-primary-foreground/80 text-sm">
                Ética, transparência, respeito ao cliente e compromisso com a qualidade em tudo que fazemos.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
