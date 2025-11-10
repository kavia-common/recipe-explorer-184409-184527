import Blits from '@lightningjs/blits'
import { MockRecipesRepository } from '../data/MockRecipesRepository.js'
import { APIRecipesRepository } from '../data/APIRecipesRepository.js'
import { theme } from '../theme/theme.js'

/**
 * PUBLIC_INTERFACE
 * createStore: Returns a Blits plugin that registers a global store with recipe data/state.
 * Store shape:
 * - recipes: array of all recipes
 * - filtered: array filtered by query
 * - query: current search text
 * - selectedId: id of selected recipe (detail open)
 * - repoType: 'mock' | 'api'
 * - env: import.meta.env values passed by App if needed
 */
export function createStore() {
  const repo = new MockRecipesRepository()
  // API repo is constructed lazily when needed
  let apiRepo = null

  return Blits.Plugin('GlobalStore', () => ({
    id: 'store',
    state: {
      recipes: [],
      filtered: [],
      query: '',
      selectedId: null,
      repoType: 'mock',
      theme,
    },
    methods: {
      async init(env) {
        // Use mock by default. If VITE_API_BASE present, still stay mock until repoType switched to 'api'
        if (this.repoType === 'mock') {
          this.recipes = await repo.list()
          this.filtered = this.recipes
        } else {
          if (!apiRepo) apiRepo = new APIRecipesRepository(env?.VITE_API_BASE || '')
          this.recipes = await apiRepo.list()
          this.filtered = this.recipes
        }
      },
      setQuery(q) {
        this.query = q || ''
        const queryLower = this.query.trim().toLowerCase()
        if (!queryLower) {
          this.filtered = this.recipes
          return
        }
        this.filtered = this.recipes.filter(r => {
          return (
            r.title.toLowerCase().includes(queryLower) ||
            (r.description || '').toLowerCase().includes(queryLower) ||
            (r.tags || []).some(t => t.toLowerCase().includes(queryLower)) ||
            (r.ingredients || []).some(i => i.toLowerCase().includes(queryLower))
          )
        })
      },
      select(id) {
        this.selectedId = id
      },
      closeDetail() {
        this.selectedId = null
      },
      switchRepository(type, env) {
        this.repoType = type === 'api' ? 'api' : 'mock'
        return this.init(env)
      }
    }
  }))
}
