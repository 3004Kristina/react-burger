import {
  ACTIVATE_INGREDIENTS_DETAILS,
  RESET_INGREDIENTS_DETAILS,
} from '../actions/ingredients-detail-modal';

const ingredientsInitialState = {
  activeIngredientDetailId: null,
};

export default (state = ingredientsInitialState, action: any = {}) => {
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
