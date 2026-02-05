"use client"

import { motion } from "framer-motion"
import {
    Dumbbell,
    Sparkles,
    Cake,
    ArrowRight,
    Music,
    Radio,
    PartyPopper
} from "lucide-react"
import { Button } from "@/components/ui/button"

const events = [
    {
        id: "movimente-se",
        title: "Movimente-se",
        subtitle: "Bem-estar e Saúde",
        description: "Participe das nossas aulas gratuitas de ritmos e ginástica. Cuide de você!",
        icon: <Dumbbell className="h-8 w-8" />,
        secondaryIcon: <Music className="h-6 w-6 absolute top-2 right-2 opacity-50" />,
        color: "from-orange-500 to-red-500",
        shadow: "hover:shadow-orange-500/30",
        bgIcon: "bg-orange-100 text-orange-600",
        buttonVariant: "default" as const
    },
    {
        id: "novidades-ar",
        title: "Novidades no AR",
        subtitle: "Exclusivo Ana Risorlange",
        description: "Confira itens totalmente diferentes que acabaram de chegar na loja.",
        icon: <Radio className="h-8 w-8" />,
        secondaryIcon: <Sparkles className="h-6 w-6 absolute top-2 right-2 opacity-50" />,
        color: "from-blue-600 to-cyan-500",
        shadow: "hover:shadow-blue-500/30",
        bgIcon: "bg-blue-100 text-blue-600",
        buttonVariant: "default" as const
    },
    {
        id: "aniversarios",
        title: "Aniversários da Loja",
        subtitle: "Festa e Ofertas",
        description: "Venha celebrar nossos aniversários com promoções e surpresas especiais.",
        icon: <Cake className="h-8 w-8" />,
        secondaryIcon: <PartyPopper className="h-6 w-6 absolute top-2 right-2 opacity-50" />,
        color: "from-purple-600 to-pink-500",
        shadow: "hover:shadow-purple-500/30",
        bgIcon: "bg-purple-100 text-purple-600",
        buttonVariant: "default" as const
    }
]

export function EventsSection() {
    return (
        <section className="py-16 bg-gradient-to-b from-background via-gray-50 to-background relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full mb-4 shadow-sm border border-gray-100"
                    >
                        <Sparkles className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary uppercase tracking-wide">Experiências Exclusivas</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Eventos e <span className="text-primary">Comunidade</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Muito mais que um supermercado. Participe das nossas atividades e fique por dentro de tudo que acontece no Ana Risorlange.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`group relative bg-white rounded-3xl p-1 overflow-hidden shadow-lg transition-all duration-300 ${event.shadow}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                            <div className="relative h-full bg-white rounded-[20px] p-6 md:p-8 flex flex-col border border-gray-100">

                                {/* Header Icon */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl ${event.bgIcon} transform group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                        {event.icon}
                                    </div>
                                    {event.secondaryIcon}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-500 mb-2 cursor-pointer
                    bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-gray-900 group-hover:to-primary">
                                        {event.title}
                                    </h3>
                                    <p className="text-secondary font-medium text-sm mb-4 uppercase tracking-wider">
                                        {event.subtitle}
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed mb-8">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Footer / CTA */}
                                <div className="pt-4 mt-auto border-t border-gray-50">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-between hover:bg-gray-50 group/btn"
                                    >
                                        <span className="font-semibold text-foreground group-hover/btn:text-primary transition-colors">Saiba mais</span>
                                        <div className={`p-1.5 rounded-full text-white bg-gradient-to-r ${event.color} group-hover/btn:scale-110 transition-transform`}>
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
