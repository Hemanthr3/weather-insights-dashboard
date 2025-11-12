import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Header } from '@/components/layout/Header';
import { queryClient } from '@/config/queryClient.config';
import { Details } from '@/pages/Details';
import { Overview } from '@/pages/Overview';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';

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
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/details" element={<Details />} />
                </Routes>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
