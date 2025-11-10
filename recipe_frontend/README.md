# recipe_frontend

LightningJS (Blits) frontend for Recipe Explorer following the Ocean Professional theme.

Features:
- Header, search bar, recipe grid with cards (image, title, description)
- Recipe detail view modal (image, title, ingredients, steps)
- Client-side filtering with mock data
- Ready to switch to API via environment variable VITE_API_BASE

Environment variables (read via import.meta.env):
- VITE_API_BASE
- VITE_BACKEND_URL
- VITE_FRONTEND_URL
- VITE_WS_URL
- VITE_NODE_ENV
- VITE_NEXT_TELEMETRY_DISABLED
- VITE_ENABLE_SOURCE_MAPS
- VITE_PORT
- VITE_TRUST_PROXY
- VITE_LOG_LEVEL
- VITE_HEALTHCHECK_PATH
- VITE_FEATURE_FLAGS
- VITE_EXPERIMENTS_ENABLED

Mock vs API:
- The app uses MockRecipesRepository by default.
- To use an API, set VITE_API_BASE and call this.$store.switchRepository('api', this.$app.env) from a component or add logic in Home.onInit to switch based on env.
- API repository expects endpoints:
  - GET ${VITE_API_BASE}/recipes
  - GET ${VITE_API_BASE}/recipes/:id

Assets:
- Images referenced by mock data should be placed in public/assets/: salmon.jpg, pasta.jpg, smoothie.jpg

Run:
- npm install
- npm run dev
- npm run preview (port 3000)
