import { createServer } from 'node:http';

import { recipeSeeds } from './data/recipes';
import { ConflictError } from './lib/errors';
import { createInMemoryRecipeRepository } from './lib/recipes/in-memory-repository';
import { createRecipeHandlers } from './api/recipes/route';
import { createRecipeService } from './lib/recipes/service';

const repository = createInMemoryRecipeRepository();
const service = createRecipeService(repository);
const handlers = createRecipeHandlers(service);

async function seed() {
  for (const seedRecipe of recipeSeeds) {
    try {
      await service.createRecipe(seedRecipe);
    } catch (error) {
      if (!(error instanceof ConflictError)) {
        throw error;
      }
    }
  }
}

await seed();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(async (req, res) => {
  try {
    if (!req.url || !req.method) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid request' }));
      return;
    }

    if (req.method === 'GET' && req.url.startsWith('/recipes')) {
      const response = await handlers.GET(new Request(`http://localhost:3000${req.url}`));
      res.statusCode = response.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(await response.text());
      return;
    }

    if (req.method === 'POST' && req.url.startsWith('/recipes')) {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }

      const body = Buffer.concat(chunks).toString();
      const response = await handlers.POST(
        new Request(`http://localhost:3000${req.url}`, {
          method: 'POST',
          body,
          headers: { 'Content-Type': 'application/json' }
        })
      );
      res.statusCode = response.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(await response.text());
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => {
  console.log(`Recipe blueprint server running on http://localhost:${port}`);
});
