import { postOrder } from '../../api/apiClient';
import { AppDispatch } from '../../types';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';

export const RESET_ORDER_FAILED: 'RESET_ORDER_FAILED' = 'RESET_ORDER_FAILED';
export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';

export function postOrderItems(orderIdList: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });

    return new Promise((resolve, reject) => {
      postOrder(orderIdList)
        .then((res) => {
          if (!res?.success) {
            reject(res.message);
            return;
          }
          dispatch({
            type: POST_ORDER_SUCCESS,
            orderNumber: res.order.number,
          });

          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: POST_ORDER_FAILED,
            error: error.message,
          });

          reject(error.message);
        });
    });
  };
}
