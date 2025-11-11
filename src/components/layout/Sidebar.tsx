import { cn } from '@/lib/utils';
import { Activity, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-gray-800 flex flex-col items-center py-4 gap-4 z-10">
      <Link
        to="/"
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
          location.pathname === '/'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        )}
        title="Overview"
      >
        <BarChart3 className="h-5 w-5" />
      </Link>

      <Link
        to="/details"
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
          location.pathname === '/details'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        )}
        title="Details"
      >
        <Activity className="h-5 w-5" />
      </Link>
    </aside>
  );
};
