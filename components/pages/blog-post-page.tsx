"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BlogPostPageProps {
    slug: string
}

// Mock data - in production, fetch from CMS/API based on slug
const getPostBySlug = (slug: string) => {
    const posts: Record<string, any> = {
        "promocao-carnes-especiais": {
            title: "Promoção Especial de Carnes Premium",
            category: "Campanhas",
            date: "2026-02-05",
            image: "/cards/card_cartao.jpeg",
            content: `
# Aproveite nossa promoção especial de carnes!

Durante todo o mês de fevereiro, estamos com descontos incríveis em cortes nobres selecionados.

## Destaques da Promoção

- **Picanha Premium**: até 30% de desconto
- **Alcatra de primeira**: até 25% de desconto  
- **Filé Mignon**: até 20% de desconto

### Como aproveitar?

Visite qualquer uma de nossas lojas e apresente este cupom na seção de açougue. Válido até 28/02/2026.

**Não perca essa oportunidade!** Carnes fresquíssimas, selecionadas diariamente pelos nossos especialistas.
      `
        },
        "movimente-se-fevereiro": {
            title: "Movimente-se: Aulas de Ritmos e Ginástica",
            category: "Eventos",
            date: "2026-02-03",
            image: "/cards/card_clube.png",
            content: `
# Cuide da sua saúde com o Ana Risorlange!

Estamos lançando o programa **Movimente-se**, com aulas gratuitas de atividade física para toda a comunidade.

## Programação

**Segundas e Quartas-feiras**  
- **Horário**: 18h às 19h
- **Local**: Estacionamento da Loja Bom Jardim
- **Professores**: Equipe qualificada

### Modalidades

1. Zumba
2. Ginástica funcional
3. Alongamento e relaxamento

Traga roupa confortável e muita disposição! As vagas são limitadas.
      `
        }
    }

    return posts[slug] || {
        title: "Post não encontrado",
        category: "Geral",
        date: "2026-01-01",
        image: "/cards/card_app.jpeg",
        content: "Conteúdo não disponível"
    }
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
    const post = getPostBySlug(slug)

    return (
        <div className="min-h-screen bg-background">
            {/* Back Button */}
            <div className="bg-white border-b border-gray-200 sticky top-[88px] z-40">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-primary hover:text-blue-800 font-semibold transition-colors group"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        Voltar para o Blog
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 z-20 p-8 pb-12"
                >
                    <div className="container mx-auto max-w-4xl">
                        <span className="inline-block bg-secondary text-white text-sm font-bold px-4 py-2 rounded-full mb-4 shadow-lg">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/90">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                {new Date(post.date).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg max-w-none"
                    >
                        <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                            {post.content.split('\n').map((line: string, index: number) => {
                                if (line.startsWith('# ')) {
                                    return <h2 key={index} className="text-4xl font-black text-gray-900 mt-12 mb-6">{line.substring(2)}</h2>
                                }
                                if (line.startsWith('## ')) {
                                    return <h3 key={index} className="text-3xl font-bold text-gray-900 mt-10 mb-4">{line.substring(3)}</h3>
                                }
                                if (line.startsWith('### ')) {
                                    return <h4 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-3">{line.substring(4)}</h4>
                                }
                                if (line.startsWith('- **')) {
                                    const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
                                    if (match) {
                                        return (
                                            <li key={index} className="ml-6">
                                                <strong className="text-primary">{match[1]}</strong>: {match[2]}
                                            </li>
                                        )
                                    }
                                }
                                if (line.match(/^\d+\. /)) {
                                    return <li key={index} className="ml-6">{line.substring(line.indexOf(' ') + 1)}</li>
                                }
                                if (line.startsWith('**') && line.endsWith('**')) {
                                    return <p key={index} className="font-bold text-xl text-gray-900">{line.replace(/\*\*/g, '')}</p>
                                }
                                if (line.trim()) {
                                    return <p key={index}>{line}</p>
                                }
                                return null
                            })}
                        </div>
                    </motion.article>

                    {/* Share Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 pt-10 border-t border-gray-200"
                    >
                        <div className="flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <Share2 className="h-6 w-6 text-gray-600" />
                                <span className="text-lg font-bold text-gray-900">Compartilhe:</span>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                                >
                                    <Facebook className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all"
                                >
                                    <Twitter className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Related Posts CTA */}
            <section className="py-16 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-4 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                        Veja mais conteúdos
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Descubra outras novidades, eventos e dicas
                    </p>
                    <Link href="/blog">
                        <Button className="bg-primary hover:bg-blue-800 text-white font-bold px-10 py-6 rounded-2xl text-lg shadow-xl hover:scale-105 transition-all">
                            Ir para o Blog
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </div>
    )
}
