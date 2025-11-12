import { Loader } from '@/components/common/Loader';
import { ParameterFilter } from '@/components/filters/ParameterFilter';
import { PageLayout } from '@/components/layout/PageLayout';
import { lazy, Suspense } from 'react';

// Lazy load the heavy chart section (contains Recharts + Framer Motion)
const DetailsCharts = lazy(() => import('@/components/sections/DetailsCharts'));

const Details = () => {
  return (
    <PageLayout title="Details">
      <div className="relative">
        {/* Parameter filter positioned absolutely */}
        <div className="absolute top-6 right-12 z-10">
          <ParameterFilter />
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <Loader />
            </div>
          }
        >
          <DetailsCharts />
        </Suspense>
      </div>
    </PageLayout>
  );
};

export default Details;
