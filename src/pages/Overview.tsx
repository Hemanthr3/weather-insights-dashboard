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
import { transformDailyData } from '@/utils/chartUtils';
import { useMemo } from 'react';
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

  // Transform data ONCE for all charts (avoid redundant transformations)
  const chartData = useMemo(() => {
    return data ? transformDailyData(data) : null;
  }, [data]);

  const handleChartClick = (parameter: string) => {
    setSelectedParameters([parameter]);
    navigate('/details');
  };

  // Render content based on state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TemperatureChartSkeleton />
          <PrecipitationChartSkeleton />
          <WindSpeedChartSkeleton />
        </div>
      );
    }

    if (isError) {
      return <ErrorMessage error={error as Error} retry={refetch} />;
    }

    if (!chartData) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TemperatureChart
          data={chartData}
          onClick={() => handleChartClick('temperature')}
        />
        <PrecipitationChart
          data={chartData}
          onClick={() => handleChartClick('precipitation')}
        />
        <WindSpeedChart
          data={chartData}
          onClick={() => handleChartClick('windspeed')}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full p-6 gap-2">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 gap-6 flex flex-col">
        <h1 className="text-3xl font-bold">Overview</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-2 ">
          <DateRangeFilter />
          <LocationFilter />
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-auto ">{renderContent()}</div>
    </div>
  );
};
