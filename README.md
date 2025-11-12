# Weather Insights Dashboard 🌤️

Historical weather data visualization with React 18, TypeScript, and Open-Meteo API.

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:5173

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- **Overview Page** - Daily weather with 3 interactive charts (Temperature, Precipitation, Wind Speed)
- **Details Page** - Hourly data with dual Y-axis chart (select 1-2 parameters)
- **Filters** - Date range (max 3 months), Location (6 cities), Parameters (6 metrics)
- **Responsive** - Works on tablet to desktop
- **Performance** - Lazy loading, caching, optimized bundle

## 🛠️ Tech Stack

- React 18 + TypeScript
- Zustand (state management)
- React Query (data fetching)
- Tailwind CSS + shadcn/ui (styling)
- Recharts (charts)
- Vite (build tool)

## 🌍 Locations

New York 🇺🇸 | London 🇬🇧 | Tokyo 🇯🇵 | Sydney 🇦🇺 | Mumbai 🇮🇳 | São Paulo 🇧🇷

## 📦 Deployment

**Netlify:**
1. `npm run build`
2. Deploy `dist/` folder
3. Build settings: Command `npm run build` | Directory `dist`

**Or connect GitHub repo for auto-deploy**

## 📚 Documentation

- **README.md** (this file) - Setup instructions
- **TECHNICAL_DECISIONS.md** - Architecture, code organization, and technical decisions

## 👨‍💻 Author

**Hemanth R** - Built for Coulomb AI
