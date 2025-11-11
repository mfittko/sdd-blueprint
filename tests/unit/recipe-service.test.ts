import { beforeEach, describe, expect, it } from 'vitest';

import { recipeSeeds } from '../../src/data/recipes';
import { ConflictError, ValidationError } from '../../src/lib/errors';
import { createInMemoryRecipeRepository } from '../../src/lib/recipes/in-memory-repository';
import { createRecipeService, type RecipeService } from '../../src/lib/recipes/service';

let service: RecipeService;

beforeEach(async () => {
  const repository = createInMemoryRecipeRepository();
  service = createRecipeService(repository);

  for (const seed of recipeSeeds) {
    await service.createRecipe(seed);
  }
});

describe('RecipeService', () => {
  it('lists recipes sorted by title', async () => {
    const recipes = await service.listRecipes();
    const titles = recipes.map((recipe) => recipe.title);

    expect(titles).toEqual([
      'Apple Cinnamon Kaiserschmarrn',
      'Black Forest Pancakes',
      'Garlic Butter Spaetzle'
    ]);
  });

  it('filters recipes by query term', async () => {
    const recipes = await service.listRecipes({ query: 'spaetzle' });

    expect(recipes).toHaveLength(1);
    expect(recipes[0].title).toBe('Garlic Butter Spaetzle');
  });

  it('creates a recipe with generated slug', async () => {
    const recipe = await service.createRecipe({
      title: 'Lemon Ricotta Pancakes',
      description: 'Tangy pancakes with whipped ricotta.',
      ingredients: ['Ricotta', 'Lemon zest', 'Eggs', 'Flour'],
      instructions: ['Mix batter', 'Cook on skillet']
    });

    expect(recipe.slug).toBe('lemon-ricotta-pancakes');
  });

  it('throws ValidationError for invalid payload', async () => {
    await expect(
      service.createRecipe({
        title: 'Hi',
        description: 'Too short',
        ingredients: [],
        instructions: []
      })
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('prevents duplicate titles', async () => {
    await expect(
      service.createRecipe({
        title: 'Garlic Butter Spaetzle',
        description: 'Duplicate entry',
        ingredients: ['Flour'],
        instructions: ['Cook it']
      })
    ).rejects.toBeInstanceOf(ConflictError);
  });
});
