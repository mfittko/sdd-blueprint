import { randomUUID } from 'node:crypto';

import type { Recipe, RecipeInput, RecipeSearchFilters } from '../../types/recipe';
import { ConflictError, NotFoundError, ValidationError } from '../errors';
import { createSlug } from '../slug';
import { recipeInputSchema } from './schema';
import type { RecipeRepository } from './repository';

export interface RecipeService {
  listRecipes(filters?: RecipeSearchFilters): Promise<Recipe[]>;
  getRecipe(slug: string): Promise<Recipe>;
  createRecipe(input: RecipeInput): Promise<Recipe>;
}

export function createRecipeService(repository: RecipeRepository): RecipeService {
  return {
    async listRecipes(filters) {
      const recipes = await repository.list();

      if (!filters?.query) {
        return recipes;
      }

      const query = filters.query.toLowerCase();
      return recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query))
      );
    },

    async getRecipe(slug: string) {
      const match = await repository.findBySlug(slug);
      if (!match) {
        throw new NotFoundError(`Recipe with slug "${slug}" was not found.`);
      }

      return match;
    },

    async createRecipe(input: RecipeInput) {
      const parseResult = recipeInputSchema.safeParse({
        ...input,
        ingredients: input.ingredients?.map((ingredient) => ingredient.trim()).filter(Boolean) || [],
        instructions: input.instructions?.map((instruction) => instruction.trim()).filter(Boolean) || []
      });

      if (!parseResult.success) {
        const issues = parseResult.error.issues.map((issue) => issue.message);
        throw new ValidationError('Recipe input is invalid', issues);
      }

      const payload = parseResult.data;
      const slug = createSlug(payload.title);

      const [existingSlug, existingTitle] = await Promise.all([
        repository.findBySlug(slug),
        repository.findByTitle(payload.title)
      ]);

      if (existingSlug || existingTitle) {
        throw new ConflictError(`A recipe titled "${payload.title}" already exists.`);
      }

      const timestamp = new Date();
      const recipe: Recipe = {
        id: randomUUID(),
        slug,
        title: payload.title,
        description: payload.description,
        ingredients: payload.ingredients,
        instructions: payload.instructions,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      return repository.save(recipe);
    }
  } satisfies RecipeService;
}
