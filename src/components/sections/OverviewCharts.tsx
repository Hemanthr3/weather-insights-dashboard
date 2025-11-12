import { PrecipitationChart } from '@/components/charts/PrecipitationChart';
import { TemperatureChart } from '@/components/charts/TemperatureChart';
import { WindSpeedChart } from '@/components/charts/WindSpeedChart';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { PrecipitationChartSkeleton } from '@/components/common/PrecipitationChartSkeleton';
import { TemperatureChartSkeleton } from '@/components/common/TemperatureChartSkeleton';
import { WindSpeedChartSkeleton } from '@/components/common/WindSpeedChartSkeleton';
import { useDailyWeather } from '@/hooks/useWeatherData';
import { useFilterStore } from '@/stores/useFilterStore';
import { transformDailyData } from '@/utils/chartUtils';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const OverviewCharts = () => {
  const navigate = useNavigate();
  const { dateRange, selectedLocation, setSelectedParameters } =
    useFilterStore();

  const { data, isLoading, isError, error, refetch } = useDailyWeather({
    lat: selectedLocation.lat,
    lon: selectedLocation.lon,
    startDate: dateRange.start,
    endDate: dateRange.end,
  });

  // Transform data ONCE for all charts
  const chartData = useMemo(() => {
    return data ? transformDailyData(data) : null;
  }, [data]);

  const handleChartClick = (parameter: string) => {
    setSelectedParameters([parameter]);
    navigate('/details');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-6">
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-6">
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

export default OverviewCharts;
