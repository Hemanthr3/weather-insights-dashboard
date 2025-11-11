import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_CONFIG } from '@/config/constants';
import type { DailyWeatherResponse } from '@/types/weather.types';
import { transformDailyData } from '@/utils/chartUtils';
import { formatChartDate } from '@/utils/dateUtils';
import { Thermometer } from 'lucide-react';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface TemperatureChartProps {
  data: DailyWeatherResponse;
  onClick?: () => void;
}

export const TemperatureChart = ({ data, onClick }: TemperatureChartProps) => {
  const chartData = useMemo(() => transformDailyData(data), [data]);

  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Temperature
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={CHART_CONFIG.MARGINS}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_CONFIG.GRID_STROKE}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={formatChartDate}
            />
            <YAxis
              label={{
                value: 'Temperature (°C)',
                angle: -90,
                position: 'insideLeft',
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
              }}
              labelFormatter={formatChartDate}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="tempMax"
              name="Max"
              stroke={CHART_CONFIG.COLORS.temperature.max}
              strokeWidth={2}
              dot={false}
              animationDuration={CHART_CONFIG.ANIMATION_DURATION}
            />
            <Line
              type="monotone"
              dataKey="tempMean"
              name="Mean"
              stroke={CHART_CONFIG.COLORS.temperature.mean}
              strokeWidth={2}
              dot={false}
              animationDuration={CHART_CONFIG.ANIMATION_DURATION}
            />
            <Line
              type="monotone"
              dataKey="tempMin"
              name="Min"
              stroke={CHART_CONFIG.COLORS.temperature.min}
              strokeWidth={2}
              dot={false}
              animationDuration={CHART_CONFIG.ANIMATION_DURATION}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-center text-sm text-gray-500 mt-2">Daily</div>
      </CardContent>
    </Card>
  );
};
