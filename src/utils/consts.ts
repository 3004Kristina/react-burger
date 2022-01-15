import { TIngredientGroup } from '../types/IngredientGroup';

export const API_URL: string = 'https://norma.nomoreparties.space/api';

export const INGREDIENT_GROUPS: ReadonlyArray<TIngredientGroup> = [
  {
    type: 'bun',
    label: 'Булки',
  },
  {
    type: 'sauce',
    label: 'Соусы',
  },
  {
    type: 'main',
    label: 'Начинки',
  },
];
