import fetch from "node-fetch";
import fs from "fs";

const baseUrl = "http://localhost:3000/api/progress";
const levelUpUrl = "http://localhost:3000/api/level-up";
const energyUrl = "http://localhost:3000/api/energy";

const testCases = [
  { desc: "Geçersiz kart", body: { cardId: "invalid" }, expectStatus: 400 },
  {
    desc: "Enerji sıfır",
    body: { cardId: "card1", clickCount: 1 },
    expectStatus: 400,
  },
  {
    desc: "Progress 100",
    body: { cardId: "card1", clickCount: 100 },
    expectStatus: 200,
  },
  {
    desc: "Rate limit",
    body: { cardId: "card1", clickCount: 1 },
    expectStatus: 429,
  },
  {
    desc: "Başarılı progress",
    body: { cardId: "card2", clickCount: 1 },
    expectStatus: 200,
  },
];

const data = {
  mockEnergy: 100,
  lastEnergyUpdate: 0,
  mockCardProgress: {
    card1: { progress: 100, level: 1 }, // level-up için hazır
    card2: { progress: 40, level: 1 }, // normal progress için
  },
};

fs.writeFileSync("src/lib/data.json", JSON.stringify(data, null, 2));

(async () => {
  for (const test of testCases) {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(test.body),
    });
    const result = await res.json();
    const ok = res.status === test.expectStatus;
    console.log(
      `[progress] [${test.desc}] Status: ${res.status} ${ok ? "✔️" : "❌"}`,
      result
    );
  }

  // /api/level-up endpointi testleri
  // Başarılı seviye atlama
  let res = await fetch(levelUpUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId: "card1" }),
  });
  let result = await res.json();
  console.log(
    `[level-up] Başarılı seviye atlama: Status ${res.status} ${
      res.status === 200 ? "✔️" : "❌"
    }`,
    result
  );

  // Progress < 100 iken seviye atlama (başarısız)
  res = await fetch(levelUpUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId: "card2" }),
  });
  result = await res.json();
  console.log(
    `[level-up] Progress < 100: Status ${res.status} ${
      res.status === 400 ? "✔️" : "❌"
    }`,
    result
  );

  // Geçersiz kart
  res = await fetch(levelUpUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId: "invalid" }),
  });
  result = await res.json();
  console.log(
    `[level-up] Geçersiz kart: Status ${res.status} ${
      res.status === 400 ? "✔️" : "❌"
    }`,
    result
  );

  // /api/energy endpointi testleri
  res = await fetch(energyUrl, { method: "GET" });
  result = await res.json();
  console.log(
    `[energy] GET enerji: Status ${res.status} ${
      res.status === 200 ? "✔️" : "❌"
    }`,
    result
  );

  // Yanlış method
  res = await fetch(energyUrl, { method: "POST" });
  result = await res.json();
  console.log(
    `[energy] POST method not allowed: Status ${res.status} ${
      res.status === 405 ? "✔️" : "❌"
    }`,
    result
  );
})();
