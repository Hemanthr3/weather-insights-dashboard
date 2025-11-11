import { differenceInDays, format, parseISO } from 'date-fns';

export const formatDate = (
  dateString: string,
  formatStr: string = 'MMM d'
): string => {
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
};

export const formatChartDate = (dateString: string): string => {
  return formatDate(dateString, 'MMM d');
};

export const formatTooltipDate = (dateString: string): string => {
  return formatDate(dateString, 'MMM d, yyyy HH:mm');
};

export const validateDateRange = (
  start: string,
  end: string,
  maxDays: number
): boolean => {
  try {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const diff = differenceInDays(endDate, startDate);
    return diff > 0 && diff <= maxDays;
  } catch {
    return false;
  }
};
