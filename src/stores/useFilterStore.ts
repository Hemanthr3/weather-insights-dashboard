import { DATE_CONFIG, LOCATIONS } from '@/config/constants';
import type { DateRange, Location } from '@/types/weather.types';
import { format, subDays } from 'date-fns';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FilterState {
  // State
  dateRange: DateRange;
  selectedLocation: Location;
  selectedParameters: string[];

  // Actions
  setDateRange: (range: DateRange) => void;
  setSelectedLocation: (location: Location) => void;
  setSelectedParameters: (params: string[]) => void;
  toggleParameter: (paramId: string) => void;
  resetFilters: () => void;
}

const getDefaultDateRange = (): DateRange => {
  const end = new Date();
  const start = subDays(end, DATE_CONFIG.DEFAULT_RANGE_DAYS);
  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
};

const initialState = {
  dateRange: getDefaultDateRange(),
  selectedLocation: LOCATIONS[0], // Default to New York
  selectedParameters: ['temperature'],
};

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setDateRange: (range) =>
          set({ dateRange: range }, false, 'setDateRange'),

        setSelectedLocation: (location) =>
          set({ selectedLocation: location }, false, 'setSelectedLocation'),

        setSelectedParameters: (params) =>
          set({ selectedParameters: params }, false, 'setSelectedParameters'),

        toggleParameter: (paramId) =>
          set(
            (state) => {
              const current = state.selectedParameters;

              // If already selected
              if (current.includes(paramId)) {
                // Can't deselect if it's the only one
                if (current.length === 1) return state;
                // Remove it
                return {
                  selectedParameters: current.filter((p) => p !== paramId),
                };
              }

              // If not selected
              if (current.length < 2) {
                // Add it (space available)
                return { selectedParameters: [...current, paramId] };
              } else {
                // Replace the first one (FIFO)
                return { selectedParameters: [current[1], paramId] };
              }
            },
            false,
            'toggleParameter'
          ),

        resetFilters: () => set(initialState, false, 'resetFilters'),
      }),
      { name: 'weather-filters' }
    ),
    { name: 'FilterStore' }
  )
);
