import { updatePassword } from '../../api/apiClient';
import { TApiRequestUpdatePassword } from '../../types/api';
import { AppDispatch } from '../../types';

export const SET_NEW_PASSWORD_REQUEST: 'SET_NEW_PASSWORD_REQUEST' = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS: 'SET_NEW_PASSWORD_SUCCESS' = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED: 'SET_NEW_PASSWORD' = 'SET_NEW_PASSWORD';

export function setNewPassword(data: TApiRequestUpdatePassword) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_NEW_PASSWORD_REQUEST,
    });
    updatePassword(data)
      .then((res) => {
        if (!res?.success) {
          throw res.message;
        }
        dispatch({
          type: SET_NEW_PASSWORD_SUCCESS,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        dispatch({
          type: SET_NEW_PASSWORD_FAILED,
          error: error.message,
        });
      });
  };
}
