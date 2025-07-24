import Image from "next/image";
import { Card } from "../types";
import ProgressBar from "./ProgressBar";

interface Props {
  card: Card;
  onDevelop: () => void;
  energy?: number;
}

export default function CardItem({ card, onDevelop, energy = 0 }: Props) {
  const isDisabled = card.progress >= 100 || energy <= 0;
  const isEnergyZero = energy <= 0;
  const isMaxProgress = card.progress >= 100;
  return (
    <div
      className={`relative p-4 rounded-lg shadow w-full max-w-xs ${
        isEnergyZero
          ? "bg-gray-600 text-gray-400"
          : "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 text-white"
      } transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
    >
      <Image
        src={card.image}
        alt={card.name}
        width={128}
        height={128}
        className="rounded-xl mx-auto shadow-lg"
      />
      <h2 className="text-lg mt-4 font-bold text-center">{card.name}</h2>
      <p className="text-xs text-gray-300 mb-1 text-center">
        {card.description}
      </p>
      <p className="text-sm font-semibold text-yellow-400 text-center mb-1">
        Seviye: {card.level}
      </p>
      <ProgressBar value={card.progress} />
      <div className="flex flex-row gap-2 mt-1 mb-1 justify-center">
        <span className="bg-pink-700 text-white text-xs px-2 py-0.5 rounded-full">
          %{card.progress}
        </span>
        <span className="bg-yellow-500 text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold">
          -1 Enerji
        </span>
      </div>
      <button
        className={`mt-2 px-4 py-2 rounded-lg text-white font-bold transition-all duration-200 ${
          isMaxProgress
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-pink-600 hover:bg-pink-700"
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} w-full`}
        onClick={onDevelop}
        disabled={isDisabled}
      >
        {isMaxProgress ? "Yükselt" : "Geliştir"}
      </button>
      {isEnergyZero && (
        <div className="absolute top-2 right-2 bg-red-700 text-white text-xs px-2 py-1 rounded shadow">
          Enerji yok
        </div>
      )}
    </div>
  );
}
