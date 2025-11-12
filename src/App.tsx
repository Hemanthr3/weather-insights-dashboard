import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Loader } from '@/components/common/Loader';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { queryClient } from '@/config/queryClient.config';
import { QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Lazy load pages for code splitting
const Overview = lazy(() => import('@/pages/Overview'));
const Details = lazy(() => import('@/pages/Details'));

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="h-screen bg-[#FAFAFA] flex flex-col overflow-hidden">
            <Header />

            <main className="flex flex-1 overflow-hidden">
              <Sidebar />
              <div className="flex-1 h-full">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full">
                      <Loader />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/details" element={<Details />} />
                  </Routes>
                </Suspense>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
