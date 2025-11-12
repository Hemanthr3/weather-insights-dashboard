import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_CONFIG } from '@/config/constants';
import type { DailyWeatherResponse } from '@/types/weather.types';
import { transformDailyData } from '@/utils/chartUtils';
import { formatChartDate } from '@/utils/dateUtils';
import { CloudRain } from 'lucide-react';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PrecipitationChartProps {
  data: DailyWeatherResponse;
  onClick?: () => void;
}

export const PrecipitationChart = ({
  data,
  onClick,
}: PrecipitationChartProps) => {
  const chartData = useMemo(() => transformDailyData(data), [data]);

  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudRain className="h-5 w-5" />
          Precipitation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={CHART_CONFIG.MARGINS}>
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
                value: 'Precipitation (mm)',
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
            <Bar
              dataKey="precipitation"
              fill={CHART_CONFIG.COLORS.precipitation}
              animationDuration={CHART_CONFIG.ANIMATION_DURATION}
              radius={[6,6,0,0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-center text-sm text-gray-500 mt-2">Daily</div>
      </CardContent>
    </Card>
  );
};
