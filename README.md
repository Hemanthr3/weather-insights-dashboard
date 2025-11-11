# Weather Insights Dashboard

A production-ready historical weather data dashboard built with modern React ecosystem, featuring interactive data visualization and real-time API integration with Open-Meteo Archive API.

## 🚀 Features

- **Two Main Pages:**

  - **Overview Page**: Displays daily weather data with three interactive charts (Temperature, Precipitation, Wind Speed)
  - **Details Page**: Drill-down view with hourly data supporting dual Y-axis visualization of up to 2 parameters simultaneously

- **Interactive Filters:**

  - Date range selector (up to 3 months)
  - Location selector (6 global cities)
  - Parameter selector (6 weather metrics)

- **Modern Tech Stack:**
  - React 18 with TypeScript
  - Zustand for state management
  - React Query for data fetching & caching
  - Recharts for data visualization
  - Tailwind CSS + shadcn/ui for styling
  - Framer Motion for smooth animations

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── common/                  # Reusable components (Loader, ErrorBoundary, etc.)
│   ├── charts/                  # Chart components
│   ├── filters/                 # Filter components
│   └── layout/                  # Layout components
├── pages/
│   ├── Overview.tsx             # Overview page (daily data)
│   └── Details.tsx              # Details page (hourly data)
├── hooks/
│   └── useWeatherData.ts        # React Query hooks
├── stores/
│   └── useFilterStore.ts        # Zustand store
├── services/
│   └── weatherApi.ts            # API integration
├── utils/
│   ├── dateUtils.ts             # Date formatting utilities
│   └── chartUtils.ts            # Chart data transformation
├── types/
│   └── weather.types.ts         # TypeScript type definitions
└── config/
    ├── constants.ts             # Static data (locations, parameters)
    ├── api.config.ts            # Axios configuration
    └── queryClient.config.ts    # React Query configuration
```

## 🎯 Key Technical Decisions

### State Management: Zustand

- **Why**: Simpler API than Context, better performance with selective subscriptions
- **Benefits**: Built-in DevTools, localStorage persistence, less boilerplate

### Data Fetching: React Query + Axios

- **Why**: Automatic caching, retry logic, and loading state management
- **Benefits**: Deduplicates requests, background refetching, optimistic updates

### UI Components: shadcn/ui

- **Why**: Accessible, customizable, and you own the code
- **Benefits**: Built on Radix UI primitives, TypeScript-first, Tailwind-styled

### Charts: Recharts

- **Why**: React-native API, responsive, dual Y-axis support
- **Benefits**: Declarative, composable, smooth animations

## 🌍 Supported Locations

1. New York, USA
2. London, UK
3. Tokyo, Japan
4. Sydney, Australia
5. Mumbai, India
6. São Paulo, Brazil

## 📊 Available Parameters

**Overview Page (Daily):**

- Temperature (Mean, Max, Min)
- Precipitation (Sum)
- Wind Speed (Max)

**Details Page (Hourly):**

- Temperature
- Relative Humidity
- Apparent Temperature
- Precipitation
- Sea Level Pressure
- Wind Speed 10m

## 🎨 Design Decisions

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Recharts ResponsiveContainer for adaptive chart sizing
- Flexible grid layouts for tablet and desktop

### Performance Optimizations

- React Query caching (5-minute stale time)
- Memoized chart data transformations
- Zustand selective subscriptions
- Code splitting with lazy loading (future)

### Error Handling

- Error boundaries at app and component levels
- User-friendly error messages with retry functionality
- API interceptors for centralized error logging

### Loading States

- Skeleton loaders for charts
- Spinner for page-level loading
- Smooth transitions with Framer Motion

## 🔧 Configuration

### Date Range

- Default: 19 days
- Maximum: 90 days (3 months)

### API Configuration

- Base URL: `https://archive-api.open-meteo.com/v1`
- Timeout: 10 seconds
- Retry: 3 attempts with exponential backoff

### Caching Strategy

- Stale time: 5 minutes
- Cache time: 10 minutes
- Background refetch on reconnect

## 📝 Development Notes

### Why These Choices?

**Zustand over Context API:**

- No provider hell
- Better performance (selective subscriptions)
- Built-in DevTools integration

**React Query over Manual Fetch:**

- Automatic caching eliminates redundant API calls
- Built-in retry and error handling
- Optimistic updates support

**Recharts over D3.js:**

- Declarative API (more React-friendly)
- Less learning curve
- Sufficient for our use case

**Tailwind + shadcn over Component Libraries:**

- Full design control
- Smaller bundle (tree-shaking)
- Accessible out of the box

## 🚀 Deployment

This project is optimized for deployment on platforms like:

- Netlify
- Vercel
- AWS Amplify

Simply run `npm run build` and deploy the `dist` folder.

## 📄 License

MIT

## 👨‍💻 Author

Hemanth R
