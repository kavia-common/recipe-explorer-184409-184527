/**
 * PUBLIC_INTERFACE
 * MockRecipesRepository: In-memory recipes source used for development.
 * Later can be swapped with APIRecipesRepository without changing UI components.
 */
function simpleId() {
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export class MockRecipesRepository {
  constructor() {
    // Seed a few recipes; images should be placed under public/assets
    this._recipes = [
      {
        id: simpleId(),
        title: 'Citrus Grilled Salmon',
        description: 'Bright, zesty salmon with herbs and a touch of garlic.',
        image: 'assets/salmon.jpg',
        tags: ['seafood', 'grill', 'healthy'],
        ingredients: [
          '2 salmon fillets',
          '1 lemon, sliced',
          '2 tbsp olive oil',
          '2 cloves garlic, minced',
          'Salt & pepper',
          'Fresh dill'
        ],
        steps: [
          'Preheat grill to medium-high.',
          'Mix olive oil, garlic, salt, and pepper. Brush over salmon.',
          'Grill salmon 4–5 min per side, adding lemon slices on top.',
          'Garnish with dill and serve.'
        ]
      },
      {
        id: simpleId(),
        title: 'Creamy Mushroom Pasta',
        description: 'Rich and comforting pasta with mushrooms and parmesan.',
        image: 'assets/pasta.jpg',
        tags: ['pasta', 'vegetarian'],
        ingredients: [
          '200g fettuccine',
          '250g mushrooms, sliced',
          '1 cup cream',
          '1/2 cup grated parmesan',
          '2 tbsp butter',
          'Salt & pepper'
        ],
        steps: [
          'Boil pasta until al dente.',
          'Sauté mushrooms in butter until browned.',
          'Add cream, simmer, then stir in parmesan.',
          'Combine with pasta. Season and serve.'
        ]
      },
      {
        id: simpleId(),
        title: 'Tropical Smoothie Bowl',
        description: 'A vibrant start with mango, pineapple, and coconut.',
        image: 'assets/smoothie.jpg',
        tags: ['breakfast', 'vegan'],
        ingredients: [
          '1 cup frozen mango',
          '1 cup frozen pineapple',
          '1 banana',
          '1/2 cup coconut milk',
          'Toppings: granola, coconut flakes, berries'
        ],
        steps: [
          'Blend mango, pineapple, banana, and coconut milk until thick.',
          'Pour into a bowl and add toppings of choice.'
        ]
      }
    ]
  }

  // PUBLIC_INTERFACE
  async list() {
    /** Returns an array of recipe summaries with full details included for mock. */
    return this._recipes
  }

  // PUBLIC_INTERFACE
  async getById(id) {
    /** Returns a single recipe by id or null. */
    return this._recipes.find(r => r.id === id) || null
  }
}
