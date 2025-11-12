import { ChartCard } from '@/components/common/ChartCard';
import { CHART_CONFIG, PARAMETERS } from '@/config/constants';
import type { HourlyWeatherResponse } from '@/types/weather.types';
import { transformHourlyData } from '@/utils/chartUtils';
import { formatChartDate, formatTooltipDate } from '@/utils/dateUtils';
import { Activity } from 'lucide-react';
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

interface MultiParameterChartProps {
  data: HourlyWeatherResponse;
  parameters: string[];
}

export const MultiParameterChart = ({
  data,
  parameters,
}: MultiParameterChartProps) => {
  const chartData = useMemo(
    () => transformHourlyData(data, parameters),
    [data, parameters]
  );

  const paramConfigs = parameters.map(
    (id) => PARAMETERS.find((p) => p.id === id)!
  );

  const title = paramConfigs.map((p) => p.label).join(' & ');

  return (
    <ChartCard title={title} icon={Activity} footerLabel="Hourly">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={CHART_CONFIG.MARGINS}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_CONFIG.GRID_STROKE}
          />

          {/* X-Axis (Time) */}
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            tickFormatter={formatChartDate}
          />

          {/* Left Y-Axis (First parameter) */}
          <YAxis
            yAxisId="left"
            label={{
              value: `${paramConfigs[0].label} (${paramConfigs[0].unit})`,
              angle: -90,
              position: 'insideLeft',
            }}
            tick={{ fontSize: 12 }}
          />

          {/* Right Y-Axis (Second parameter, if exists) */}
          {paramConfigs.length === 2 && (
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: `${paramConfigs[1].label} (${paramConfigs[1].unit})`,
                angle: 90,
                position: 'insideRight',
              }}
              tick={{ fontSize: 12 }}
            />
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
            }}
            labelFormatter={formatTooltipDate}
          />

          <Legend />

          {/* First Line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey={paramConfigs[0].id}
            name={paramConfigs[0].label}
            stroke={paramConfigs[0].color}
            strokeWidth={2}
            dot={false}
            animationDuration={CHART_CONFIG.ANIMATION_DURATION}
          />

          {/* Second Line (if exists) */}
          {paramConfigs.length === 2 && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={paramConfigs[1].id}
              name={paramConfigs[1].label}
              stroke={paramConfigs[1].color}
              strokeWidth={2}
              dot={false}
              animationDuration={CHART_CONFIG.ANIMATION_DURATION}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
