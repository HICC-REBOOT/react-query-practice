import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import worker from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <App />
              <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
          </RecoilRoot>
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
