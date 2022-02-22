import { getIngredients } from '../../api/apiClient';
import { AppDispatch } from '../../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const RESET_INGREDIENTS_FAILED: 'RESET_INGREDIENTS_FAILED' = 'RESET_INGREDIENTS_FAILED';

export function getIngredientsItems() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    return new Promise((resolve, reject) => {
      getIngredients()
        .then((res) => {
          if (!res?.success) {
            reject(res.message);
            return;
          }
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });

          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
            error: error.message,
          });

          reject(error.message);
        });
    });
  };
}
