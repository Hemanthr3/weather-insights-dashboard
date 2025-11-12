import { MultiParameterChart } from '@/components/charts/MultiParameterChart';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { TemperatureChartSkeleton } from '@/components/common/TemperatureChartSkeleton';
import { useHourlyWeather } from '@/hooks/useWeatherData';
import { useFilterStore } from '@/stores/useFilterStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const DetailsCharts = () => {
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
    return <TemperatureChartSkeleton />;
  }

  if (isError) {
    return <ErrorMessage error={error as Error} retry={refetch} />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="relative">
      {/* Transition indicator */}
      <AnimatePresence>
        {isFetching && data && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-0 right-0 z-10 flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Updating chart...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chart with animation */}
      <AnimatePresence mode="wait">
        {isFetching && !data ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TemperatureChartSkeleton />
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

export default DetailsCharts;
