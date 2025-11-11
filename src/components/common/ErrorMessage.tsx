import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: Error;
  retry?: () => void;
}

export const ErrorMessage = ({ error, retry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-red-50 rounded-lg p-6">
      <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        Failed to load data
      </h3>
      <p className="text-sm text-red-700 mb-4 text-center">{error.message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
};
