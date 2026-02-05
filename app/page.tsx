"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFAB } from "@/components/whatsapp-fab"
import { HomePage } from "@/components/pages/home-page"
import { EncartesPage } from "@/components/pages/encartes-page"
import { LojasPage } from "@/components/pages/lojas-page"
import { ParceirosPage } from "@/components/pages/parceiros-page"
import { TrabalhePage } from "@/components/pages/trabalhe-page"
import { PageSkeleton } from "@/components/skeleton-loader"
import { AnimatePresence, motion } from "framer-motion"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Show brief loading when changing pages
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "encartes":
        return <EncartesPage />
      case "lojas":
        return <LojasPage />
      case "parceiros":
        return <ParceirosPage />
      case "trabalhe":
        return <TrabalhePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PageSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  )
}
