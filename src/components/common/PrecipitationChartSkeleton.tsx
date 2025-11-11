import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudRain } from 'lucide-react';

export const PrecipitationChartSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudRain className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Precipitation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] bg-gray-100 rounded-lg relative overflow-hidden">
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {/* Fake bar chart */}
          <div className="absolute inset-0 p-6 flex items-end justify-between gap-1">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-200 rounded-t"
                style={{
                  height: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-2">Daily</div>
      </CardContent>
    </Card>
  );
};
