import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, ServerCrash, WifiOff } from 'lucide-react';

interface ErrorMessageProps {
  error: Error & { response?: { status?: number } };
  retry?: () => void;
}

const getErrorDetails = (error: ErrorMessageProps['error']) => {
  // Check if offline
  if (!navigator.onLine) {
    return {
      icon: WifiOff,
      title: 'No Internet Connection',
      message: 'Please check your network connection and try again.',
      color: 'orange',
    };
  }

  // Check HTTP status codes
  const status = error.response?.status;

  if (status === 404) {
    return {
      icon: AlertCircle,
      title: 'Data Not Found',
      message:
        'Weather data is not available for the selected location or date range.',
      color: 'yellow',
    };
  }

  if (status === 429) {
    return {
      icon: Clock,
      title: 'Too Many Requests',
      message: 'Please wait a moment before trying again.',
      color: 'orange',
    };
  }

  if (status && status >= 500) {
    return {
      icon: ServerCrash,
      title: 'Server Error',
      message:
        'The weather service is temporarily unavailable. Please try again later.',
      color: 'red',
    };
  }

  // Default error
  return {
    icon: AlertCircle,
    title: 'Failed to Load Data',
    message: error.message || 'An unexpected error occurred. Please try again.',
    color: 'red',
  };
};

export const ErrorMessage = ({ error, retry }: ErrorMessageProps) => {
  const { icon: Icon, title, message, color } = getErrorDetails(error);

  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      title: 'text-red-900',
      message: 'text-red-700',
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      title: 'text-orange-900',
      message: 'text-orange-700',
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      message: 'text-yellow-700',
    },
  };

  const classes = colorClasses[color as keyof typeof colorClasses];

  return (
    <div
      className={`flex flex-col items-center justify-center h-[400px] ${classes.bg} rounded-lg p-6`}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`w-12 h-12 ${classes.icon} mb-4`} aria-hidden="true" />
      <h3 className={`text-lg font-semibold ${classes.title} mb-2`}>{title}</h3>
      <p className={`text-sm ${classes.message} mb-4 text-center max-w-md`}>
        {message}
      </p>
      {retry && (
        <Button
          onClick={retry}
          variant="outline"
          aria-label="Retry loading data"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
