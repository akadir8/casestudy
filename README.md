# No Surrender: Card Upgrade System

## 🎯 Project Objective

**No Surrender** is a gamified card upgrade system built as an HTML5-based web application. It allows users to enhance and level up various collectible cards (e.g., weapons, shields, books) by spending energy. As users interact with the system, cards progress and level up automatically once fully upgraded. Energy is limited and replenishes over time. The goal is to provide a seamless, performant, and secure user experience.

---

## 🚀 Features

- Upgrade cards with a single click using the **"Upgrade"** button
- Each click increases card progress by **2%** and consumes **1 energy**
- When progress reaches **100%**, the card levels up and resets progress
- No energy is consumed during level-up
- Energy replenishes automatically over time
- Buttons are disabled when energy is depleted
- Filter cards by level using **tab-based navigation**
- Full **card collection view** with current levels
- Modern, visually appealing UI
- **Security** via server-side rate limiting and input validation
- **Automated tests** for all main API endpoints
- **Persistent data storage** across server restarts

---

## 🛠️ Tech Stack

- **Next.js** – React framework with SSR support
- **React** – Component-based frontend
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first CSS framework for modern UI
- **Node.js (API routes)** – Backend logic and data handling
- **JSON-based mock data** – Lightweight persistence layer
- **node-fetch** – Automated API testing
- **Figma** – Design reference for UI/UX

---

## 📁 Project Structure

src/
├── components/ # UI components (cards, progress bars, energy bars)
├── data/ # Card and collection mock data
├── lib/ # Data persistence and logic
├── pages/ # Main page, API routes, collection page
├── utils/ # Utility functions
scripts/
└── testApi.js # Automated API test script


---

## ⚙️ How It Works

1. Users see their cards on the main screen.
2. Clicking **"Upgrade"** increases progress and consumes energy.
3. When progress reaches **100%**, the card levels up automatically.
4. Energy regenerates over time.
5. The **"Collection"** page shows all cards and their current levels.
6. All APIs are automatically tested using a custom script.

---

## 🧪 Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Run API tests
node scripts/testApi.js


## 📝 Notes
This project is a demo/case study and does not include real authentication or a production database.

All cards and visuals are based on Figma design samples.

For demonstration purposes only.

