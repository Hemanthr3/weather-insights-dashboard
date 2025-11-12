import { PrecipitationChart } from '@/components/charts/PrecipitationChart';
import { TemperatureChart } from '@/components/charts/TemperatureChart';
import { WindSpeedChart } from '@/components/charts/WindSpeedChart';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { PrecipitationChartSkeleton } from '@/components/common/PrecipitationChartSkeleton';
import { TemperatureChartSkeleton } from '@/components/common/TemperatureChartSkeleton';
import { WindSpeedChartSkeleton } from '@/components/common/WindSpeedChartSkeleton';
import { DateRangeFilter } from '@/components/filters/DateRangeFilter';
import { LocationFilter } from '@/components/filters/LocationFilter';
import { LOCATIONS } from '@/config/constants';
import { useDailyWeather } from '@/hooks/useWeatherData';
import { useFilterStore } from '@/stores/useFilterStore';
import { useNavigate } from 'react-router-dom';

export const Overview = () => {
  const navigate = useNavigate();
  const { dateRange, selectedLocation, setSelectedParameters } =
    useFilterStore();

  // Use first location when "All Cities" is selected
  const activeLocation =
    selectedLocation === 'all' ? LOCATIONS[0] : selectedLocation;

  const { data, isLoading, isError, error, refetch } = useDailyWeather({
    lat: activeLocation.lat,
    lon: activeLocation.lon,
    startDate: dateRange.start,
    endDate: dateRange.end,
  });

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

    if (!data) {
      return null;
    }

    return (
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
