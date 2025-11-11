import { z } from 'zod';

export const recipeInputSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z.string().min(10, 'Description must be at least 10 characters long'),
    ingredients: z
      .array(z.string().min(1, 'Ingredient cannot be empty'))
      .min(1, 'Provide at least one ingredient'),
    instructions: z
      .array(z.string().min(1, 'Instruction cannot be empty'))
      .min(1, 'Provide at least one instruction')
  })
  .strict();

export type RecipeInputPayload = z.infer<typeof recipeInputSchema>;
