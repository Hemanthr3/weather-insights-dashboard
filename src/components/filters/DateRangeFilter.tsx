import { Button } from '@/components/ui/button';
import { Calendar, type DateRange } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/stores/useFilterStore';
import { differenceInDays, format, parseISO } from 'date-fns';
import { AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const MAX_RANGE_DAYS = 90;

export const DateRangeFilter = () => {
  const { dateRange, setDateRange } = useFilterStore();
  const [date, setDate] = useState<DateRange | undefined>();
  const [error, setError] = useState<string>('');

  // Convert string dates to Date objects
  useEffect(() => {
    try {
      setDate({
        from: parseISO(dateRange.start),
        to: parseISO(dateRange.end),
      });
    } catch (error) {
      console.error('Error parsing dates:', error);
    }
  }, [dateRange]);

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      setDate(range);
      setError('');
      return;
    }

    // If only 'from' is selected, allow it
    if (!range.to) {
      setDate(range);
      setError('');
      return;
    }

    // Validate range is <= 90 days
    const daysDiff = differenceInDays(range.to, range.from);

    if (daysDiff > MAX_RANGE_DAYS) {
      setError(`Maximum range is ${MAX_RANGE_DAYS} days (3 months)`);
      // Reset to just start date
      setDate({ from: range.from, to: undefined });
      return;
    }

    // Valid range, update state
    setError('');
    setDate(range);
    setDateRange({
      start: format(range.from, 'yyyy-MM-dd'),
      end: format(range.to, 'yyyy-MM-dd'),
    });
  };

  const formatDateDisplay = () => {
    if (!date?.from) return 'Select date range';
    if (!date.to) return format(date.from, 'MMM d, yyyy');
    return `${format(date.from, 'MMM d, yyyy')} - ${format(
      date.to,
      'MMM d, yyyy'
    )}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Date Range</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full md:w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
            aria-label={`Select date range, currently ${formatDateDisplay()}`}
            aria-haspopup="dialog"
          >
            <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            {formatDateDisplay()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(calendarDate) => {
              // Disable future dates
              // if (calendarDate > new Date()) return true;

              // If a start date is selected, disable dates > 90 days from it
              if (date?.from && !date?.to) {
                const diffDays = differenceInDays(calendarDate, date.from);
                // Disable if more than 90 days after start OR before start
                return diffDays > MAX_RANGE_DAYS || diffDays < 0;
              }

              return false;
            }}
          />
          <div className="p-3 border-t">
            {error ? (
              <div className="flex items-center gap-2 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{error}</span>
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                Maximum 3 months (90 days)
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
