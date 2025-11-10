import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'
import { theme } from './theme/theme.js'
import { createStore } from './store/store.js'

/**
 * PUBLIC_INTERFACE
 * LightningJS (Blits) Application root for Recipe Explorer.
 * - Renders RouterView to display pages
 * - Provides global theme store and routes
 * - Reads environment variables via import.meta.env
 */
export default Blits.Application('RecipeExplorerApp', {
  template: `
    <Element :color="$appBg" w="1920" h="1080">
      <!-- Gradient accent background -->
      <Element x="0" y="0" w="1920" h="1080" :color="$gradientFrom" alpha="0.25" />
      <RouterView />
    </Element>
  `,
  routes: [
    { path: '/', component: Home, options: { title: 'Explore Recipes' } }
  ],
  state() {
    const env = import.meta.env || {}
    return {
      appBg: theme.backgroundColor,
      gradientFrom: theme.gradientFrom,
      env: {
        VITE_API_BASE: env.VITE_API_BASE || '',
        VITE_BACKEND_URL: env.VITE_BACKEND_URL || '',
        VITE_FRONTEND_URL: env.VITE_FRONTEND_URL || '',
        VITE_WS_URL: env.VITE_WS_URL || '',
        VITE_NODE_ENV: env.VITE_NODE_ENV || 'development',
      },
    }
  },
  plugins: [
    Blits.Plugin(createStore())
  ],
  onReady() {
    console.log('RecipeExplorerApp loaded. ENV VITE_API_BASE:', this.env?.VITE_API_BASE || '(unset)')
  }
})
