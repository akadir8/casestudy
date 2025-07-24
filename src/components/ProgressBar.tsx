interface Props {
  value: number; // 0 - 100
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="w-full h-5 bg-gray-700 rounded mt-2 overflow-hidden relative">
      <div
        className="h-full bg-pink-500 transition-all duration-300 rounded flex items-center justify-center"
        style={{ width: `${value}%` }}
      >
        {/* Barın içi boşsa yazı koyu arka planda görünmesin */}
      </div>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow">
        %{value}
      </span>
    </div>
  );
}
