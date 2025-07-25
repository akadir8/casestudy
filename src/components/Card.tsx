"use client"

import Image from "next/image"
import type { Card } from "../types"
import ProgressBar from "./ProgressBar"

interface Props {
  card: Card
  onDevelop: () => void
  energy?: number
}

export default function CardItem({ card, onDevelop, energy = 0 }: Props) {
  const isDisabled = card.progress >= 100 || energy <= 0
  const isEnergyZero = energy <= 0
  const isMaxProgress = card.progress >= 100

  return (
    <div className="group relative w-full max-w-xs">
      {/* Energy Warning Badge */}
      {isEnergyZero && (
        <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-red-400/30">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            Enerji yok
          </div>
        </div>
      )}

      {/* Main Card */}
      <div
        className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
          isEnergyZero
            ? "bg-slate-800/60 border-slate-700/50 text-slate-400"
            : "bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 border-slate-700/30 text-white hover:border-slate-600/50"
        } ${!isDisabled ? "hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10" : ""}`}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent"></div>

        {/* Content Container */}
        <div className="relative p-6">
          {/* Character Image */}
          <div className="relative mb-4">
            <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-2 ring-slate-700/50">
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.name}
                width={128}
                height={128}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Level Badge */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-amber-300/30">
                Seviye: {card.level}
              </div>
            </div>
          </div>

          {/* Card Info */}
          <div className="text-center space-y-3 mt-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {card.name}
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed px-2">{card.description}</p>

            {/* Progress Section */}
            <div className="space-y-3">
              <ProgressBar value={card.progress} />

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full px-3 py-1.5">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-purple-300">%{card.progress}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full px-3 py-1.5">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-amber-300">-1 Enerji</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              className={`relative w-full mt-4 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden ${
                isMaxProgress
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/25"
              } ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              }`}
              onClick={onDevelop}
              disabled={isDisabled}
            >
              {/* Button Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

              <span className="relative z-10">{isMaxProgress ? "Yükselt" : "Geliştir"}</span>
            </button>
          </div>
        </div>

        {/* Card Border Glow Effect */}
        {!isEnergyZero && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        )}
      </div>
    </div>
  )
}
