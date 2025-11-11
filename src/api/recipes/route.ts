import { recipeSeeds } from '../../data/recipes';
import { ConflictError, NotFoundError, ValidationError } from '../../lib/errors';
import { createInMemoryRecipeRepository } from '../../lib/recipes/in-memory-repository';
import { createRecipeService, type RecipeService } from '../../lib/recipes/service';
import type { RecipeInput } from '../../types/recipe';

const defaultService = createRecipeService(createInMemoryRecipeRepository());

void (async () => {
  for (const seed of recipeSeeds) {
    try {
      await defaultService.createRecipe(seed);
    } catch (error) {
      if (!(error instanceof ConflictError)) {
        throw error;
      }
    }
  }
})();

export interface RecipeRouteHandlers {
  GET(request: Request): Promise<Response>;
  POST(request: Request): Promise<Response>;
}

export function createRecipeHandlers(service: RecipeService): RecipeRouteHandlers {
  return {
    async GET(request) {
      const { searchParams } = new URL(request.url);
      const query = searchParams.get('query') ?? undefined;
      const slug = searchParams.get('slug') ?? undefined;

      try {
        if (slug) {
          const recipe = await service.getRecipe(slug);
          return Response.json(recipe, { status: 200 });
        }

        const recipes = await service.listRecipes({ query });
        return Response.json({ recipes }, { status: 200 });
      } catch (error) {
        if (error instanceof NotFoundError) {
          return Response.json({ error: error.message }, { status: 404 });
        }

        throw error;
      }
    },

    async POST(request) {
      let payload: RecipeInput;

      try {
        payload = (await request.json()) as RecipeInput;
      } catch {
        return Response.json({ error: 'Request body must be valid JSON' }, { status: 400 });
      }

      try {
        const recipe = await service.createRecipe(payload);
        return Response.json(recipe, { status: 201 });
      } catch (error) {
        if (error instanceof ValidationError) {
          return Response.json(
            { error: error.message, details: error.details },
            { status: 400 }
          );
        }

        if (error instanceof ConflictError) {
          return Response.json({ error: error.message }, { status: 409 });
        }

        throw error;
      }
    }
  } satisfies RecipeRouteHandlers;
}

// eslint-disable-next-line @typescript-eslint/unbound-method
export const { GET, POST } = createRecipeHandlers(defaultService);
