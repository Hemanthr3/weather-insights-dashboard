import { Link } from 'react-router-dom';
import { Profile } from './Profile';

export const Header = () => {
  return (
    <header className="bg-[#515151] px-3 py-2 md:p-3 h-11 md:h-12 w-full flex items-center justify-between md:justify-end">
      {/* Mobile title - clicking navigates to overview */}
      <Link
        to="/"
        className="md:hidden text-white font-semibold text-base hover:text-accent transition-colors"
      >
        Weather Insights
      </Link>

      <Profile />
    </header>
  );
};
