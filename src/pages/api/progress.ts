import type { NextApiRequest, NextApiResponse } from "next";
import {
  mockCardProgress,
  mockEnergy,
  setMockEnergy,
  updateCardProgress,
  getAutoRegenEnergy,
} from "../../lib/mockData";

import {
  calculateProgress,
  calculateEnergyAfterClick,
  shouldLevelUp,
} from "../../utils/helpers";

// Basit rate limit (IP başına saniyede 5 istek)
const rateLimitMap: { [ip: string]: { count: number; last: number } } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Rate limit kontrolü
  const ip =
    req.headers["x-forwarded-for"]?.toString() ||
    req.socket.remoteAddress ||
    "";
  const now = Math.floor(Date.now() / 1000);
  if (!rateLimitMap[ip] || rateLimitMap[ip].last !== now) {
    rateLimitMap[ip] = { count: 1, last: now };
  } else {
    rateLimitMap[ip].count++;
    if (rateLimitMap[ip].count > 5) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please slow down." });
    }
  }

  const { cardId, clickCount = 1 } = req.body;

  // Geçersiz kart ID veya clickCount kontrolü
  if (
    !cardId ||
    !mockCardProgress[cardId] ||
    typeof clickCount !== "number" ||
    clickCount < 1
  ) {
    return res.status(400).json({ message: "Invalid card ID or clickCount" });
  }

  // Enerji kontrolü
  const currentEnergy = getAutoRegenEnergy();
  if (currentEnergy <= 0) {
    return res.status(400).json({ message: "Not enough energy" });
  }

  // Mevcut kart bilgisi
  const cardData = mockCardProgress[cardId];
  let progress = cardData.progress;
  let level = cardData.level;
  let levelUp = false;
  let usedClicks = 0;
  let usedEnergy = 0;

  for (let i = 0; i < clickCount; i++) {
    if (progress >= 100 || currentEnergy - usedEnergy <= 0) break;
    progress = calculateProgress(progress);
    usedClicks++;
    usedEnergy++;
    if (shouldLevelUp(progress)) {
      progress = 0;
      level += 1;
      levelUp = true;
    }
  }

  // Verileri güncelle
  updateCardProgress(cardId, { progress, level });
  setMockEnergy(currentEnergy - usedEnergy);

  // Yanıt döndür
  return res.status(200).json({
    progress,
    level,
    energy: mockEnergy,
    usedClicks,
    levelUp,
  });
}

// Basit test fonksiyonu (sadece development için)
export async function testProgressApi() {
  const fetch = (await import("node-fetch")).default;
  const baseUrl = "http://localhost:3000/api/progress";
  const testCases = [
    { desc: "Geçersiz kart", body: { cardId: "invalid" } },
    { desc: "Enerji sıfır", body: { cardId: "card1", clickCount: 1 } },
    { desc: "Progress 100", body: { cardId: "card1", clickCount: 100 } },
    { desc: "Rate limit", body: { cardId: "card1", clickCount: 1 } },
  ];
  for (const test of testCases) {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(test.body),
    });
    const data = await res.json();
    console.log(`[${test.desc}] Status: ${res.status}, Response:`, data);
  }
}
