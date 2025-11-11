import { expect, test } from '@playwright/test';

import { recipeSeeds } from '../../src/data/recipes';
import { createInMemoryRecipeRepository } from '../../src/lib/recipes/in-memory-repository';
import { createRecipeService } from '../../src/lib/recipes/service';

const repository = createInMemoryRecipeRepository();
const service = createRecipeService(repository);

for (const seed of recipeSeeds) {
  await service.createRecipe(seed);
}

test('user browses existing recipes', async ({ page }) => {
  const recipes = await service.listRecipes();

  await page.setContent(`
    <main>
      <h1>Blueprint Recipes</h1>
      <ul>
        ${recipes.map((recipe) => `<li>${recipe.title}</li>`).join('')}
      </ul>
    </main>
  `);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Blueprint Recipes');
  for (const recipe of recipes) {
    await expect(page.getByRole('listitem', { name: recipe.title })).toBeVisible();
  }
});

test('user submits a recipe via exposed service binding', async ({ page }) => {
  await page.exposeBinding('createRecipe', async (_source, payload: Parameters<typeof service.createRecipe>[0]) => {
    return service.createRecipe(payload);
  });

  await page.setContent(`
    <form id="recipe-form">
      <label>
        Title
        <input name="title" required />
      </label>
      <label>
        Description
        <textarea name="description" required></textarea>
      </label>
      <label>
        Ingredients
        <textarea name="ingredients" required></textarea>
      </label>
      <label>
        Instructions
        <textarea name="instructions" required></textarea>
      </label>
      <button type="submit">Create</button>
    </form>
    <output id="result"></output>
    <script>
      const form = document.getElementById('recipe-form');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const payload = {
          title: data.get('title'),
          description: data.get('description'),
          ingredients: String(data.get('ingredients')).split('\n'),
          instructions: String(data.get('instructions')).split('\n'),
        };
        const recipe = await window.createRecipe(payload);
        document.getElementById('result').textContent = recipe.slug;
      });
    </script>
  `);

  await page.fill('input[name="title"]', 'Herb Quark Dip');
  await page.fill('textarea[name="description"]', 'Creamy quark dip with garden herbs.');
  await page.fill('textarea[name="ingredients"]', 'Quark\nChives\nParsley');
  await page.fill('textarea[name="instructions"]', 'Mix everything\nServe chilled');
  await page.click('button[type="submit"]');

  await expect(page.locator('#result')).toHaveText('herb-quark-dip');
});
