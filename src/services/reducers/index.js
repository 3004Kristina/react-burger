import {combineReducers} from 'redux';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    ACTIVATE_INGREDIENTS_DETAILS,
    RESET_INGREDIENTS_DETAILS,

    ADD_BASKET_INGREDIENT,
    DELETE_BASKET_ITEM_BY_INDEX,

    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,

    RESET_ORDER,

    BASKET_UPDATE_BY_SORT
} from '../actions';


const ingredientsInitialState = {
    ingredients: [],
    ingredientsFailed: false,
    ingredientsRequest: false,

    activeIngredientDetailId: null,

    ingredientCounter: 0
};

const constructorInitialState = {
    basket: [],

    orderNumber: null,
    postOrderFailed: false,
    postOrderRequest: false,
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
            return {...state, ingredientsFailed: true, ingredientsRequest: false};
        }
        case ACTIVATE_INGREDIENTS_DETAILS: {
            return {...state, activeIngredientDetailId: action.id};
        }
        case RESET_INGREDIENTS_DETAILS: {
            return {...state, activeIngredientDetailId: null};
        }
        default: {
            return state;
        }
    }
};

export const constructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case ADD_BASKET_INGREDIENT: {
            let basket = [...state.basket];
            if(action.item.type === 'bun'){
                basket = basket.filter(item => item.type !== 'bun')
            }
            basket.push(action.item);

            return {...state, basket}
        }
        case DELETE_BASKET_ITEM_BY_INDEX: {
            const basket = [...state.basket];
            basket.splice(action.index,1);

            return {...state, basket}
        }
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                postOrderRequest: true
            };
        }
        case POST_ORDER_SUCCESS: {
            return {...state, postOrderFailed: false, orderNumber: action.orderNumber, postOrderRequest: false};
        }
        case POST_ORDER_FAILED: {
            return {...state, postOrderFailed: true, postOrderRequest: false};
        }
        case RESET_ORDER: {
            return {...state, basket: [...state.basket].filter(item => item.type === 'bun'), orderNumber: null}
        }
        case BASKET_UPDATE_BY_SORT: {
            let basket = [...state.basket];
            let sortableElements = basket.splice(action.dragIndex, 1);
            basket.splice(action.hoverIndex, 0, ...sortableElements);

            return {...state, basket}
        }
        default: {
            return state;
        }
    }

};


export const rootReducer = combineReducers({
    ingredientsData: ingredientsReducer,
    constructorData: constructorReducer
});