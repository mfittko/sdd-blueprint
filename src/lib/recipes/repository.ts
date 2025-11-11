import type { Recipe } from '../../types/recipe';

/**
 * Contract implemented by every persistence adapter used by the recipe service.
 *
 * The interface intentionally mirrors what a future database-backed repository would expose
 * so the in-memory teaching adapter and production adapters can be swapped without touching
 * service or transport code.
 */
export interface RecipeRepository {
  list(): Promise<Recipe[]>;
  findBySlug(slug: string): Promise<Recipe | undefined>;
  findByTitle(title: string): Promise<Recipe | undefined>;
  save(recipe: Recipe): Promise<Recipe>;
}

/**
 * Defensive copy helper so repositories never leak mutable references across layers.
 */
export function cloneRecipe(recipe: Recipe): Recipe {
  return {
    ...recipe,
    ingredients: [...recipe.ingredients],
    instructions: [...recipe.instructions],
    createdAt: new Date(recipe.createdAt),
    updatedAt: new Date(recipe.updatedAt)
  };
}
