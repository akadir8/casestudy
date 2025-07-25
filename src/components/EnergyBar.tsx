interface EnergyBarProps {
    value: number // 0 - 100
    regenIn?: number | null
  }
  
  export default function EnergyBar({ value, regenIn }: EnergyBarProps) {
    return (
      <div className="mb-8 w-full max-w-xl mx-auto">
        <div className="flex items-center mb-2">
          {/* Enerji ikon SVG */}
          <div className="relative">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mr-3 drop-shadow-lg">
              <path
                d="M13 2L3 14h9l-1 8L21 10h-8l1-8z"
                fill="url(#lightning-gradient)"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
            {value === 100 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            )}
          </div>
  
          <span className="text-xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
            Enerji
          </span>
  
          <span className="ml-auto text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            %{value}
          </span>
        </div>
  
        {regenIn !== null && value < 100 && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 ml-8">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            <span>
              %1 Yenilenmesine Kalan: <span className="text-amber-300 font-semibold">{regenIn} sn</span>
            </span>
          </div>
        )}
  
        <div className="w-full h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full relative overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-amber-400 to-pink-500 transition-all duration-500 ease-out rounded-full relative overflow-hidden"
            style={{ width: `${value}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full"></div>
          </div>
  
          {/* Glow Effect */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400/60 via-amber-400/60 to-pink-400/60 rounded-full blur-sm transition-all duration-500"
            style={{ width: `${value}%` }}
          ></div>
        </div>
  
        {value === 100 && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full px-3 py-1.5 mt-2 inline-block backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-semibold text-sm">Enerji dolu!</span>
          </div>
        )}
      </div>
    )
  }
  