import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET_INGREDIENTS_FAILED,
} from '../actions/ingredients';
import { TIngredientsInitialState } from '../../types/reducersTypes/ingredientReducer';
import { TIngredientsActions } from '../../types/actionTypes/ingredientsAction';

const ingredientsInitialState: TIngredientsInitialState = {
  ingredients: [],
  ingredientsFailed: false,
  ingredientsRequest: false,

  activeIngredientDetailId: null,

  error: null,
};

export default (state = ingredientsInitialState, action: TIngredientsActions)
  : TIngredientsInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        error: null,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        error: null,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...ingredientsInitialState,
        ingredientsFailed: true,
        error: action.error,
      };
    }
    case RESET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: false,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};
