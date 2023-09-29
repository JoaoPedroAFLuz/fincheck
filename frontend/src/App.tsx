import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { Router } from './Router';
import { AuthProvider } from './app/contexts/AuthContext';

const queryCliente = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryCliente}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

