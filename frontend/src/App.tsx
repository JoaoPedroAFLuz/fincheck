import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { Router } from './Router';

const queryCliente = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryCliente}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

