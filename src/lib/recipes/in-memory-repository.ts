import type { Recipe } from '../../types/recipe';
import { cloneRecipe, type RecipeRepository } from './repository';

/**
 * Returns a repository that keeps recipe data entirely in memory.
 *
 * It is optimised for tests and local development: cloning ensures each call receives its own
 * copy, and the `seed` parameter mirrors how a persistent adapter would hydrate itself from
 * disk or a database. Swapping to a different adapter only requires changing the factory used
 * when constructing the `RecipeService`.
 */
export function createInMemoryRecipeRepository(seed: readonly Recipe[] = []): RecipeRepository {
  const recipes = new Map<string, Recipe>();

  for (const recipe of seed) {
    recipes.set(recipe.slug, cloneRecipe(recipe));
  }

  return {
    // eslint-disable-next-line @typescript-eslint/require-await
    async list() {
      return Array.from(recipes.values())
        .map(cloneRecipe)
        .sort((a, b) => a.title.localeCompare(b.title));
    },

    // eslint-disable-next-line @typescript-eslint/require-await
    async findBySlug(slug: string) {
      const match = recipes.get(slug);
      return match ? cloneRecipe(match) : undefined;
    },

    // eslint-disable-next-line @typescript-eslint/require-await
    async findByTitle(title: string) {
      for (const recipe of recipes.values()) {
        if (recipe.title.toLowerCase() === title.toLowerCase()) {
          return cloneRecipe(recipe);
        }
      }

      return undefined;
    },

    // eslint-disable-next-line @typescript-eslint/require-await
    async save(recipe: Recipe) {
      recipes.set(recipe.slug, cloneRecipe(recipe));
      return cloneRecipe(recipe);
    }
  } satisfies RecipeRepository;
}
