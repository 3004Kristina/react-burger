import {
  ACTIVATE_INGREDIENTS_DETAILS,
  RESET_INGREDIENTS_DETAILS,
} from '../../services/actions/ingredients-detail-modal';

export interface IActivateIngredientsDetail {
  readonly type: typeof ACTIVATE_INGREDIENTS_DETAILS;
  readonly id: number;
}

export interface IResetIngredientsDetail {
  readonly type: typeof RESET_INGREDIENTS_DETAILS;
}

export type TIngredientsDetail =
  | IActivateIngredientsDetail
  | IResetIngredientsDetail;
