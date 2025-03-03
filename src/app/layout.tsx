'use client';
import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/styles/globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <Provider store={store}>{children}</Provider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
