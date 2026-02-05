"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Clock, Send, User, Mail, Phone, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const jobs = [
  {
    id: 1,
    title: "Operador de Caixa",
    location: "Bom Jardim",
    type: "CLT - Tempo Integral",
    description: "Atendimento ao cliente, registro de produtos, recebimento de pagamentos.",
  },
  {
    id: 2,
    title: "Repositor",
    location: "Bonsucesso",
    type: "CLT - Tempo Integral",
    description: "Organização e reposição de produtos nas gôndolas, verificação de validade.",
  },
  {
    id: 3,
    title: "Açougueiro",
    location: "Bom Jardim",
    type: "CLT - Tempo Integral",
    description: "Corte e preparação de carnes, atendimento personalizado ao cliente.",
  },
  {
    id: 4,
    title: "Auxiliar de Limpeza",
    location: "Todas as Lojas",
    type: "CLT - Tempo Integral",
    description: "Manutenção da limpeza e organização do ambiente da loja.",
  },
]

const benefits = [
  "Vale Transporte",
  "Vale Alimentação",
  "Desconto em Compras",
  "Plano de Saúde",
  "Plano Odontológico",
  "Treinamentos",
]

export function TrabalhePage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Trabalhe Conosco</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Faça parte da família Ana Risorlange! Estamos sempre em busca de pessoas dedicadas e apaixonadas por servir.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-12">
          <div className="bg-secondary rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
              Nossos Benefícios
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 rounded-xl p-4 text-center"
                >
                  <CheckCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-secondary-foreground font-medium text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Vagas Abertas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card rounded-xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
                  selectedJob === job.title 
                    ? "border-secondary" 
                    : "border-transparent hover:border-muted"
                }`}
                onClick={() => setSelectedJob(job.title)}
              >
                <h3 className="text-lg font-bold text-card-foreground mb-3">{job.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span>{job.type}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{job.description}</p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedJob(job.title)
                    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Candidatar-se
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="scroll-mt-20">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              {formSubmitted ? "Candidatura Enviada!" : "Envie sua Candidatura"}
            </h2>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  Obrigado pelo interesse!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Recebemos sua candidatura e entraremos em contato em breve.
                </p>
                <Button 
                  onClick={() => setFormSubmitted(false)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Enviar Nova Candidatura
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-secondary" />
                      Nome Completo
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Seu nome completo" 
                      required 
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-secondary" />
                      E-mail
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      required 
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-secondary" />
                      Telefone
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="(85) 9 0000.0000" 
                      required 
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-secondary" />
                      Vaga de Interesse
                    </Label>
                    <select
                      id="position"
                      value={selectedJob || ""}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full h-12 px-3 rounded-lg border border-input bg-background text-foreground"
                      required
                    >
                      <option value="">Selecione uma vaga</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title} - {job.location}
                        </option>
                      ))}
                      <option value="Outras">Outras Oportunidades</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-secondary" />
                    Mensagem (Opcional)
                  </Label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Conte um pouco sobre você e sua experiência..."
                    className="w-full px-3 py-3 rounded-lg border border-input bg-background text-foreground resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Send className="h-5 w-5" />
                  Enviar Candidatura
                </Button>
              </form>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12 bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Dúvidas sobre as vagas?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Entre em contato com nosso RH pelo WhatsApp e tire suas dúvidas.
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold gap-2"
            asChild
          >
            <a href="https://wa.me/5585999960267" target="_blank" rel="noopener noreferrer">
              Falar com o RH
            </a>
          </Button>
        </section>
      </div>
    </div>
  )
}
