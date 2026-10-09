import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppProvider.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { BrowserRouter } from 'react-router';

// 1. Creamos la instancia del cliente
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* aca voy a envolver la app para hacer poner a funciona el enrutamiento */}
    <BrowserRouter>
      {/* 2. Luegro encapsulamos o wrapeamos  */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
