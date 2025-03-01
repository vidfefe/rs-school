import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/styles/globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
