import { describe, expect, it } from 'vitest';

import { recipeSeeds } from '../../src/data/recipes';
import { createRecipeHandlers } from '../../src/api/recipes/route';
import { createInMemoryRecipeRepository } from '../../src/lib/recipes/in-memory-repository';
import { createRecipeService } from '../../src/lib/recipes/service';

const createHandlers = async () => {
  const repository = createInMemoryRecipeRepository();
  const service = createRecipeService(repository);

  for (const seed of recipeSeeds) {
    await service.createRecipe(seed);
  }

  return createRecipeHandlers(service);
};

describe('recipes route', () => {
  it('returns all recipes on GET', async () => {
    const handlers = await createHandlers();

    const response = await handlers.GET(new Request('http://example.com/api/recipes'));
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload.recipes)).toBe(true);
    expect(payload.recipes).toHaveLength(3);
  });

  it('returns a specific recipe when slug is provided', async () => {
    const handlers = await createHandlers();

    const response = await handlers.GET(new Request('http://example.com/api/recipes?slug=garlic-butter-spaetzle'));
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(payload.title).toBe('Garlic Butter Spaetzle');
  });

  it('creates a recipe on POST', async () => {
    const handlers = await createHandlers();

    const response = await handlers.POST(
      new Request('http://example.com/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Quark Käsekuchen',
          description: 'Light German-style cheesecake made with quark.',
          ingredients: ['Quark', 'Eggs', 'Butter', 'Sugar'],
          instructions: ['Mix ingredients', 'Bake until set']
        })
      })
    );

    expect(response.status).toBe(201);
    const recipe = await response.json();
    expect(recipe.slug).toBe('quark-kasekuchen');
  });

  it('returns validation errors for malformed payloads', async () => {
    const handlers = await createHandlers();

    const response = await handlers.POST(
      new Request('http://example.com/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
    );

    expect(response.status).toBe(400);
    const error = await response.json();
    expect(error).toHaveProperty('details');
  });
});
