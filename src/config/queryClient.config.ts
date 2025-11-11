import { QueryClient } from '@tanstack/react-query';

export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME,
      gcTime: QUERY_CONFIG.CACHE_TIME,
      retry: QUERY_CONFIG.RETRY_ATTEMPTS,
      retryDelay: QUERY_CONFIG.RETRY_DELAY,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
