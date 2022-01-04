import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  RESET_ORDER_FAILED,

  RESET_ORDER,
} from '../actions/order';

const orderInitialState = {
  orderNumber: null,
  postOrderFailed: false,
  postOrderRequest: false,
  error: null,
};

export default (state = orderInitialState, action = {}) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        postOrderRequest: true,
        error: null,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        postOrderFailed: false,
        orderNumber: action.orderNumber,
        postOrderRequest: false,
        error: null,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...orderInitialState,
        orderNumber: null,
        postOrderFailed: true,
        postOrderRequest: false,
        error: action.error,
      };
    }
    case RESET_ORDER_FAILED: {
      return {
        ...state,
        postOrderFailed: false,
        error: null,
      };
    }
    case RESET_ORDER: {
      return {
        ...state,
        orderNumber: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};
