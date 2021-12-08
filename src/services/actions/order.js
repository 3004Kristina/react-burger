import {postOrder} from '../../api/apiClient';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const RESET_ORDER_FAILED = 'RESET_ORDER_FAILED';
export const RESET_ORDER = 'RESET_ORDER';

export function postOrderItems(order_id_list) {
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        });
        postOrder(order_id_list)
            .then(res => {
                if (!res?.success) {
                    return Promise.reject();
                }
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    orderNumber: res.order.number
                });
            })
            .catch(() => {
                dispatch({
                    type: POST_ORDER_FAILED
                });
            });
    };
}