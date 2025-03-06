import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import Providers from '@/components/Providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ErrorBoundary>
  );
}
