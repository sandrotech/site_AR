"use client"

import { motion } from "framer-motion"
import { Calendar, Tag, ArrowRight, Sparkles, TrendingUp, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Mock blog posts data
const blogPosts = [
    {
        slug: "promocao-carnes-especiais",
        title: "Promoção Especial de Carnes Premium",
        excerpt: "Aproveite descontos incríveis em cortes nobres selecionados",
        category: "Campanhas",
        date: "2026-02-05",
        image: "/cards/card_cartao.jpeg",
        featured: true
    },
    {
        slug: "movimente-se-fevereiro",
        title: "Movimente-se: Aulas de Ritmos e Ginástica",
        excerpt: "Participe das nossas aulas gratuitas de atividade física. Toda segunda e quarta!",
        category: "Eventos",
        date: "2026-02-03",
        image: "/cards/card_clube.png",
        featured: true
    },
    {
        slug: "dicas-economia-feira",
        title: "10 Dicas Para Economizar na Feira do Mês",
        excerpt: "Saiba como planejar suas compras e aproveitar melhor seu orçamento",
        category: "Dicas",
        date: "2026-02-01",
        image: "/cards/card_app.jpeg",
        featured: false
    },
    {
        slug: "aniversario-loja-bom-jardim",
        title: "Aniversário da Loja Bom Jardim",
        excerpt: "Celebre conosco 28 anos servindo a comunidade com ofertas especiais",
        category: "Eventos",
        date: "2026-01-28",
        image: "/cards/card_Cartao2.jpeg",
        featured: false
    },
    {
        slug: "novidades-no-ar",
        title: "Novidades no AR: Confira os Lançamentos",
        excerpt: "Produtos exclusivos chegando nas nossas prateleiras esta semana",
        category: "Novidades",
        date: "2026-01-25",
        image: "/cards/card_app_loja.png",
        featured: false
    }
]

const categories = ["Todos", "Campanhas", "Eventos", "Dicas", "Novidades"]

export function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 relative z-10"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full mb-8 border border-white/20 backdrop-blur-sm"
                        >
                            <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
                            <span className="text-white font-bold text-sm uppercase tracking-wider">Blog & Mídias</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Fique por dentro das <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-300">novidades</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 font-medium">
                            Eventos, campanhas, dicas e muito mais para você aproveitar ao máximo!
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-gray-200 sticky top-[88px] z-40">
                <div className="container mx-auto px-4">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${index === 0
                                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="h-6 w-6 text-secondary" />
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Em Destaque</h2>
                        </div>
                        <p className="text-lg text-gray-600">As novidades mais quentes do momento</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {blogPosts.filter(post => post.featured).map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="relative h-72 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="inline-block bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(post.date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                                            <span>Leia mais</span>
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>

                    {/* All Posts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Todas as Publicações</h2>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {blogPosts.filter(post => !post.featured).map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(post.date).toLocaleDateString('pt-BR')}
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-3 transition-all">
                                            <span>Continuar lendo</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-gradient-to-br from-primary to-blue-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-4 text-center relative z-10 max-w-3xl"
                >
                    <Sparkles className="h-12 w-12 text-secondary mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                        Não perca nenhuma novidade!
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Receba em primeira mão nossas promoções, eventos e dicas especiais
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-secondary/50"
                        />
                        <Button className="bg-secondary hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform">
                            Inscrever-se
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
