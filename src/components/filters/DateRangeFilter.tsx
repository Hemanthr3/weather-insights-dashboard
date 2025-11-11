import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFilterStore } from '@/stores/useFilterStore';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';

export const DateRangeFilter = () => {
  const { dateRange, setDateRange } = useFilterStore();

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, start: e.target.value });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, end: e.target.value });
  };

  const formatDateDisplay = () => {
    try {
      const start = format(parseISO(dateRange.start), 'MMM d, yyyy');
      const end = format(parseISO(dateRange.end), 'MMM d, yyyy');
      return `${start} - ${end}`;
    } catch {
      return 'Select date range';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Date Range</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[300px] justify-start text-left font-normal"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {formatDateDisplay()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={handleStartChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={handleEndChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <p className="text-xs text-gray-500">Maximum 3 months (90 days)</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
