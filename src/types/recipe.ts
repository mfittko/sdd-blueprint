export interface Recipe {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly ingredients: readonly string[];
  readonly instructions: readonly string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface RecipeInput {
  readonly title: string;
  readonly description: string;
  readonly ingredients: readonly string[];
  readonly instructions: readonly string[];
}

export interface RecipeSearchFilters {
  readonly query?: string;
}
