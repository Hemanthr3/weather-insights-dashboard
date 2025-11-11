import { weatherApiClient } from '@/config/api.config';
import { PARAMETERS } from '@/config/constants';
import type {
  DailyWeatherParams,
  DailyWeatherResponse,
  HourlyWeatherParams,
  HourlyWeatherResponse,
} from '@/types/weather.types';

export const fetchDailyWeather = async (
  params: DailyWeatherParams
): Promise<DailyWeatherResponse> => {
  const { data } = await weatherApiClient.get<DailyWeatherResponse>(
    '/archive',
    {
      params: {
        latitude: params.lat,
        longitude: params.lon,
        start_date: params.startDate,
        end_date: params.endDate,
        daily:
          'temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
        timezone: 'auto',
      },
    }
  );

  return data;
};

export const fetchHourlyWeather = async (
  params: HourlyWeatherParams
): Promise<HourlyWeatherResponse> => {
  // Map parameter IDs to API keys
  const apiParams = params.parameters
    .map((paramId) => {
      const param = PARAMETERS.find((p) => p.id === paramId);
      return param?.apiKey;
    })
    .filter(Boolean)
    .join(',');

  const { data } = await weatherApiClient.get<HourlyWeatherResponse>(
    '/archive',
    {
      params: {
        latitude: params.lat,
        longitude: params.lon,
        start_date: params.startDate,
        end_date: params.endDate,
        hourly: apiParams,
        timezone: 'auto',
      },
    }
  );

  return data;
};
