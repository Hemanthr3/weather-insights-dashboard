import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LOCATIONS } from '@/config/constants';
import { useFilterStore } from '@/stores/useFilterStore';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LocationFilter = () => {
  const { selectedLocation, setSelectedLocation } = useFilterStore();

  const handleLocationChange = (locationId: string) => {
    const location = LOCATIONS.find((loc) => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Location</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[250px] justify-between"
          >
            {selectedLocation.name}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-3" align="start">
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Select Location
            </div>

            {/* Individual Cities */}
            {LOCATIONS.map((location) => {
              const isSelected = selectedLocation.id === location.id;

              return (
                <button
                  key={location.id}
                  onClick={() => handleLocationChange(location.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100',
                    isSelected && 'bg-gray-100'
                  )}
                >
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full border-2 flex items-center justify-center',
                      isSelected ? 'border-primary' : 'border-gray-300'
                    )}
                  >
                    {isSelected && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span>{location.name}</span>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
