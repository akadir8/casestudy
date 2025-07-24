interface EnergyBarProps {
  value: number; // 0 - 100
  regenIn?: number | null;
}

export default function EnergyBar({ value, regenIn }: EnergyBarProps) {
  return (
    <div className="mb-8 w-full max-w-xl mx-auto">
      <div className="flex items-center mb-1">
        {/* Enerji ikon SVG */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="mr-2"
        >
          <path
            d="M13 2L3 14h9l-1 8L21 10h-8l1-8z"
            fill="#fbbf24"
            stroke="#f59e42"
            strokeWidth="1.5"
          />
        </svg>
        <span className="text-xl font-bold text-yellow-400">Enerji</span>
        <span className="ml-auto text-lg font-bold text-pink-400">
          %{value}
        </span>
      </div>
      {regenIn !== null && value < 100 && (
        <div className="text-xs text-gray-300 mb-1 ml-8">
          %1 Yenilenmesine Kalan: {regenIn} sn
        </div>
      )}
      <div className="w-full h-6 bg-gray-700 rounded-full relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 transition-all duration-300 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      {value === 100 && (
        <div className="text-green-400 bg-green-900 rounded px-2 py-1 mt-1 inline-block">
          Enerji dolu!
        </div>
      )}
    </div>
  );
}
