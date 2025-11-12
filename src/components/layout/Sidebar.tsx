import { cn } from '@/lib/utils';
import { Activity, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-[55px] bg-[#FFFFFF] border-r border-[#E9EFF5] px-2 py-4 h-full gap-4 flex-col items-center">
      <Link
        to="/"
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
          location.pathname === '/'
            ? 'bg-accent text-primary'
            : 'text-gray-400 hover:bg-accent hover:text-primary'
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
            ? 'bg-accent text-primary'
            : 'text-gray-400 hover:bg-accent hover:text-primary'
        )}
        title="Details"
      >
        <Activity className="h-5 w-5" />
      </Link>
    </aside>
  );
};
