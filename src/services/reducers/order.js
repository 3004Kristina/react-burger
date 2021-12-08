import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    RESET_ORDER_FAILED,

    RESET_ORDER
} from '../actions/order';



const orderInitialState = {
    orderNumber: null,
    postOrderFailed: false,
    postOrderRequest: false,
};

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
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
            return {...state, orderNumber: null, postOrderFailed: true, postOrderRequest: false};
        }
        case RESET_ORDER_FAILED: {
            return {...state, postOrderFailed: false};
        }
        case RESET_ORDER: {
            return {...state, orderNumber: null}
        }
        default: {
            return state;
        }
    }
};