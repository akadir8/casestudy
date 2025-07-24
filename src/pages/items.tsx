import { items } from "../data/items";
import Link from "next/link";

export default function ItemsPage() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="mb-4 flex justify-end">
        <Link href="/">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2 rounded shadow transition">
            Ana Sayfa
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Kart Koleksiyonu</h1>
      {items.map(item => (
        <div key={item.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {item.levels.map(level => (
              <div
                key={level.level}
                className="bg-gray-800 rounded-xl p-4 text-center shadow-lg"
              >
                <img
                  src={level.image}
                  alt={item.name}
                  className="mx-auto mb-2 rounded-lg h-28 object-contain"
                />
                <div className="font-bold text-lg mb-1">
                  Seviye {level.level}
                </div>
                <div className="text-xs text-gray-300 whitespace-pre-line">
                  {level.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
