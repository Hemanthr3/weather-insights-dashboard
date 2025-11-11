# Complete File Structure

```
weather-insights-dashboard/
│
├── public/                           # Static assets
│
├── src/                              # Source code
│   ├── components/                   # All React components
│   │   ├── ui/                      # shadcn/ui components (7 files)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   └── select.tsx
│   │   │
│   │   ├── common/                  # Shared utility components
│   │   │   ├── ChartSkeleton.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── Loader.tsx
│   │   │
│   │   ├── charts/                  # Chart components (4 files)
│   │   │   ├── TemperatureChart.tsx
│   │   │   ├── PrecipitationChart.tsx
│   │   │   ├── WindSpeedChart.tsx
│   │   │   └── MultiParameterChart.tsx
│   │   │
│   │   ├── filters/                 # Filter components (3 files)
│   │   │   ├── DateRangeFilter.tsx
│   │   │   ├── LocationFilter.tsx
│   │   │   └── ParameterFilter.tsx
│   │   │
│   │   └── layout/                  # Layout components
│   │       └── Header.tsx
│   │
│   ├── pages/                       # Page-level components
│   │   ├── Overview.tsx            # Daily weather overview
│   │   └── Details.tsx             # Hourly weather details
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useWeatherData.ts       # React Query hooks for API
│   │
│   ├── stores/                      # Zustand stores
│   │   └── useFilterStore.ts       # Global filter state management
│   │
│   ├── services/                    # API integration layer
│   │   └── weatherApi.ts           # Open-Meteo API functions
│   │
│   ├── utils/                       # Pure utility functions
│   │   ├── dateUtils.ts            # Date formatting and validation
│   │   └── chartUtils.ts           # Data transformation for charts
│   │
│   ├── types/                       # TypeScript type definitions
│   │   └── weather.types.ts        # API and domain types
│   │
│   ├── config/                      # Configuration files
│   │   ├── constants.ts            # Static data (locations, parameters, chart colors)
│   │   ├── api.config.ts           # Axios instance and interceptors
│   │   └── queryClient.config.ts   # React Query configuration
│   │
│   ├── lib/                         # Third-party library configurations
│   │   └── utils.ts                # shadcn cn() helper function
│   │
│   ├── App.tsx                      # Root component with routing
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles (Tailwind directives)
│
├── index.html                        # HTML template
├── package.json                      # Dependencies and scripts
├── package-lock.json                 # Locked dependency versions
│
├── vite.config.ts                    # Vite configuration (path aliases)
├── tsconfig.json                     # TypeScript base config
├── tsconfig.app.json                 # TypeScript app config (paths)
├── tsconfig.node.json                # TypeScript node config
│
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
│
├── .gitignore                        # Git ignore rules
│
├── README.md                         # Project setup and overview
├── ARCHITECTURE.md                   # Detailed architectural documentation
├── PROJECT_SUMMARY.md                # Quick project summary
├── SUBMISSION_CHECKLIST.md           # Submission guide and checklist
└── FILE_STRUCTURE.md                 # This file
```

## File Count Summary

### Source Code Files

- **Components**: 17 files

  - UI: 6 shadcn components
  - Common: 4 shared components
  - Charts: 4 chart components
  - Filters: 3 filter components
  - Layout: 1 header component

- **Pages**: 2 files (Overview, Details)
- **Hooks**: 1 file (useWeatherData)
- **Stores**: 1 file (useFilterStore)
- **Services**: 1 file (weatherApi)
- **Utils**: 2 files (dateUtils, chartUtils)
- **Types**: 1 file (weather.types)
- **Config**: 3 files (constants, api, queryClient)
- **Lib**: 1 file (utils)
- **Root**: 3 files (App, main, index.css)

**Total TypeScript/React Files**: ~32 files

### Configuration Files

- Vite config
- TypeScript configs (3 files)
- Tailwind config
- PostCSS config
- Package.json
- .gitignore

**Total Config Files**: ~8 files

### Documentation Files

- README.md
- ARCHITECTURE.md
- PROJECT_SUMMARY.md
- SUBMISSION_CHECKLIST.md
- FILE_STRUCTURE.md

**Total Documentation**: 5 files

---

## Key Directories Explained

### `src/components/`

Contains all reusable UI components organized by category:

- **ui/**: shadcn components (owned, customizable)
- **common/**: Shared components (Loader, Error, Skeleton)
- **charts/**: Chart-specific components
- **filters/**: Filter UI components
- **layout/**: Layout components (Header, etc.)

### `src/pages/`

Page-level components that correspond to routes:

- **Overview.tsx**: Maps to `/` route
- **Details.tsx**: Maps to `/details` route

### `src/hooks/`

Custom React hooks that encapsulate business logic:

- **useWeatherData.ts**: React Query hooks for API calls

### `src/stores/`

Zustand stores for global state management:

- **useFilterStore.ts**: Manages filter state (date, location, parameters)

### `src/services/`

API integration layer (pure functions):

- **weatherApi.ts**: Functions to call Open-Meteo API

### `src/utils/`

Pure utility functions (no side effects):

- **dateUtils.ts**: Date formatting, validation
- **chartUtils.ts**: Data transformation for charts

### `src/types/`

TypeScript type definitions:

- **weather.types.ts**: API response types, domain types

### `src/config/`

Configuration and constants:

- **constants.ts**: Static data (locations, parameters)
- **api.config.ts**: Axios configuration
- **queryClient.config.ts**: React Query configuration

---

## Import Paths

Thanks to path alias configuration (`@/`), imports look clean:

```tsx
// Instead of: import { Button } from '../../../components/ui/button'
import { Button } from '@/components/ui/button';

// Instead of: import { LOCATIONS } from '../../../../config/constants'
import { LOCATIONS } from '@/config/constants';
```

Configured in:

- `vite.config.ts`: `alias: { '@': path.resolve(__dirname, './src') }`
- `tsconfig.app.json`: `paths: { "@/*": ["./src/*"] }`

---

## Component Hierarchy

```
App.tsx (Root)
├── ErrorBoundary
│   └── QueryClientProvider
│       └── BrowserRouter
│           ├── Header
│           └── Routes
│               ├── Overview Page
│               │   ├── DateRangeFilter
│               │   ├── LocationFilter
│               │   ├── TemperatureChart
│               │   ├── PrecipitationChart
│               │   └── WindSpeedChart
│               │
│               └── Details Page
│                   ├── DateRangeFilter
│                   ├── LocationFilter
│                   ├── ParameterFilter
│                   └── MultiParameterChart
```

---

## Data Flow

```
User Action (UI)
    ↓
Component Event Handler
    ↓
Zustand Store Update (setSelectedLocation, setDateRange, etc.)
    ↓
React Query Hook Detects Change (queryKey changes)
    ↓
Check Cache
    ├── Cache Hit → Return Cached Data
    └── Cache Miss → API Call
            ↓
        weatherApi.ts (Axios)
            ↓
        Open-Meteo API
            ↓
        Response
            ↓
        Transform Data (chartUtils.ts)
            ↓
        Update Component State
            ↓
        Re-render with Animation
```

---

## Dependencies Overview

### Core

- react: ^18.x
- react-dom: ^18.x
- typescript: ^5.x

### State & Data

- zustand: ^5.x
- @tanstack/react-query: ^5.x
- axios: ^1.x

### UI & Styling

- tailwindcss: ^3.x
- @radix-ui/\* (primitives)
- lucide-react (icons)
- framer-motion (animations)

### Charts

- recharts: ^2.x

### Utilities

- date-fns: ^4.x
- clsx + tailwind-merge

### Dev Tools

- @tanstack/react-query-devtools
- vite: ^7.x
- @types/node

---

## Build Output

After `npm run build`:

```
dist/
├── assets/
│   ├── index-[hash].css    (~18KB)
│   └── index-[hash].js     (~921KB - includes all dependencies)
└── index.html              (~0.5KB)
```

**Total Bundle Size**: ~921KB (290KB gzipped)

**Note**: Bundle includes Recharts, React Query, Zustand, Framer Motion, and all Radix UI components.

---

## Scripts Available

```bash
npm run dev        # Start dev server (port 5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Environment

- **Node.js**: v18+ recommended
- **Package Manager**: npm
- **Browser Support**: Modern browsers (ES2022+)

---

**This structure follows industry best practices:**

- ✅ Separation of concerns
- ✅ Clear naming conventions
- ✅ Logical grouping
- ✅ Scalable architecture
