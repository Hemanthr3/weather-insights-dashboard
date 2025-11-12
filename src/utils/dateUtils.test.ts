import { describe, it, expect } from 'vitest';
import { formatChartDate, formatTooltipDate, validateDateRange } from './dateUtils';

describe('dateUtils', () => {
  describe('formatChartDate', () => {
    it('should format ISO date to "MMM d" format', () => {
      const result = formatChartDate('2024-01-15');
      expect(result).toBe('Jan 15');
    });

    it('should format different months correctly', () => {
      expect(formatChartDate('2024-06-01')).toBe('Jun 1');
      expect(formatChartDate('2024-12-25')).toBe('Dec 25');
    });

    it('should return original string for invalid date', () => {
      const invalidDate = 'invalid-date';
      const result = formatChartDate(invalidDate);
      expect(result).toBe(invalidDate);
    });
  });

  describe('formatTooltipDate', () => {
    it('should format ISO datetime with time', () => {
      const result = formatTooltipDate('2024-01-15T14:30:00');
      expect(result).toBe('Jan 15, 2024 14:30');
    });

    it('should handle midnight correctly', () => {
      const result = formatTooltipDate('2024-06-01T00:00:00');
      expect(result).toBe('Jun 1, 2024 00:00');
    });
  });

  describe('validateDateRange', () => {
    it('should return true for valid date range within max days', () => {
      const start = '2024-01-01';
      const end = '2024-01-15';
      const result = validateDateRange(start, end, 30);
      expect(result).toBe(true);
    });

    it('should return false when range exceeds max days', () => {
      const start = '2024-01-01';
      const end = '2024-06-01'; // 152 days
      const result = validateDateRange(start, end, 90);
      expect(result).toBe(false);
    });

    it('should return false when end date is before start date', () => {
      const start = '2024-06-01';
      const end = '2024-01-01';
      const result = validateDateRange(start, end, 90);
      expect(result).toBe(false);
    });

    it('should return false for invalid date strings', () => {
      const result = validateDateRange('invalid', 'dates', 90);
      expect(result).toBe(false);
    });

    it('should return true for exactly max days', () => {
      const start = '2024-01-01';
      const end = '2024-03-31'; // Exactly 90 days
      const result = validateDateRange(start, end, 90);
      expect(result).toBe(true);
    });
  });
});

