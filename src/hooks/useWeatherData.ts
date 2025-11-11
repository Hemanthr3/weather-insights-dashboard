import { fetchDailyWeather, fetchHourlyWeather } from '@/services/weatherApi';
import type {
  DailyWeatherParams,
  HourlyWeatherParams,
} from '@/types/weather.types';
import { useQuery } from '@tanstack/react-query';

export const useDailyWeather = (params: DailyWeatherParams) => {
  return useQuery({
    queryKey: ['dailyWeather', params],
    queryFn: () => fetchDailyWeather(params),
    enabled:
      !!params.lat && !!params.lon && !!params.startDate && !!params.endDate,
  });
};

export const useHourlyWeather = (params: HourlyWeatherParams) => {
  return useQuery({
    queryKey: ['hourlyWeather', params],
    queryFn: () => fetchHourlyWeather(params),
    enabled:
      !!params.lat &&
      !!params.lon &&
      !!params.startDate &&
      !!params.endDate &&
      params.parameters.length > 0,
    placeholderData: (previousData) => previousData, // Show old chart while fetching new data
  });
};
