"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import type { Card } from "../types"
import { cards as initialCards } from "../data/card"
import CardItem from "../components/Card"
import EnergyBar from "../components/EnergyBar"
import React from "react"
import Link from "next/link"

export default function HomePage() {
  const [energy, setEnergy] = useState(100)
  const [cards, setCards] = useState<Card[]>([])
  const [regenIn, setRegenIn] = useState<number | null>(null) // saniye cinsinden
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "sv1" | "sv2" | "max">("all")

  // Enerji ve kalan süreyi güncelle
  const fetchEnergyAndTimer = async () => {
    try {
      const res = await fetch("/api/energy")
      const data = await res.json()
      setEnergy(data.energy)
      // Enerji 100 değilse kalan süreyi hesapla
      if (data.energy < 100) {
        // Sunucu zamanına güvenemeyiz, client timer başlat
        const now = Date.now()
        const msToNext = 60000 - (now % 60000)
        setRegenIn(Math.ceil(msToNext / 1000))
      } else {
        setRegenIn(null)
      }
    } catch (err) {
      setError("Enerji alınamadı. Lütfen tekrar deneyin.")
    }
  }

  // Kart sayısını arttırmak için ek kartlar oluştur
  const generateAdditionalCards = () => {
    const additionalCards: Card[] = []
    const cardNames = [
      "Ateş Ejderi",
      "Buz Kraliçesi",
      "Gölge Avcısı",
      "Işık Savaşçısı",
      "Rüzgar Büyücüsü",
      "Toprak Koruyucusu",
      "Su Elementali",
      "Yıldırım Lordü",
      "Karanlık Şövalye",
      "Altın Föniks",
      "Kristal Golem",
      "Mistik Kahin",
      "Savaş Tanrısı",
      "Doğa Ruhu",
      "Zaman Büyücüsü",
      "Uzay Gezgini",
    ]

    const descriptions = [
      "Güçlü saldırı yetenekleri",
      "Savunma odaklı karakter",
      "Hızlı ve çevik savaşçı",
      "Büyülü güçlere sahip",
      "Elementel kontrolü",
      "Doğa ile bağlantılı",
      "Mistik yetenekleri olan",
      "Efsanevi güçlere sahip",
    ]

    for (let i = 0; i < 16; i++) {
      additionalCards.push({
        id: `card-${initialCards.length + i + 1}`,
        name: cardNames[i % cardNames.length],
        description: descriptions[i % descriptions.length],
        image: `/placeholder.svg?height=128&width=128&query=${cardNames[i % cardNames.length]}`,
        level: Math.floor(Math.random() * 5) + 1, // 1-5 arası random level
        progress: Math.floor(Math.random() * 100), // 0-99 arası random progress
      })
    }

    return additionalCards
  }

  useEffect(() => {
    fetchEnergyAndTimer()
    // Orijinal kartlar + ek kartlar
    const allCards = [...initialCards, ...generateAdditionalCards()]
    setCards(allCards)
  }, [])

  // Enerji yenilenme sayaç mantığı
  useEffect(() => {
    if (energy >= 100) return
    if (regenIn === null) return

    const timer = setInterval(() => {
      setRegenIn((prev) => {
        if (prev === null) return null
        if (prev <= 1) {
          fetchEnergyAndTimer()
          return null
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [regenIn, energy])

  // Debounce ve batch click mantığı
  const clickBuffer = React.useRef<{ [cardId: string]: number }>({})
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const handleDevelop = (cardId: string) => {
    clickBuffer.current[cardId] = (clickBuffer.current[cardId] || 0) + 1

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

    debounceTimeout.current = setTimeout(async () => {
      const count = clickBuffer.current[cardId]
      clickBuffer.current[cardId] = 0

      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId, clickCount: count }),
        })

        if (!res.ok) {
          const msg = await res.text()
          setError("API hatası: " + msg)
          return
        }

        const data = await res.json()
        setCards((prev) =>
          prev.map((card) => (card.id === cardId ? { ...card, progress: data.progress, level: data.level } : card)),
        )
        setEnergy(data.energy)
      } catch (err) {
        setError("İstek hatası. Lütfen tekrar deneyin.")
      }
    }, 200) // 200ms debounce
  }

  // Hata mesajını 3 saniye sonra otomatik gizle
  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(null), 3000)
    return () => clearTimeout(t)
  }, [error])

  // Sekme filtreleme fonksiyonu
  const getFilteredCards = () => {
    if (activeTab === "all") return cards
    if (activeTab === "sv1") return cards.filter((card) => card.level === 1)
    if (activeTab === "sv2") return cards.filter((card) => card.level === 2)
    if (activeTab === "max") {
      const maxLevel = Math.max(...cards.map((card) => card.level))
      return cards.filter((card) => card.level === maxLevel)
    }
    return cards
  }

  const tabs = [
    { id: "all", label: "Tüm Seviyeler", icon: "⚡" },
    { id: "sv1", label: "Sv1", icon: "1️⃣" },
    { id: "sv2", label: "Sv2", icon: "2️⃣" },
    { id: "max", label: "Max Sv", icon: "🔥" },
  ] as const

  return (
    <>
      <Head>
        <title>Case Study | Kart Geliştirme</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        {/* Header */}
        <div className="mb-6 flex justify-end">
          <Link href="/items">
            <button className="group relative flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl overflow-hidden">
              {/* Button Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

              {/* Collection Icon */}
              <div className="relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 18v2a2 2 0 002 2h4a2 2 0 002-2v-2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.7"
                  />
                </svg>
              </div>

              <span className="relative z-10">Koleksiyon</span>

              {/* Arrow Icon */}
              <div className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm text-center animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              {error}
            </div>
          </div>
        )}

        {/* Enerji göstergesi */}
        <EnergyBar value={energy} regenIn={regenIn} />

        {/* Modern Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/30 shadow-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 shadow-lg shadow-amber-500/25"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white"
                } ${activeTab !== tab.id ? "hover:scale-[1.02]" : ""}`}
              >
                {/* Active Tab Background Effect */}
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
                )}

                {/* Inactive Tab Hover Effect */}
                {activeTab !== tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                )}

                <span className="relative z-10 text-lg">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>

                {/* Active Tab Indicator */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-slate-900/30 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Active Filter Info */}
          <div className="mt-3 text-center">
            <span className="text-sm text-slate-400">
              Gösterilen kartlar: <span className="text-purple-300 font-semibold">{getFilteredCards().length}</span>
            </span>
          </div>
        </div>

        {/* Kartlar listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {getFilteredCards().map((card) => (
            <CardItem key={card.id} card={card} onDevelop={() => handleDevelop(card.id)} energy={energy} />
          ))}
        </div>
      </main>
    </>
  )
}
