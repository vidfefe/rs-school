import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import ErrorBoundary from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
