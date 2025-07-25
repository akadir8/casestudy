import { items } from "../data/items"
import Link from "next/link"

export default function ItemsPage() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen text-white">
      {/* Header */}
      <div className="mb-8 flex justify-end">
        <Link href="/">
          <button className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl overflow-hidden">
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

            {/* Home Icon */}
            <div className="relative z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12h6v10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
              </svg>
            </div>

            <span className="relative z-10">Ana Sayfa</span>

            {/* Arrow Icon */}
            <div className="relative z-10 transition-transform duration-200 group-hover:-translate-x-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[200%] group-hover:translate-x-[-200%] transition-transform duration-700"></div>
          </button>
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
        Kart Koleksiyonu
      </h1>

      {/* Items Grid */}
      {items.map((item) => (
        <div key={item.id} className="mb-16">
          {/* Item Category Title */}
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {item.name}
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {item.levels.map((level) => (
              <div
                key={level.level}
                className="group relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 border border-slate-700/30 rounded-2xl p-6 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 hover:border-slate-600/50"
              >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent rounded-2xl"></div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Image Container */}
                  <div className="relative mb-4">
                    <div className="relative mx-auto w-28 h-28 rounded-xl overflow-hidden shadow-lg ring-2 ring-slate-700/50">
                      <img
                        src={level.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg border border-amber-300/30 mb-3">
                    Seviye {level.level}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{level.description}</div>
                </div>

                {/* Card Border Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
