'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: true,
    },
  },
})
export const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
