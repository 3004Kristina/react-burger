import IIngredientItem from '../IngredientsItem';

export type TIngredientsInitialState = {
  ingredients: Array<IIngredientItem>,
  ingredientsFailed: boolean,
  ingredientsRequest: boolean,

  activeIngredientDetailId: number | null,

  error: string | null,
}
