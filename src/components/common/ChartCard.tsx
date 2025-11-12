import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  footerLabel?: string;
  className?: string;
}

export const ChartCard = ({
  title,
  icon: Icon,
  children,
  onClick,
  footerLabel,
  className = '',
}: ChartCardProps) => {
  return (
    <Card
      className={`${
        onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''
      } ${className}`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {footerLabel && (
          <div className="text-center text-sm text-gray-500 mt-2">
            {footerLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
