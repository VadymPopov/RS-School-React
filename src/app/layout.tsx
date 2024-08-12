'use client';
import React from 'react';
import ThemeProvider from '../ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
