import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Header } from '@/components/layout/Header';
import { queryClient } from '@/config/queryClient.config';
import { Details } from '@/pages/Details';
import { Overview } from '@/pages/Overview';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/details" element={<Details />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
