import {
  ACTIVATE_INGREDIENTS_DETAILS,
  RESET_INGREDIENTS_DETAILS,
} from '../actions/ingredients-detail-modal';
import {
  TIngredientsDetailInitialState,
} from '../../types/reducersTypes/ingredientsDetailModalReducer';
import { TIngredientsDetail } from '../../types/actionTypes/ingredientsDetailModalAction';

const ingredientsInitialState: TIngredientsDetailInitialState = {
  activeIngredientDetailId: null,
};

export default (state = ingredientsInitialState, action: TIngredientsDetail)
  : TIngredientsDetailInitialState => {
  switch (action.type) {
    case ACTIVATE_INGREDIENTS_DETAILS: {
      return { ...state, activeIngredientDetailId: action.id };
    }
    case RESET_INGREDIENTS_DETAILS: {
      return { ...state, activeIngredientDetailId: null };
    }
    default: {
      return state;
    }
  }
};
