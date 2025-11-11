import { PARAMETERS } from '@/config/constants';
import type {
  DailyWeatherResponse,
  HourlyWeatherResponse,
} from '@/types/weather.types';

export interface DailyChartData {
  date: string;
  tempMean: number;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  windSpeed: number;
}

export interface HourlyChartData {
  time: string;
  [key: string]: string | number | null;
}

export const transformDailyData = (
  data: DailyWeatherResponse
): DailyChartData[] => {
  return data.daily.time.map((date, idx) => ({
    date,
    tempMean: data.daily.temperature_2m_mean[idx],
    tempMax: data.daily.temperature_2m_max[idx],
    tempMin: data.daily.temperature_2m_min[idx],
    precipitation: data.daily.precipitation_sum[idx],
    windSpeed: data.daily.wind_speed_10m_max[idx],
  }));
};

export const transformHourlyData = (
  data: HourlyWeatherResponse,
  parameters: string[]
): HourlyChartData[] => {
  return data.hourly.time.map((time, idx) => {
    const dataPoint: HourlyChartData = { time };

    parameters.forEach((paramId) => {
      const param = PARAMETERS.find((p) => p.id === paramId);
      if (param) {
        const apiKey = param.apiKey;
        dataPoint[paramId] = data.hourly[apiKey]?.[idx] ?? null;
      }
    });

    return dataPoint;
  });
};
