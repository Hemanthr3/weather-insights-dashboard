# Architecture & Code Organization

## Project Overview

This document explains the architectural decisions, folder structure, and design patterns used in the Weather Insights Dashboard.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Folder Structure](#folder-structure)
3. [Architectural Patterns](#architectural-patterns)
4. [State Management](#state-management)
5. [Data Fetching Strategy](#data-fetching-strategy)
6. [Component Design](#component-design)
7. [Performance Optimizations](#performance-optimizations)
8. [Error Handling](#error-handling)

---

## Technology Stack

### Core Framework

- **React 18 + TypeScript**: Type-safe component development with concurrent features
- **Vite**: Modern build tool for fast development and optimized production builds

### State Management

- **Zustand**: Lightweight state management with built-in DevTools and persistence

### Data Fetching

- **React Query (TanStack Query)**: Powerful async state management with caching and background refetching
- **Axios**: HTTP client with interceptors for logging and error handling

### UI & Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Accessible, customizable components built on Radix UI
- **Framer Motion**: Smooth animations and transitions

### Charts

- **Recharts**: Declarative charting library with responsive design and dual Y-axis support

### Routing

- **React Router v6**: Client-side routing with state passing

### Utilities

- **date-fns**: Modern date utility library
- **lucide-react**: Icon library

---

## Folder Structure

```
src/
├── components/          # All React components
│   ├── ui/             # shadcn/ui components (button, card, select, etc.)
│   ├── common/         # Shared utility components
│   │   ├── ErrorBoundary.tsx    # Catches React errors
│   │   ├── ErrorMessage.tsx     # User-friendly error display
│   │   ├── Loader.tsx           # Loading spinner
│   │   └── ChartSkeleton.tsx    # Skeleton loader for charts
│   ├── charts/         # Chart components
│   │   ├── TemperatureChart.tsx
│   │   ├── PrecipitationChart.tsx
│   │   ├── WindSpeedChart.tsx
│   │   └── MultiParameterChart.tsx
│   ├── filters/        # Filter components
│   │   ├── DateRangeFilter.tsx
│   │   ├── LocationFilter.tsx
│   │   └── ParameterFilter.tsx
│   └── layout/         # Layout components
│       └── Header.tsx
│
├── pages/              # Page-level components
│   ├── Overview.tsx    # Daily weather overview
│   └── Details.tsx     # Hourly weather details
│
├── hooks/              # Custom React hooks
│   └── useWeatherData.ts    # React Query hooks for API data
│
├── stores/             # Zustand stores
│   └── useFilterStore.ts    # Global filter state
│
├── services/           # API integration layer
│   └── weatherApi.ts        # Open-Meteo API calls
│
├── utils/              # Pure utility functions
│   ├── dateUtils.ts         # Date formatting and validation
│   └── chartUtils.ts        # Data transformation for charts
│
├── types/              # TypeScript type definitions
│   └── weather.types.ts     # API and domain types
│
├── config/             # Configuration files
│   ├── constants.ts         # Static data (locations, parameters)
│   ├── api.config.ts        # Axios instance and interceptors
│   ├── queryClient.config.ts # React Query configuration
│   └── chart.config.ts      # Chart styling constants (removed, merged into constants)
│
└── lib/                # Third-party library configurations
    └── utils.ts             # shadcn cn() helper
```

---

## Architectural Patterns

### 1. Separation of Concerns

The codebase follows a clear separation between:

- **Presentation Layer** (components): Only renders UI
- **Business Logic** (hooks): Handles data fetching and transformations
- **State Management** (stores): Manages global UI state
- **Data Layer** (services): Communicates with external APIs

### 2. Component Composition

Components are designed to be:

- **Reusable**: Generic components in `components/common` and `components/ui`
- **Single-Responsibility**: Each component has one clear purpose
- **Composable**: Complex UIs built from smaller components

Example:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Temperature</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer>
      <LineChart data={data}>{/* Chart configuration */}</LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
```

### 3. Custom Hooks Pattern

Business logic is extracted into custom hooks:

```tsx
// hooks/useWeatherData.ts
export const useDailyWeather = (params) => {
  return useQuery({
    queryKey: ['dailyWeather', params],
    queryFn: () => fetchDailyWeather(params),
  });
};

// Usage in component
const { data, isLoading, error } = useDailyWeather(params);
```

**Benefits:**

- Logic separated from presentation
- Easily testable
- Reusable across components

---

## State Management

### Why Zustand?

**Compared to Context API:**

- ✅ No provider nesting
- ✅ Selective subscriptions (better performance)
- ✅ Built-in DevTools
- ✅ Automatic localStorage persistence

### Store Structure

```tsx
// stores/useFilterStore.ts
interface FilterState {
  // State
  dateRange: DateRange;
  selectedLocation: Location;
  selectedParameters: string[];

  // Actions
  setDateRange: (range: DateRange) => void;
  setSelectedLocation: (location: Location) => void;
  setSelectedParameters: (params: string[]) => void;
  toggleParameter: (paramId: string) => void;
}
```

### Usage

```tsx
// Selective subscription (only re-renders when dateRange changes)
const dateRange = useFilterStore((state) => state.dateRange);

// Full access
const { dateRange, setDateRange } = useFilterStore();
```

---

## Data Fetching Strategy

### Why React Query?

**Compared to Manual Fetch:**

- ✅ Automatic caching (no redundant API calls)
- ✅ Background refetching (stale-while-revalidate)
- ✅ Retry logic with exponential backoff
- ✅ Request deduplication
- ✅ Loading and error states built-in

### Caching Strategy

```tsx
// config/queryClient.config.ts
{
  staleTime: 5 * 60 * 1000,      // 5 minutes - data fresh for 5 min
  gcTime: 10 * 60 * 1000,        // 10 minutes - keep in cache for 10 min
  retry: 3,                       // Retry failed requests 3 times
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
}
```

**User Experience:**

1. User selects "New York" + "Jan 1-15" → Fetches data
2. User switches to "London" → Fetches new data
3. User switches back to "New York" → **Instant** (from cache)
4. After 5 minutes → Background refetch (shows cached data while updating)

### API Layer Design

```
Component → Custom Hook → Service → Axios → API
```

```tsx
// services/weatherApi.ts
export const fetchDailyWeather = async (params) => {
  const { data } = await weatherApiClient.get('/archive', { params });
  return data;
};

// hooks/useWeatherData.ts
export const useDailyWeather = (params) => {
  return useQuery({
    queryKey: ['dailyWeather', params],
    queryFn: () => fetchDailyWeather(params),
  });
};

// pages/Overview.tsx
const { data, isLoading, error } = useDailyWeather(params);
```

**Benefits:**

- Components don't know about API implementation
- Easy to mock for testing
- Can swap API layer without changing components

---

## Component Design

### Chart Components

Each chart follows this pattern:

```tsx
interface ChartProps {
  data: ApiResponse;
  onClick?: () => void;
}

export const ChartComponent = ({ data, onClick }: ChartProps) => {
  // 1. Transform API data to chart format
  const chartData = useMemo(() => transformData(data), [data]);

  // 2. Render chart in Card wrapper
  return (
    <Card onClick={onClick}>
      <CardHeader>
        <CardTitle>Chart Title</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer>
          <ChartLibraryComponent data={chartData} />
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

**Key Decisions:**

- **useMemo**: Prevents unnecessary data transformations
- **Card wrapper**: Consistent styling and hover effects
- **onClick prop**: Makes charts clickable for navigation
- **ResponsiveContainer**: Adapts to screen size

### Filter Components

Filters are self-contained and connect directly to Zustand:

```tsx
export const LocationFilter = () => {
  const { selectedLocation, setSelectedLocation } = useFilterStore();

  return (
    <Select value={selectedLocation.id} onValueChange={handleChange}>
      {/* ... */}
    </Select>
  );
};
```

**Benefits:**

- No prop drilling
- Filters can be placed anywhere
- Automatic persistence to localStorage

---

## Performance Optimizations

### 1. React Query Caching

**Problem:** User changes filters back and forth → Multiple API calls

**Solution:** React Query caches responses based on query key

```tsx
queryKey: ['dailyWeather', { lat, lon, startDate, endDate }];
```

Same params = cache hit (instant!)

### 2. Zustand Selective Subscriptions

**Problem:** Context API re-renders all consumers on any state change

**Solution:** Zustand allows subscribing to specific state slices

```tsx
// Only re-renders when dateRange changes
const dateRange = useFilterStore((state) => state.dateRange);
```

### 3. Memoization

**useMemo** for expensive computations:

```tsx
const chartData = useMemo(() => transformDailyData(data), [data]);
```

Only recomputes when `data` changes

### 4. Code Splitting (Future Enhancement)

```tsx
const DetailsPage = lazy(() => import('./pages/Details'));
```

Overview page loads first, Details page on demand

---

## Error Handling

### Multi-Layer Error Handling

1. **API Level** (Axios interceptors)

```tsx
weatherApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error);
    return Promise.reject(error);
  }
);
```

2. **Query Level** (React Query)

```tsx
const { data, error, refetch } = useQuery({
  queryKey: ['weather', params],
  queryFn: fetchWeather,
  retry: 3, // Auto-retry 3 times
});

if (error) return <ErrorMessage error={error} retry={refetch} />;
```

3. **Component Level** (Error Boundaries)

```tsx
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

**User Experience:**

- API fails → Auto-retry 3 times
- Still fails → Show error message with "Retry" button
- Uncaught errors → Error boundary shows fallback UI

---

## Key Design Decisions

### 1. Why No Redux?

**Reasoning:**

- Our global state is simple (just filters)
- No complex state mutations
- Zustand provides everything we need with less boilerplate

**If the app grows:** Can easily migrate to Redux if needed

### 2. Why Separate Data Transformation?

**Pattern:**

```
API Response → chartUtils.ts → Chart Component
```

**Why:**

- Charts receive "chart-ready" data
- Transformation logic is testable in isolation
- API changes don't break charts

### 3. Why shadcn/ui Instead of Material-UI?

**Reasoning:**

- **Ownership**: Components copied into project (full control)
- **Bundle Size**: Smaller (tree-shakeable)
- **Accessibility**: Built on Radix UI (WCAG compliant)
- **Customization**: Easy to modify for specific designs

---

## Testing Strategy (Bonus)

### Recommended Test Structure

```
src/
├── utils/
│   ├── dateUtils.ts
│   └── dateUtils.test.ts         # Pure functions - easy to test
├── hooks/
│   ├── useWeatherData.ts
│   └── useWeatherData.test.ts    # Mock API responses
└── components/
    ├── charts/
    │   ├── TemperatureChart.tsx
    │   └── TemperatureChart.test.tsx  # Mock data, test rendering
```

**Test Priorities:**

1. **Utils** (highest value): Pure functions, no dependencies
2. **Hooks**: Mock API, test data transformations
3. **Components**: Snapshot tests, interaction tests

---

## Future Enhancements

### Code Splitting

```tsx
const DetailsPage = lazy(() => import('./pages/Details'));
```

### Prefetching

```tsx
// Prefetch hourly data when user hovers over chart
queryClient.prefetchQuery(['hourlyWeather', params]);
```

### Offline Support

```tsx
// React Query persister to IndexedDB
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
```

### Dark Mode

```tsx
// Add to Zustand store
theme: 'light' | 'dark';
setTheme: (theme) => set({ theme });
```

---

## Conclusion

This architecture prioritizes:

- **Developer Experience**: Modern tools, clear patterns
- **Performance**: Caching, memoization, selective re-renders
- **Maintainability**: Separation of concerns, testable code
- **User Experience**: Loading states, error handling, smooth animations

Every decision was made with **"Why?"** in mind, balancing pragmatism with best practices.
