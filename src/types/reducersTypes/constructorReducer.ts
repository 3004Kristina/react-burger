import IIngredientItem from '../IngredientsItem';

export type TConstructorInitialState = {
  basket: Array<IIngredientItem & { id: string }>;
};
