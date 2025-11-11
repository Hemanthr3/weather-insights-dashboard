import { cn } from '@/lib/utils';
import { Cloud } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">
              Weather Insights
            </h1>
          </Link>

          <nav className="flex gap-4">
            <Link
              to="/"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === '/'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              Overview
            </Link>
            <Link
              to="/details"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === '/details'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              Details
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
