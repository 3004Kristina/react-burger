import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    RESET_INGREDIENTS_FAILED,
} from '../actions/ingredients';

const ingredientsInitialState = {
    ingredients: [],
    ingredientsFailed: false,
    ingredientsRequest: false,

    activeIngredientDetailId: null,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false};
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredients: [], ingredientsFailed: true, ingredientsRequest: false};
        }
        case RESET_INGREDIENTS_FAILED: {
            return {...state, ingredientsFailed: false};
        }
        default: {
            return state;
        }
    }
};