import { MultiParameterChart } from '@/components/charts/MultiParameterChart';
import { ChartSkeleton } from '@/components/common/ChartSkeleton';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Loader } from '@/components/common/Loader';
import { DateRangeFilter } from '@/components/filters/DateRangeFilter';
import { LocationFilter } from '@/components/filters/LocationFilter';
import { ParameterFilter } from '@/components/filters/ParameterFilter';
import { useHourlyWeather } from '@/hooks/useWeatherData';
import { useFilterStore } from '@/stores/useFilterStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Details = () => {
  const { dateRange, selectedLocation, selectedParameters } = useFilterStore();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useHourlyWeather({
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
      startDate: dateRange.start,
      endDate: dateRange.end,
      parameters: selectedParameters,
    });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Details</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <DateRangeFilter />
          <LocationFilter />
          <ParameterFilter />
        </div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Details</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <DateRangeFilter />
          <LocationFilter />
          <ParameterFilter />
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
      {/* Header with transition indicator */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Details</h1>

        {/* Transition indicator */}
        <AnimatePresence>
          {isFetching && data && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating chart...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <DateRangeFilter />
        <LocationFilter />
        <ParameterFilter disabled={isFetching} />
      </div>

      {/* Chart with smooth transition */}
      <AnimatePresence mode="wait">
        {isFetching && !data ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChartSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key={selectedParameters.join(',')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFetching ? 0.6 : 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MultiParameterChart data={data} parameters={selectedParameters} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
