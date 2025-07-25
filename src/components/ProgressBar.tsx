interface Props {
    value: number // 0 - 100
  }
  
  export default function ProgressBar({ value }: Props) {
    return (
      <div className="w-full h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full mt-2 overflow-hidden relative shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transition-all duration-500 ease-out rounded-full relative overflow-hidden"
          style={{ width: `${value}%` }}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>
        </div>
  
        {/* Glow Effect */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur-sm transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
  
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow-lg">
          %{value}
        </span>
      </div>
    )
  }
  