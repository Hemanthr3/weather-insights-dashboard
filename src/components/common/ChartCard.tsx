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
      role={onClick ? 'button' : 'region'}
      aria-label={`${title} chart${onClick ? ', click to view details' : ''}`}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {footerLabel && (
          <div
            className="text-center text-sm text-gray-500 mt-2"
            aria-label={`Time period: ${footerLabel}`}
          >
            {footerLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
