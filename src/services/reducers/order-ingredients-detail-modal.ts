import {
  ACTIVATE_ORDER_INGREDIENTS_DETAILS,
  RESET_ORDER_INGREDIENTS_DETAILS,
} from '../actions/order-ingredients-detail-modal';
import { TOrderIngredientsDetail } from '../../types/actionTypes/orderIngredientsDetailModalAction';
import {
  TOrderIngredientsDetailInitialState,
} from '../../types/reducersTypes/orderIngredientsDetailModalReducer';

const orderIngredientsInitialState: TOrderIngredientsDetailInitialState = {
  activeOrderIngredientDetailId: null,
};

export default (state = orderIngredientsInitialState, action: TOrderIngredientsDetail)
  : TOrderIngredientsDetailInitialState => {
  switch (action.type) {
    case ACTIVATE_ORDER_INGREDIENTS_DETAILS: {
      return { ...state, activeOrderIngredientDetailId: action.id };
    }
    case RESET_ORDER_INGREDIENTS_DETAILS: {
      return { ...state, activeOrderIngredientDetailId: null };
    }
    default: {
      return state;
    }
  }
};
