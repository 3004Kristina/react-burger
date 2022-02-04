import {
  ADD_BASKET_INGREDIENT,
  DELETE_BASKET_ITEM_BY_INDEX,
  BASKET_UPDATE_BY_SORT,
  RESET_BASKET,
} from '../../services/actions/constructor';
import IIngredientItem from '../../types/IngredientsItem';

export interface IAddBasketIngredient {
  readonly type: typeof ADD_BASKET_INGREDIENT;
  readonly item: IIngredientItem & {id: string};
}
export interface IDeleteBasketIngredient {
  readonly type: typeof DELETE_BASKET_ITEM_BY_INDEX;
  readonly index: number;
}

export interface IUpdateBasketIngredient {
  readonly type: typeof BASKET_UPDATE_BY_SORT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IResetBasketIngredient {
  readonly type: typeof RESET_BASKET;
}

export type TConstructorActions =
  | IAddBasketIngredient
  | IDeleteBasketIngredient
  | IUpdateBasketIngredient
  | IResetBasketIngredient;
