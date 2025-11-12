import { ChartCard } from '@/components/common/ChartCard';
import { CHART_CONFIG } from '@/config/constants';
import type { DailyChartData } from '@/utils/chartUtils';
import { formatChartDate } from '@/utils/dateUtils';
import { CloudRain } from 'lucide-react';
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
  data: DailyChartData[];
  onClick?: () => void;
}

export const PrecipitationChart = ({
  data,
  onClick,
}: PrecipitationChartProps) => {
  return (
    <ChartCard
      title="Precipitation"
      icon={CloudRain}
      onClick={onClick}
      footerLabel="Daily"
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={CHART_CONFIG.MARGINS}>
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
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
