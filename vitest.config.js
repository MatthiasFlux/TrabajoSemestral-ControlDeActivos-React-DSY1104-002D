import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Configuarcion de Vitest
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['tests/**/*.spec.js', 'tests/**/*.spec.jsx'],
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx'],
    },
  },
});
