// src/lib/mockData.ts

import fs from "fs";
import path from "path";

export let mockEnergy = 100;
export let lastEnergyUpdate = Date.now(); // ms cinsinden zaman damgası

export const mockCardProgress: {
  [key: string]: { progress: number; level: number };
} = {
  card1: { progress: 76, level: 1 },
  card2: { progress: 40, level: 1 },
};

const DATA_FILE = path.resolve(process.cwd(), "src/lib/data.json");

function loadDataFromFile() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const data = JSON.parse(raw);
      if (typeof data.mockEnergy === "number") mockEnergy = data.mockEnergy;
      if (typeof data.lastEnergyUpdate === "number")
        lastEnergyUpdate = data.lastEnergyUpdate;
      if (typeof data.mockCardProgress === "object") {
        Object.assign(mockCardProgress, data.mockCardProgress);
      }
    } catch (e) {
      // Dosya bozuksa ignore et
    }
  }
}

function saveDataToFile() {
  const data = {
    mockEnergy,
    lastEnergyUpdate,
    mockCardProgress,
  };
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    // Yazma hatası olursa ignore et
  }
}

// Sunucu başlatıldığında veriyi yükle
loadDataFromFile();

// Enerjiyi güncellemek için setter fonksiyon (şart değil ama düzenli olur)
export function setMockEnergy(value: number) {
  mockEnergy = value;
  saveDataToFile();
}

export function getAutoRegenEnergy() {
  const now = Date.now();
  const maxEnergy = 100;
  const regenInterval = 60 * 1000; // 1 dakika
  if (mockEnergy >= maxEnergy) {
    lastEnergyUpdate = now;
    return mockEnergy;
  }
  const elapsed = now - lastEnergyUpdate;
  const regenAmount = Math.floor(elapsed / regenInterval);
  if (regenAmount > 0) {
    mockEnergy = Math.min(mockEnergy + regenAmount, maxEnergy);
    lastEnergyUpdate += regenAmount * regenInterval;
  }
  return mockEnergy;
}

export function updateCardProgress(
  cardId: string,
  data: { progress: number; level: number }
) {
  if (mockCardProgress[cardId]) {
    mockCardProgress[cardId] = data;
    saveDataToFile();
  }
}
