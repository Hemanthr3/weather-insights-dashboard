import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LOCATIONS } from '@/config/constants';
import { useFilterStore } from '@/stores/useFilterStore';

export const LocationFilter = () => {
  const { selectedLocation, setSelectedLocation } = useFilterStore();

  const handleChange = (locationId: string) => {
    const location = LOCATIONS.find((loc) => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Location</label>
      <Select value={selectedLocation.id} onValueChange={handleChange}>
        <SelectTrigger className="w-full md:w-[250px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {LOCATIONS.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
