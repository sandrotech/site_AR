"use client"

import { motion } from "framer-motion"
import { Handshake, Mail, Phone, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const partners = [
  { id: 1, name: "Tricard", category: "Financeiro", image: "/images/tricard-promo.jpg" },
  { id: 2, name: "Heineken", category: "Bebidas", image: "/images/banner-sorteio.jpg" },
  { id: 3, name: "Coca-Cola", category: "Bebidas", image: "/images/banner-app.jpg" },
  { id: 4, name: "Nestlé", category: "Alimentos", image: "/images/banner-tricard.jpg" },
  { id: 5, name: "Unilever", category: "Higiene", image: "/images/banner-sorteio.jpg" },
  { id: 6, name: "P&G", category: "Higiene", image: "/images/banner-app.jpg" },
]

export function ParceirosPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Handshake className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Nossos Parceiros</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trabalhamos com as melhores marcas para oferecer qualidade e variedade para você
          </p>
        </div>

        {/* Become Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary rounded-2xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
                Seja um Parceiro Ana Risorlange
              </h2>
              <p className="text-secondary-foreground/90 mb-6">
                Anuncie sua marca em nossas lojas e alcance milhares de clientes todos os dias. 
                Oferecemos espaços privilegiados para divulgação e ações promocionais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Mail className="h-5 w-5" />
                  Entrar em Contato
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 bg-transparent"
                >
                  <Phone className="h-5 w-5" />
                  (85) 9 9996.0267
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-primary/10 rounded-full p-8">
                <Building2 className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partners Grid */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Marcas que Confiam em Nós
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={partner.image || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs font-medium text-white/80 bg-white/20 px-2 py-1 rounded-full">
                      {partner.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{partner.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Benefícios da Parceria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📍", title: "Pontos Estratégicos", desc: "Espaços em locais de alto fluxo nas lojas" },
              { icon: "👥", title: "Grande Público", desc: "Milhares de clientes diários em nossas unidades" },
              { icon: "📣", title: "Ações Promocionais", desc: "Degustações e demonstrações de produtos" },
              { icon: "📱", title: "Mídia Digital", desc: "Divulgação em nossas redes sociais" },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-card-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form CTA */}
        <section className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Quer divulgar sua marca conosco?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Entre em contato com nossa equipe comercial e saiba mais sobre as oportunidades de parceria.
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          >
            Solicitar Proposta Comercial
          </Button>
        </section>
      </div>
    </div>
  )
}
