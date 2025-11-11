import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_CONFIG } from '@/config/constants';
import type { DailyWeatherResponse } from '@/types/weather.types';
import { transformDailyData } from '@/utils/chartUtils';
import { formatChartDate } from '@/utils/dateUtils';
import { Wind } from 'lucide-react';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface WindSpeedChartProps {
  data: DailyWeatherResponse;
  onClick?: () => void;
}

export const WindSpeedChart = ({ data, onClick }: WindSpeedChartProps) => {
  const chartData = useMemo(() => transformDailyData(data), [data]);

  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Wind Speed
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
                value: 'Wind Speed (km/h)',
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
            <Line
              type="monotone"
              dataKey="windSpeed"
              name="Max Wind Speed"
              stroke={CHART_CONFIG.COLORS.windspeed}
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
