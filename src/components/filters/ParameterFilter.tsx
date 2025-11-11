import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PARAMETERS } from '@/config/constants';
import { useFilterStore } from '@/stores/useFilterStore';
import { ChevronDown } from 'lucide-react';
import { useTransition } from 'react';

interface ParameterFilterProps {
  disabled?: boolean;
}

export const ParameterFilter = ({ disabled }: ParameterFilterProps) => {
  const [isPending, startTransition] = useTransition();
  const { selectedParameters, setSelectedParameters } = useFilterStore();

  const handleToggle = (paramId: string) => {
    startTransition(() => {
      if (selectedParameters.includes(paramId)) {
        // Deselect (keep at least 1)
        if (selectedParameters.length > 1) {
          setSelectedParameters(
            selectedParameters.filter((p) => p !== paramId)
          );
        }
      } else {
        // Select (max 2)
        if (selectedParameters.length < 2) {
          setSelectedParameters([...selectedParameters, paramId]);
        } else {
          // Replace first one (FIFO)
          setSelectedParameters([selectedParameters[1], paramId]);
        }
      }
    });
  };

  const getSelectedLabels = () => {
    return selectedParameters
      .map((id) => PARAMETERS.find((p) => p.id === id)?.label)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-[280px] justify-between"
          disabled={disabled || isPending}
        >
          <span className="truncate">
            {getSelectedLabels() || 'Select parameters'}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <div className="p-4 space-y-2">
          <div className="text-sm font-medium text-gray-500 mb-3">
            Select up to 2 parameters
          </div>

          {PARAMETERS.map((param) => {
            const isSelected = selectedParameters.includes(param.id);
            const isDisabled = selectedParameters.length >= 2 && !isSelected;

            return (
              <div
                key={param.id}
                className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => !isDisabled && handleToggle(param.id)}
              >
                <Checkbox checked={isSelected} disabled={isDisabled} />
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: param.color }}
                  />
                  <span className="text-sm">{param.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
