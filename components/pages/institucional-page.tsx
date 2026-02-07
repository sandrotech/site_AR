"use client"

import { motion } from "framer-motion"
import { Building2, Target, Eye, Heart, Users, Award, TrendingUp, Calendar, MapPin, Store, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"

const values = [
    {
        icon: Heart,
        title: "Compromisso com a Qualidade",
        description: "Produtos frescos e selecionados diariamente, garantindo o melhor para sua mesa e família."
    },
    {
        icon: Users,
        title: "Atendimento Excepcional",
        description: "Equipe qualificada e dedicada, pronta para oferecer uma experiência de compra personalizada."
    },
    {
        icon: Award,
        title: "Tradição e Confiança",
        description: "Mais de duas décadas servindo a comunidade com integridade e excelência."
    },
    {
        icon: TrendingUp,
        title: "Inovação Contínua",
        description: "Investimento constante em tecnologia e processos para melhor atendê-lo."
    }
]

const milestones = [
    {
        year: "1997",
        event: "Fundação do Ana Risorlange",
        description: "Em 11 de abril, inauguramos nossa primeira loja no coração do Bom Jardim, Fortaleza, com 200m² dedicados a servir a comunidade."
    },
    {
        year: "2000",
        event: "Primeira Expansão",
        description: "Ampliamos para 360m², incorporando frigorífico e hortifrúti completos, respondendo à crescente demanda da comunidade."
    },
    {
        year: "2014",
        event: "Início da Nova Era",
        description: "Início da construção de nossa loja de 1.000m², um marco em nossa trajetória de crescimento."
    },
    {
        year: "2015",
        event: "Inauguração da Mega Loja",
        description: "Em outubro, inauguramos nossa loja de 1.000m², oferecendo mais conforto, variedade e modernidade aos nossos clientes."
    },
    {
        year: "2026",
        event: "Transformação Digital",
        description: "Lançamento do aplicativo mobile, conectando tradição e tecnologia para uma experiência de compra completa."
    },
]

const growthMetrics = [
    { value: "200m²", label: "Primeira Loja", year: "1997" },
    { value: "360m²", label: "Expansão Inicial", year: "2000" },
    { value: "1.000m²", label: "Loja Atual", year: "2015" },
]

export function InstitucionalPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section - Asymmetric Layout */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-blue-800 to-blue-950">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[linear-gradient(30deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff),linear-gradient(150deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff),linear-gradient(30deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff),linear-gradient(150deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff)] bg-[length:80px_140px] bg-[position:0_0,0_0,40px_70px,40px_70px]" />
                </div>

                {/* Image Overlay - Left 40% */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-0 top-0 bottom-0 w-[40%] hidden lg:block"
                >
                    <div className="relative h-full w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-primary z-10" />
                        <Image
                            src="/loja/frente_loja.png"
                            alt="Supermercado Ana Risorlange"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Content - Right 60% */}
                <div className="container mx-auto px-4 lg:px-8 relative z-20">
                    <div className="lg:ml-[42%] max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 px-5 py-2 mb-6 backdrop-blur-sm">
                                <Building2 className="h-4 w-4 text-secondary" />
                                <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em]">Institucional</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                                Raízes no<br />
                                <span className="text-secondary">Bom Jardim</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-blue-50/90 mb-8 leading-relaxed font-light">
                                Desde 1997, crescemos junto com a comunidade de Fortaleza,
                                levando qualidade e confiança a cada família.
                            </p>

                            <div className="flex flex-wrap gap-8 text-white">
                                <div>
                                    <div className="text-4xl font-black text-secondary mb-1">29+</div>
                                    <div className="text-sm uppercase tracking-wider text-blue-100/70">Anos de História</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-secondary mb-1">1.000m²</div>
                                    <div className="text-sm uppercase tracking-wider text-blue-100/70">Loja Atual</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-secondary mb-1">+5.000</div>
                                    <div className="text-sm uppercase tracking-wider text-blue-100/70">Produtos</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" />
            </section>

            {/* Our Story - Narrative Section */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px] group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-800 transform group-hover:scale-[0.98] transition-transform duration-500" />
                            <div className="absolute inset-4 border-2 border-secondary/30" />
                            <Image
                                src="/loja/loja_bom jardim.png"
                                alt="História Ana Risorlange"
                                fill
                                className="object-cover p-4 opacity-90"
                            />
                            <div className="absolute top-8 right-8 bg-secondary text-white px-6 py-3 font-black text-lg">
                                EST. 1997
                            </div>
                        </motion.div>

                        {/* Story Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 bg-muted px-5 py-2">
                                <Sparkles className="h-4 w-4 text-secondary" />
                                <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Nossa História</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                                Uma Jornada de<br />Crescimento
                            </h2>

                            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    Em <strong className="text-primary">11 de abril de 1997</strong>, nasceu o Supermercado Ana Risorlange
                                    no coração do bairro Bom Jardim, Fortaleza-CE. Com apenas <strong>200m²</strong>, nossa primeira
                                    loja foi construída sobre um pilar fundamental: servir a comunidade com qualidade e respeito.
                                </p>

                                <p>
                                    O compromisso com nossos clientes rapidamente gerou resultados. A demanda crescente e
                                    o feedback da comunidade nos impulsionaram à primeira expansão: ampliamos para <strong>360m²</strong>,
                                    incorporando frigorífico completo e setor de hortifrúti, oferecendo mais variedade e frescor.
                                </p>

                                <p>
                                    Em 2014, demos início ao nosso projeto mais ambicioso: a construção de uma loja de
                                    <strong className="text-secondary"> 1.000m²</strong>. Inaugurada em outubro de 2015, esta unidade
                                    representa nossa consolidação como referência em qualidade e atendimento, proporcionando
                                    conforto excepcional para clientes, colaboradores e parceiros.
                                </p>

                                <p>
                                    Hoje, seguimos crescendo e inovando, sempre mantendo vivas as raízes que nos conectam
                                    ao Bom Jardim e aos valores que nos trouxeram até aqui.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Growth Evolution */}
            <section className="py-20 bg-muted">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Evolução Contínua</h2>
                        <p className="text-xl text-gray-600">Nossa trajetória de crescimento em números</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {growthMetrics.map((metric, index) => (
                            <motion.div
                                key={metric.year}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative group"
                            >
                                <div className="bg-white p-10 border-2 border-primary relative overflow-hidden group-hover:border-secondary transition-all duration-300">
                                    {/* Year Badge */}
                                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 text-xs font-bold group-hover:bg-secondary transition-colors">
                                        {metric.year}
                                    </div>

                                    {/* Icon */}
                                    <Store className="h-12 w-12 text-secondary mb-6" />

                                    {/* Value */}
                                    <div className="text-5xl font-black text-primary mb-3 group-hover:text-secondary transition-colors">
                                        {metric.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm uppercase tracking-wider text-gray-600 font-bold">
                                        {metric.label}
                                    </div>

                                    {/* Progress Indicator */}
                                    {index < growthMetrics.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="h-8 w-8 text-secondary" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-muted p-12 border-l-4 border-secondary">
                                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 mb-6">
                                    <Target className="h-5 w-5 text-secondary" />
                                    <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Missão</span>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-6">Nossa Missão</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Proporcionar uma experiência de compra excepcional, oferecendo produtos de alta qualidade
                                    com preços justos, atendimento diferenciado e soluções que superam expectativas,
                                    contribuindo ativamente para o bem-estar e desenvolvimento da nossa comunidade.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-muted p-12 border-l-4 border-primary">
                                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 mb-6">
                                    <Eye className="h-5 w-5 text-primary" />
                                    <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Visão</span>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-6">Nossa Visão</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Consolidar-nos como o supermercado referência em Fortaleza, reconhecido pela
                                    excelência no atendimento, inovação constante, responsabilidade social e compromisso
                                    genuíno com o crescimento sustentável da região que chamamos de lar.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-gradient-to-b from-muted to-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 mb-6">
                            <Heart className="h-4 w-4" />
                            <span className="font-bold text-xs uppercase tracking-[0.2em]">Valores</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                            Nossos Princípios
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Valores fundamentais que orientam cada decisão e ação
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                                className="bg-white p-8 relative group overflow-hidden border-2 border-transparent hover:border-secondary transition-all duration-300"
                            >
                                {/* Hover Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon */}
                                <div className="relative bg-primary p-4 w-fit mb-6 group-hover:bg-secondary transition-colors duration-300">
                                    <value.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="relative text-xl font-black text-gray-900 mb-4 leading-tight">
                                    {value.title}
                                </h3>
                                <p className="relative text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-secondary group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 bg-muted px-5 py-2 mb-6">
                            <Calendar className="h-4 w-4 text-secondary" />
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Trajetória</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                            Marcos Históricos
                        </h2>
                        <p className="text-xl text-gray-600">
                            Cada passo da nossa jornada rumo à excelência
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

                        <div className="space-y-16">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-col gap-8`}
                                >
                                    {/* Content */}
                                    <div className="flex-1 md:text-right md:even:text-left">
                                        <div className={`inline-block bg-primary text-white px-6 py-2 mb-4 font-black text-2xl ${index % 2 === 0 ? 'md:float-right' : 'md:float-left'
                                            }`}>
                                            {milestone.year}
                                        </div>
                                        <div className="clear-both bg-muted p-8 border-l-4 border-secondary hover:shadow-2xl transition-shadow duration-300">
                                            <h3 className="text-2xl font-black text-gray-900 mb-3">
                                                {milestone.event}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Point */}
                                    <div className="relative flex-shrink-0 hidden md:block">
                                        <div className="w-6 h-6 bg-secondary border-4 border-white shadow-lg rounded-full" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-secondary/20 rounded-full animate-ping" />
                                    </div>

                                    {/* Spacer */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary via-blue-800 to-blue-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[180px]" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-4 text-center relative z-10 max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2 mb-8 backdrop-blur-sm">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span className="text-white font-bold text-xs uppercase tracking-[0.2em]">Visite-nos</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                        Faça Parte da<br />
                        <span className="text-secondary">Nossa História</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-blue-50/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Conheça nossas lojas e descubra por que somos a escolha de milhares de famílias em Fortaleza
                    </p>

                    <motion.a
                        href="/onde-estamos"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-secondary hover:bg-orange-600 text-white font-black px-12 py-6 text-lg shadow-2xl transition-all duration-300 group"
                    >
                        <MapPin className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                        Encontre Nossa Loja
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </motion.a>

                    <div className="mt-12 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-12 text-center">
                        <div>
                            <div className="text-3xl font-black text-secondary mb-2">Rua Maria Júlia, 980</div>
                            <div className="text-sm uppercase tracking-wider text-blue-100/70">Bom Jardim, Fortaleza-CE</div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
