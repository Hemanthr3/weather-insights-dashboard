import { Loader } from '@/components/common/Loader';
import { PageLayout } from '@/components/layout/PageLayout';
import { lazy, Suspense } from 'react';

// Lazy load the heavy chart section (contains Recharts)
const OverviewCharts = lazy(
  () => import('@/components/sections/OverviewCharts')
);

const Overview = () => {
  return (
    <PageLayout title="Overview">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-96">
            <Loader />
          </div>
        }
      >
        <OverviewCharts />
      </Suspense>
    </PageLayout>
  );
};

export default Overview;
