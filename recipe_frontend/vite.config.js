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
      host: '0.0.0.0',
      allowedHosts: ['.kavia.ai'],
      port: resolvedPort,
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