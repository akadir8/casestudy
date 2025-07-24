import { useEffect, useState } from "react";
import Head from "next/head";
import { Card } from "../types";
import { cards as initialCards } from "../data/card";
import CardItem from "../components/Card";
import EnergyBar from "../components/EnergyBar";
import React from "react";
import Link from "next/link";

export default function HomePage() {
  const [energy, setEnergy] = useState(100);
  const [cards, setCards] = useState<Card[]>([]);
  const [regenIn, setRegenIn] = useState<number | null>(null); // saniye cinsinden
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "sv1" | "sv2" | "max">(
    "all"
  );

  // Enerji ve kalan süreyi güncelle
  const fetchEnergyAndTimer = async () => {
    try {
      const res = await fetch("/api/energy");
      const data = await res.json();
      setEnergy(data.energy);
      // Enerji 100 değilse kalan süreyi hesapla
      if (data.energy < 100) {
        // Sunucu zamanına güvenemeyiz, client timer başlat
        const now = Date.now();
        const msToNext = 60000 - (now % 60000);
        setRegenIn(Math.ceil(msToNext / 1000));
      } else {
        setRegenIn(null);
      }
    } catch (err) {
      setError("Enerji alınamadı. Lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    fetchEnergyAndTimer();
    setCards(initialCards); // mock veriyi yükle
  }, []);

  // Enerji yenilenme sayaç mantığı
  useEffect(() => {
    if (energy >= 100) return;
    if (regenIn === null) return;
    const timer = setInterval(() => {
      setRegenIn(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          fetchEnergyAndTimer();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [regenIn, energy]);

  // Debounce ve batch click mantığı
  const clickBuffer = React.useRef<{ [cardId: string]: number }>({});
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleDevelop = (cardId: string) => {
    clickBuffer.current[cardId] = (clickBuffer.current[cardId] || 0) + 1;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const count = clickBuffer.current[cardId];
      clickBuffer.current[cardId] = 0;
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId, clickCount: count }),
        });
        if (!res.ok) {
          const msg = await res.text();
          setError("API hatası: " + msg);
          return;
        }
        const data = await res.json();
        setCards(prev =>
          prev.map(card =>
            card.id === cardId
              ? { ...card, progress: data.progress, level: data.level }
              : card
          )
        );
        setEnergy(data.energy);
      } catch (err) {
        setError("İstek hatası. Lütfen tekrar deneyin.");
      }
    }, 200); // 200ms debounce
  };

  // Hata mesajını 3 saniye sonra otomatik gizle
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(t);
  }, [error]);

  // Sekme filtreleme fonksiyonu
  const getFilteredCards = () => {
    if (activeTab === "all") return cards;
    if (activeTab === "sv1") return cards.filter(card => card.level === 1);
    if (activeTab === "sv2") return cards.filter(card => card.level === 2);
    if (activeTab === "max") {
      const maxLevel = Math.max(...cards.map(card => card.level));
      return cards.filter(card => card.level === maxLevel);
    }
    return cards;
  };

  return (
    <>
      <Head>
        <title>Case Study | Kart Geliştirme</title>
      </Head>

      <main className="min-h-screen bg-gray-900 text-white p-6">
        <div className="mb-4 flex justify-end">
          <Link href="/items">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2 rounded shadow transition">
              Koleksiyon
            </button>
          </Link>
        </div>
        {error && (
          <div className="mb-4 bg-red-700 text-white px-4 py-2 rounded shadow text-center animate-pulse">
            {error}
          </div>
        )}
        {/* Enerji göstergesi */}
        <EnergyBar value={energy} regenIn={regenIn} />

        {/* Sekmeler */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded font-bold ${
              activeTab === "all"
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white"
            }`}
          >
            Tüm Seviyeler
          </button>
          <button
            onClick={() => setActiveTab("sv1")}
            className={`px-4 py-2 rounded font-bold ${
              activeTab === "sv1"
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white"
            }`}
          >
            Sv1
          </button>
          <button
            onClick={() => setActiveTab("sv2")}
            className={`px-4 py-2 rounded font-bold ${
              activeTab === "sv2"
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white"
            }`}
          >
            Sv2
          </button>
          <button
            onClick={() => setActiveTab("max")}
            className={`px-4 py-2 rounded font-bold ${
              activeTab === "max"
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-700 text-white"
            }`}
          >
            Max Sv
          </button>
        </div>

        {/* Kartlar listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {getFilteredCards().map(card => (
            <CardItem
              key={card.id}
              card={card}
              onDevelop={() => handleDevelop(card.id)}
              energy={energy}
            />
          ))}
        </div>
      </main>
    </>
  );
}
