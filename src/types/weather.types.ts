export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Parameter {
  id: string;
  label: string;
  unit: string;
  color: string;
  apiKey: string;
}

export interface DailyWeatherParams {
  lat: number;
  lon: number;
  startDate: string;
  endDate: string;
}

export interface HourlyWeatherParams {
  lat: number;
  lon: number;
  startDate: string;
  endDate: string;
  parameters: string[];
}

export interface DailyWeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: {
    time: string[];
    temperature_2m_mean: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}

export interface HourlyWeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    [key: string]: (string | number)[];
  };
}
