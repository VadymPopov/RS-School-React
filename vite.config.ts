/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import reactVitest from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    process.env.VITEST
      ? reactVitest()
      : remix({
          ignoredRouteFiles: ['**/*.css'],
        }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
