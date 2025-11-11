import type { RecipeInput } from '../types/recipe';

export const recipeSeeds: ReadonlyArray<RecipeInput> = [
  {
    title: 'Garlic Butter Spaetzle',
    description: 'Classic Swabian spaetzle tossed with browned butter and fresh chives.',
    ingredients: [
      '2 cups all-purpose flour',
      '3 eggs',
      '1/2 cup milk',
      '2 tablespoons butter',
      '2 cloves garlic, minced',
      'Fresh chives, finely chopped'
    ],
    instructions: [
      'Whisk together flour, eggs, and milk until a smooth batter forms.',
      'Press batter through a spaetzle maker into simmering salted water.',
      'Cook until the dumplings float, then transfer to an ice bath to stop cooking.',
      'Brown butter with garlic in a skillet, then toss spaetzle until lightly crisp.',
      'Finish with chopped chives before serving.'
    ]
  },
  {
    title: 'Black Forest Pancakes',
    description: 'Fluffy cocoa pancakes layered with cherry compote and whipped cream.',
    ingredients: [
      '1 1/2 cups flour',
      '3 tablespoons cocoa powder',
      '2 tablespoons sugar',
      '1 cup buttermilk',
      '1 egg',
      'Cherry compote',
      'Whipped cream'
    ],
    instructions: [
      'Combine dry ingredients in a bowl and whisk to remove lumps.',
      'Fold in buttermilk and egg until just combined.',
      'Cook pancakes on a buttered skillet until bubbles form and flip once.',
      'Layer pancakes with cherry compote and a dollop of whipped cream.'
    ]
  },
  {
    title: 'Apple Cinnamon Kaiserschmarrn',
    description: 'Shredded Austrian pancake with caramelised apples and raisins.',
    ingredients: [
      '4 eggs, separated',
      '1 cup milk',
      '1 cup flour',
      '2 apples, thinly sliced',
      '1/4 cup raisins',
      '2 tablespoons sugar',
      '1 teaspoon cinnamon'
    ],
    instructions: [
      'Whisk yolks with milk and flour until smooth.',
      'Beat egg whites with sugar to stiff peaks and fold into batter.',
      'Caramelise apples, raisins, and cinnamon in butter.',
      'Pour batter over fruit, bake until set, and tear into pieces before serving.'
    ]
  }
];
