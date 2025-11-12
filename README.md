# Weather Insights Dashboard 🌤️

Historical weather data visualization built with React 18, TypeScript, and Open-Meteo API.

## 🚀 Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # Production build
```

## ✨ Features

**Two Pages:**
- **Overview** (`/`) - Daily data with 3 charts (Temperature, Precipitation, Wind Speed)
- **Details** (`/details`) - Hourly data with dual Y-axis chart (select 1-2 parameters)

**Filters:**
- 📅 Date Range (max 3 months)
- 📍 Location (6 cities: NY, London, Tokyo, Sydney, Mumbai, São Paulo)
- 📊 Parameters (6 metrics: Temp, Humidity, Apparent Temp, Precipitation, Pressure, Wind)

## 🛠️ Tech Stack

| Purpose | Choice | Why? |
|---------|--------|------|
| Framework | React 18 + TypeScript | Type safety, concurrent features |
| State | Zustand | Simple, performant, DevTools |
| Data | React Query + Axios | Auto-caching, retry, deduplication |
| UI | Tailwind + shadcn/ui | Accessible, customizable |
| Charts | Recharts | Responsive, dual Y-axis |

## 📁 Code Organization

```
src/
├── pages/          # Overview, Details (lazy loaded)
├── components/
│   ├── charts/     # 4 chart components
│   ├── filters/    # Date, Location, Parameter
│   ├── common/     # Loader, Error, Skeletons
│   └── ui/         # shadcn/ui components
├── hooks/          # useWeatherData (React Query)
├── stores/         # useFilterStore (Zustand)
├── services/       # weatherApi (Axios)
├── utils/          # chartUtils, dateUtils
└── config/         # constants, api, queryClient
```

**Design Principle:** `UI → Logic → State → API` (clear separation of concerns)

## 🚀 Performance

- **Initial load**: 3KB gzipped (97% reduction via code splitting)
- **Caching**: React Query (5-min stale, 10-min cache)
- **Bundle**: Manual chunking by library (Recharts, React, etc.)

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation (Enter/Space on charts)
- Context-aware errors (offline, 404, 429, 5xx)

## 🌍 Locations

New York 🇺🇸 | London 🇬🇧 | Tokyo 🇯🇵 | Sydney 🇦🇺 | Mumbai 🇮🇳 | São Paulo 🇧🇷

## 📦 Deployment (Netlify)

```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
# Settings: Build command: npm run build | Publish: dist
```

**Or connect GitHub repo** → Auto-deploy on push

## 📚 Documentation

- **README.md** (this file) - Setup and overview
- **TECHNICAL_DECISIONS.md** - Why each tech was chosen

## 📧 Submission Email Template

**Subject:** Weather Insights Dashboard - Assignment Submission

Hi Team,

Weather Insights Dashboard completed:

- **GitHub**: [YOUR_REPO_URL]
- **Live Demo**: [YOUR_NETLIFY_URL]

**Tech Stack**: React 18 + TypeScript, Zustand (state), React Query (data), Tailwind + shadcn/ui, Recharts

**Key Features**:
- ✅ Overview + Details pages with interactive charts
- ✅ 3 filters (date/location/parameters) with validation
- ✅ API integration (Open-Meteo daily + hourly)
- ✅ Responsive, accessible, error handling
- ✅ Performance optimized (3KB initial bundle, caching)

**Code Organization**: Separation of concerns (UI → hooks → state → API), documented decisions in `TECHNICAL_DECISIONS.md`.

Best regards,  
[Your Name]

---

## 👨‍💻 Author

**Hemanth R** - Built for Coulomb AI
