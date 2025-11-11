export const LOCATIONS = [
  { id: 'nyc', name: 'New York, USA', lat: 40.7128, lon: -74.006 },
  { id: 'london', name: 'London, UK', lat: 51.5074, lon: -0.1278 },
  { id: 'tokyo', name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
  { id: 'sydney', name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
  { id: 'mumbai', name: 'Mumbai, India', lat: 19.076, lon: 72.8777 },
  { id: 'sao-paulo', name: 'São Paulo, Brazil', lat: -23.5505, lon: -46.6333 },
] as const;

export const PARAMETERS = [
  {
    id: 'temperature',
    label: 'Temperature',
    unit: '°C',
    color: '#F59E0B',
    apiKey: 'temperature_2m',
  },
  {
    id: 'humidity',
    label: 'Relative Humidity',
    unit: '%',
    color: '#8B5CF6',
    apiKey: 'relative_humidity_2m',
  },
  {
    id: 'apparent_temp',
    label: 'Apparent Temperature',
    unit: '°C',
    color: '#F97316',
    apiKey: 'apparent_temperature',
  },
  {
    id: 'precipitation',
    label: 'Precipitation',
    unit: 'mm',
    color: '#0891B2',
    apiKey: 'precipitation',
  },
  {
    id: 'pressure',
    label: 'Sea Level Pressure',
    unit: 'hPa',
    color: '#10B981',
    apiKey: 'surface_pressure',
  },
  {
    id: 'windspeed',
    label: 'Wind Speed 10m',
    unit: 'km/h',
    color: '#6B7280',
    apiKey: 'wind_speed_10m',
  },
] as const;

export const DATE_CONFIG = {
  MAX_RANGE_DAYS: 90, // 3 months
  DEFAULT_RANGE_DAYS: 19,
  DATE_FORMAT: 'MMM d, yyyy',
} as const;

export const CHART_CONFIG = {
  COLORS: {
    temperature: {
      mean: '#F59E0B', // Yellow/Amber
      max: '#EF4444', // Red
      min: '#3B82F6', // Blue
    },
    precipitation: '#0891B2', // Teal
    windspeed: '#6B7280', // Gray
  },
  MARGINS: { top: 20, right: 30, left: 20, bottom: 20 },
  ANIMATION_DURATION: 300,
  GRID_STROKE: '#E5E7EB',
} as const;
