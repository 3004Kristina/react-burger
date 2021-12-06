import {getIngredients, postOrder} from '../../api/apiClient';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ACTIVATE_INGREDIENTS_DETAILS = 'ACTIVATE_INGREDIENTS_DETAILS';
export const RESET_INGREDIENTS_DETAILS = 'RESET_INGREDIENTS_DETAILS';

export const ADD_BASKET_INGREDIENT = 'ADD_BASKET_ITEM';
export const DELETE_BASKET_ITEM_BY_INDEX = 'DELETE_BASKET_ITEM_BY_INDEX';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const RESET_ORDER = 'RESET_ORDER';

export const BASKET_UPDATE_BY_SORT = 'BASKET_UPDATE_BY_SORT';

export function getIngredientsItems() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredients().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
                dispatch({
                    type: ADD_BASKET_INGREDIENT,
                    item: res.data.find(item => item.type === 'bun')
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        });
    };
}

export function postOrderItems(order_id_list) {
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        });
        postOrder(order_id_list).then(res => {
            if (res && res.success) {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    orderNumber: res.order.number
                });
            } else {
                dispatch({
                    type: POST_ORDER_FAILED
                });
            }
        });
    };
}