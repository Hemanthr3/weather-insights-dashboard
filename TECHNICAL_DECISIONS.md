# Technical Decisions & Code Organization

Quick explanation of **why** each technology was chosen and **how** the code is organized.

---

## 🎯 Tech Stack Decisions

### 1. **Zustand** (State Management)

**Why not Context API?**
- ❌ Context: Provider hell, re-renders all consumers
- ✅ Zustand: Selective subscriptions, DevTools, localStorage persistence

**Example:**
```tsx
// Only re-renders when dateRange changes (not when location changes)
const dateRange = useFilterStore((state) => state.dateRange);
```

---

### 2. **React Query** (Data Fetching)

**Why not manual fetch?**
- ❌ Manual: No caching, manual loading states, redundant API calls
- ✅ React Query: Auto-caching, retry logic, request deduplication

**Example:**
```tsx
// User switches filters back and forth → Instant (cached)!
queryKey: ['dailyWeather', { lat, lon, startDate, endDate }]
```

**Caching:**
- 5 min stale time (data considered fresh)
- 10 min cache time (kept in memory)
- 3 retries with exponential backoff

---

### 3. **shadcn/ui** (UI Components)

**Why not Material-UI?**
- ❌ MUI: Heavy bundle, less customization, vendor lock-in
- ✅ shadcn: You own the code, smaller bundle, Radix UI (accessible)

---

### 4. **Recharts** (Visualization)

**Why not D3.js?**
- ❌ D3: Imperative API, steep learning curve
- ✅ Recharts: Declarative, React-native API, dual Y-axis built-in

---

### 5. **Vite** (Build Tool)

**Why not Create React App?**
- ❌ CRA: Slow, Webpack-based, deprecated
- ✅ Vite: Fast HMR, optimized builds, modern

---

## 📁 Code Organization

### Folder Structure

```
src/
├── pages/          → Route components (lazy loaded)
├── components/
│   ├── charts/     → Temperature, Precipitation, Wind, MultiParameter
│   ├── filters/    → Date, Location, Parameter
│   ├── common/     → Loader, ErrorBoundary, Skeletons, ChartCard
│   └── ui/         → shadcn/ui (Button, Card, Select, Calendar, etc.)
├── hooks/          → useWeatherData (React Query)
├── stores/         → useFilterStore (Zustand)
├── services/       → weatherApi (Axios)
├── utils/          → chartUtils, dateUtils (pure functions)
├── types/          → TypeScript interfaces
└── config/         → constants, api, queryClient
```

### Design Principle

**Separation of Concerns:**
```
UI (components) → Logic (hooks) → State (stores) → API (services)
```

Each layer has a **single responsibility**:
- Components: Render UI only
- Hooks: Fetch & transform data
- Stores: Manage global state
- Services: API calls

---

## 🔄 Data Flow

```
1. User changes filter
   ↓
2. Filter component calls Zustand
   setSelectedLocation(newLocation)
   ↓
3. Page subscribes to store change
   const { selectedLocation } = useFilterStore()
   ↓
4. React Query detects new queryKey
   useDailyWeather({ lat, lon, ... })
   ↓
5. Check cache → Hit (instant!) or Miss (fetch)
   ↓
6. Transform data (chartUtils)
   transformDailyData(apiResponse)
   ↓
7. Update chart
   <TemperatureChart data={chartData} />
```

---

## 🚀 Performance Optimizations

### 1. **Code Splitting**

**Before:** 947KB bundle (298KB gzipped)  
**After:** 3KB initial + lazy chunks (97% reduction!)

```tsx
// pages/Overview.tsx, pages/Details.tsx
export default Overview;  // Lazy loaded in App.tsx
```

---

### 2. **Manual Chunking**

**Problem:** Recharts in 520KB chunk (warning!)  
**Solution:** Split vendors by library

```tsx
// vite.config.ts
manualChunks: (id) => {
  if (id.includes('recharts')) return 'recharts';
  if (id.includes('react')) return 'react-vendor';
  // ...
}
```

**Result:** No warnings, better caching

---

### 3. **Data Transformation Once**

**Problem:** Each chart transforms same data  
**Solution:** Transform in parent, pass to children

```tsx
// pages/Overview.tsx
const chartData = useMemo(() => transformDailyData(data), [data]);

<TemperatureChart data={chartData} />
<PrecipitationChart data={chartData} />
<WindSpeedChart data={chartData} />
```

---

### 4. **React Query Caching**

Same query params → Instant response (from cache)

```tsx
// Same params = cache hit
queryKey: ['dailyWeather', { lat, lon, startDate, endDate }]
```

---

### 5. **Concurrent React**

**`useTransition`** - Non-urgent updates (filters)
```tsx
startTransition(() => setSelectedParameters(params));
```

**`Suspense`** - Page-level loading
```tsx
<Suspense fallback={<Loader />}>
  <Routes>...</Routes>
</Suspense>
```

---

## 🛡️ Error Handling

**Multi-layer approach:**

1. **API** - Axios interceptors (logging)
2. **Query** - React Query retry (3x exponential backoff)
3. **Component** - Error boundaries (catch React errors)
4. **User** - Context-aware messages (offline, 404, 429, 5xx)

---

## ♿ Accessibility

```tsx
// ARIA labels
<Button aria-label="Select location, currently New York">

// Keyboard navigation
<ChartCard
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && onClick()}
/>

// Screen readers
<Icon aria-hidden="true" />  // Decorative icons hidden
```

---

## 🧩 Key Components

### **useFilterStore.ts** (Zustand)

Global state: `dateRange`, `selectedLocation`, `selectedParameters`

**Features:**
- DevTools integration
- localStorage persistence
- Logic: `toggleParameter` enforces max 2, min 1

---

### **useWeatherData.ts** (React Query)

Hooks: `useDailyWeather()`, `useHourlyWeather()`

**Features:**
- Auto-caching by query key
- Background refetching
- Built-in loading/error states

---

### **ChartCard.tsx** (Reusable)

Wrapper for all charts (eliminates duplication)

```tsx
<ChartCard
  title="Temperature"
  icon={Thermometer}
  onClick={() => navigate('/details')}
>
  <LineChart data={data} />
</ChartCard>
```

---

## 📊 File Responsibilities

| File | Purpose |
|------|---------|
| **pages/Overview.tsx** | Daily charts + filters |
| **pages/Details.tsx** | Hourly multi-parameter chart |
| **hooks/useWeatherData.ts** | React Query hooks |
| **stores/useFilterStore.ts** | Global filter state |
| **services/weatherApi.ts** | API calls (Axios) |
| **utils/chartUtils.ts** | Transform API → Recharts format |
| **config/constants.ts** | LOCATIONS, PARAMETERS, colors |

---

## ✅ Requirements Met

| Requirement | Implementation |
|------------|---------------|
| Overview page | ✅ 3 daily charts (Temp, Precip, Wind) |
| Details page | ✅ Hourly chart with dual Y-axis |
| Date filter | ✅ Max 3 months, validation |
| Location filter | ✅ 6 cities (lat/long mapping) |
| Parameter filter | ✅ Max 2, min 1 selection |
| API integration | ✅ Open-Meteo (daily + hourly) |
| Responsive | ✅ Tablet to desktop |
| Code quality | ✅ TypeScript, organized, zero errors |

---

## 🎯 Why This Architecture?

**Priorities:**
1. **Performance** - Code splitting (97% reduction), caching, memoization
2. **Maintainability** - Clear structure, single responsibility, testable
3. **User Experience** - Loading states, error handling, accessibility
4. **Developer Experience** - TypeScript, DevTools, fast HMR

**Every decision balances pragmatism with best practices.**

---

Built with React 18, TypeScript, Zustand, React Query, and Recharts 🚀
