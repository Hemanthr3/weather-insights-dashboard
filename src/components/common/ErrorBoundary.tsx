import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Error Boundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <AlertCircle className="w-16 h-16 text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              {this.state.error?.message}
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
