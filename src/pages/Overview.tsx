import { PrecipitationChart } from '@/components/charts/PrecipitationChart';
import { TemperatureChart } from '@/components/charts/TemperatureChart';
import { WindSpeedChart } from '@/components/charts/WindSpeedChart';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { PrecipitationChartSkeleton } from '@/components/common/PrecipitationChartSkeleton';
import { TemperatureChartSkeleton } from '@/components/common/TemperatureChartSkeleton';
import { WindSpeedChartSkeleton } from '@/components/common/WindSpeedChartSkeleton';
import { DateRangeFilter } from '@/components/filters/DateRangeFilter';
import { LocationFilter } from '@/components/filters/LocationFilter';
import { useDailyWeather } from '@/hooks/useWeatherData';
import { useFilterStore } from '@/stores/useFilterStore';
import { useNavigate } from 'react-router-dom';

export const Overview = () => {
  const navigate = useNavigate();
  const { dateRange, selectedLocation, setSelectedParameters } =
    useFilterStore();

  const { data, isLoading, isError, error, refetch } = useDailyWeather({
    lat: selectedLocation.lat,
    lon: selectedLocation.lon,
    startDate: dateRange.start,
    endDate: dateRange.end,
  });

  const handleChartClick = (parameter: string) => {
    setSelectedParameters([parameter]);
    navigate('/details');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Overview</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <DateRangeFilter />
          <LocationFilter />
        </div>

        {/* Responsive Grid with Skeleton Loaders */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TemperatureChartSkeleton />
          <PrecipitationChartSkeleton />
          <WindSpeedChartSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Overview</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <DateRangeFilter />
          <LocationFilter />
        </div>
        <ErrorMessage error={error as Error} retry={refetch} />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <DateRangeFilter />
        <LocationFilter />
      </div>

      {/* Responsive Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TemperatureChart
          data={data}
          onClick={() => handleChartClick('temperature')}
        />
        <PrecipitationChart
          data={data}
          onClick={() => handleChartClick('precipitation')}
        />
        <WindSpeedChart
          data={data}
          onClick={() => handleChartClick('windspeed')}
        />
      </div>
    </div>
  );
};
