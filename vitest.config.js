import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest reemplaza Jasmine + Karma y utiliza jsdom para probar componentes React.
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
