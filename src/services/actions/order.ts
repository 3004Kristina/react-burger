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
    postOrder(orderIdList)
      .then((res) => {
        if (!res?.success) {
          throw res.message;
        }
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderNumber: res.order.number,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        dispatch({
          type: POST_ORDER_FAILED,
          error: error.message,
        });
      });
  };
}
