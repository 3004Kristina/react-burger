import {
  ACTIVATE_ORDER_INGREDIENTS_DETAILS,
  RESET_ORDER_INGREDIENTS_DETAILS
} from '../../services/actions/order-ingredients-detail-modal';


export interface IActivateOrderIngredientsDetail {
  readonly type: typeof ACTIVATE_ORDER_INGREDIENTS_DETAILS;
  readonly id: string;
}

export interface IResetOrderIngredientsDetail {
  readonly type: typeof RESET_ORDER_INGREDIENTS_DETAILS;
}

export type TOrderIngredientsDetail =
  | IActivateOrderIngredientsDetail
  | IResetOrderIngredientsDetail;
