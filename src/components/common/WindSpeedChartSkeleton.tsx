import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind } from 'lucide-react';

export const WindSpeedChartSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Wind Speed</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] bg-gray-100 rounded-lg relative overflow-hidden">
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {/* Fake line chart (wavy) */}
          <svg
            className="absolute inset-0 w-full h-full p-6"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,50 Q 25,30 50,50 T 100,50"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="text-center text-sm text-gray-400 mt-2">Daily</div>
      </CardContent>
    </Card>
  );
};
