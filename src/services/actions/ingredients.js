import { getIngredients } from '../../api/apiClient';
import { ADD_BASKET_INGREDIENT } from './constructor';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const RESET_INGREDIENTS_FAILED = 'RESET_INGREDIENTS_FAILED';

export function getIngredientsItems() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((res) => {
        if (!res?.success) {
          throw res.message;
        }
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
        dispatch({
          type: ADD_BASKET_INGREDIENT,
          item: res.data.find((item) => item.type === 'bun'),
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: error.message,
        });
      });
  };
}
