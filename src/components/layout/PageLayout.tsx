import { DateRangeFilter } from '@/components/filters/DateRangeFilter';
import { LocationFilter } from '@/components/filters/LocationFilter';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  additionalFilters?: ReactNode;
}

export const PageLayout = ({
  title,
  children,
  additionalFilters,
}: PageLayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 px-3 pt-3 md:px-6 md:pt-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{title}</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <DateRangeFilter />
          <LocationFilter />
          {additionalFilters}
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-auto px-3 pb-3 md:px-6 md:pb-6">
        {children}
      </div>
    </div>
  );
};
