import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
// import { Provider } from 'react-redux';
// import { store } from '@/store/store';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </ThemeProvider>
  );
}
