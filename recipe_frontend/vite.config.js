/* eslint-disable */
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import blitsVitePlugins from '@lightningjs/blits/vite'

export default defineConfig(({ command, mode }) => {
  // Load env variables (VITE_* and others), do not prefix filter here since we want PORT too
  const env = loadEnv(mode, process.cwd(), '')
  const resolvedPort =
    Number(env.VITE_PORT) ||
    Number(env.PORT) ||
    3000

  return {
    base: '/', // Set to your base path if you are deploying to a subdirectory (example: /myApp/)
    plugins: [...blitsVitePlugins],
    resolve: {
      mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    },
    server: {
      // Bind to all interfaces so the preview proxy can reach it
      host: '0.0.0.0',
      // Let Vite use resolvedPort from env (VITE_PORT or PORT) or default 3000
      port: resolvedPort,
      // Do not auto-increment; fail if 3000 is occupied so healthcheck is accurate
      strictPort: true,
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
      fs: {
        allow: ['..'],
      },
    },
    worker: {
      format: 'es',
    },
  }
})