import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      BACKEND_URL: JSON.stringify(env.BACKEND_URL),
    },
    plugins: [react()],
    server: {
      hmr: false,
      port: 5173,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3000',
      //     changeOrigin: true,
      //   },
      // },
    },
    resolve: {
      alias: {
        '@components': '/src/components',
        '@src': '/src',
        '@utils': '/src/utils',
      },
    },
  };
});
