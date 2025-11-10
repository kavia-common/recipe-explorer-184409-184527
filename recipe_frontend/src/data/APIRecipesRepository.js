 /**
  * PUBLIC_INTERFACE
  * APIRecipesRepository: Fetches recipes from backend using VITE_API_BASE (import.meta.env).
  * The constructor accepts baseUrl and does not hard-code any URLs.
  */
export class APIRecipesRepository {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || ''
  }

  // PUBLIC_INTERFACE
  async list() {
    /** Fetch list of recipes from /recipes */
    const url = `${this.baseUrl}/recipes`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch recipes: ${res.status}`)
    return await res.json()
  }

  // PUBLIC_INTERFACE
  async getById(id) {
    /** Fetch a recipe by id from /recipes/:id */
    const url = `${this.baseUrl}/recipes/${encodeURIComponent(id)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch recipe ${id}: ${res.status}`)
    return await res.json()
  }
}
