"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
    {
        icon: Phone,
        title: "Telefone",
        content: "(85) 3333-4444",
        link: "tel:+558533334444"
    },
    {
        icon: Mail,
        title: "E-mail",
        content: "contato@anarisorlange.com.br",
        link: "mailto:contato@anarisorlange.com.br"
    },
    {
        icon: MapPin,
        title: "Endereços",
        content: "Bom Jardim e Bonsucesso",
        link: "/onde-estamos"
    },
    {
        icon: Clock,
        title: "Horário",
        content: "Seg - Sáb: 7h às 21h | Dom: 7h às 13h",
        link: null
    }
]

const socialLinks = [
    {
        icon: Instagram,
        name: "Instagram",
        handle: "@anarisorlangesupermercados",
        link: "https://www.instagram.com/anarisorlangesupermercados",
        color: "hover:bg-pink-600"
    },
    {
        icon: Facebook,
        name: "Facebook",
        handle: "Ana Risorlange",
        link: "https://www.facebook.com/share/1C2stztYuP/",
        color: "hover:bg-blue-600"
    }
]

export function ContatoPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section - Responsive Typography */}
            <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/20 rounded-full blur-[80px] sm:blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-[70px] sm:blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-flex items-center gap-2 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 border border-white/20 backdrop-blur-sm"
                        >
                            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                            <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">Fale Conosco</span>
                        </motion.div>

                        {/* Responsive Typography using clamp */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight px-2">
                            Estamos aqui para <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-300 block sm:inline">ajudar você!</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 font-medium px-4">
                            Entre em contato conosco. Sua opinião é muito importante!
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Contact Info Cards - Mobile First Grid */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {/* Law of Proximity: Responsive grid that maintains visual grouping */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group p-6 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl transition-all duration-300 min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col"
                            >
                                {/* Von Restorff Effect: Icon stands out */}
                                <div className="bg-gradient-to-br from-primary to-blue-700 p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                                </div>

                                <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                                    <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                                        {item.title}
                                    </h3>

                                    {/* Fitts' Law: Touch-friendly links */}
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className={`text-sm sm:text-base lg:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug ${item.title === "E-mail"
                                                    ? "break-all max-w-full"
                                                    : "break-words hyphens-auto"
                                                }`}
                                        >
                                            {item.content}
                                        </a>
                                    ) : (
                                        <p className={`text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-snug ${item.title === "E-mail"
                                                ? "break-all max-w-full"
                                                : "break-words hyphens-auto"
                                            }`}>{item.content}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form + Social - Stacked on Mobile */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 order-2 lg:order-1"
                        >
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2 sm:mb-3">
                                    Envie sua mensagem
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Preencha o formulário e responderemos em breve
                                </p>
                            </div>

                            <form className="space-y-5 sm:space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                                        Nome Completo *
                                    </label>
                                    {/* Fitts' Law: Min 44px touch target */}
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Digite seu nome"
                                        className="w-full h-11 sm:h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-base"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                            E-mail *
                                        </label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="seu@email.com"
                                            className="w-full h-11 sm:h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                                            Telefone
                                        </label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="(85) 9 9999-9999"
                                            className="w-full h-11 sm:h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-base"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                                        Assunto *
                                    </label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        placeholder="Sobre o que você quer falar?"
                                        className="w-full h-11 sm:h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-base"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                                        Mensagem *
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Digite aqui sua mensagem..."
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all resize-none text-base"
                                        required
                                    />
                                </div>

                                {/* Fitts' Law: Large, easy-to-tap CTA */}
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-5 sm:py-6 rounded-xl text-base sm:text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group min-h-[52px]"
                                >
                                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    Enviar Mensagem
                                </Button>
                            </form>
                        </motion.div>

                        {/* Social & Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
                        >
                            {/* Social Media */}
                            <div className="bg-gradient-to-br from-primary to-blue-900 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-secondary/20 rounded-full blur-[60px] sm:blur-[80px]" />
                                <div className="relative z-10">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">
                                        Siga-nos nas redes sociais
                                    </h3>
                                    <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8">
                                        Fique por dentro de promoções, eventos e novidades!
                                    </p>

                                    {/* Miller's Law: Limited, chunked social links */}
                                    <div className="space-y-3 sm:space-y-4">
                                        {socialLinks.map((social) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05, x: 10 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-3 sm:gap-4 bg-white/10 hover:bg-white backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20 transition-all group min-h-[60px]"
                                            >
                                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg group-hover:bg-white/30 transition-colors shrink-0">
                                                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-white group-hover:text-primary text-sm sm:text-base truncate">{social.name}</p>
                                                    <p className="text-xs sm:text-sm text-blue-100 group-hover:text-gray-700 truncate">{social.handle}</p>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp CTA */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-br from-green-500 to-green-700 p-6 sm:p-8 rounded-3xl shadow-xl text-white cursor-pointer relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-[50px] sm:blur-[60px]" />
                                <div className="relative z-10">
                                    <div className="bg-white/20 p-2.5 sm:p-3 rounded-xl w-fit mb-3 sm:mb-4">
                                        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black mb-2">
                                        Fale conosco no WhatsApp
                                    </h3>
                                    <p className="text-sm sm:text-base text-green-100 mb-3 sm:mb-4">
                                        Atendimento rápido e direto
                                    </p>
                                    <Button className="bg-white text-green-700 hover:bg-green-50 font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl shadow-lg group-hover:scale-105 transition-transform text-sm sm:text-base min-h-[44px]">
                                        Iniciar Conversa
                                    </Button>
                                </div>
                            </motion.div>

                            {/* FAQ Tip */}
                            <div className="bg-orange-50 p-5 sm:p-6 rounded-2xl border-2 border-orange-100">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-base sm:text-lg">
                                    <span className="text-xl sm:text-2xl">💡</span>
                                    Dica rápida
                                </h4>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    Para dúvidas sobre produtos, preços ou horários, visite nossa seção de
                                    <a href="/onde-estamos" className="text-primary font-bold hover:underline"> Lojas </a>
                                    ou ligue diretamente para a unidade mais próxima.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    )
}
