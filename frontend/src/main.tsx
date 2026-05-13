import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { store } from './store';
import { queryClient } from './services/queryClient';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: '12px',
                  background: '#fff',
                  color: '#1A1460',
                  boxShadow: '0 10px 40px -10px rgba(61,53,168,0.20)',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  borderLeft: '4px solid #3D35A8',
                },
                success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
                error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
              }}
            />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
