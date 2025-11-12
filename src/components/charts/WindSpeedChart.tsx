import { ChartCard } from '@/components/common/ChartCard';
import { CHART_CONFIG } from '@/config/constants';
import type { DailyChartData } from '@/utils/chartUtils';
import { formatChartDate } from '@/utils/dateUtils';
import { Wind } from 'lucide-react';
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
  data: DailyChartData[];
  onClick?: () => void;
}

export const WindSpeedChart = ({ data, onClick }: WindSpeedChartProps) => {
  return (
    <ChartCard
      title="Wind Speed"
      icon={Wind}
      onClick={onClick}
      footerLabel="Daily"
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={CHART_CONFIG.MARGINS}>
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
    </ChartCard>
  );
};
