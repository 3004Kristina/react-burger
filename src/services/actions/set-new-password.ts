import { updatePassword } from '../../api/apiClient';
import { TApiRequestUpdatePassword } from '../../types/api';
import { AppDispatch } from '../../types';

export const SET_NEW_PASSWORD_REQUEST: 'SET_NEW_PASSWORD_REQUEST' = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS: 'SET_NEW_PASSWORD_SUCCESS' = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED: 'SET_NEW_PASSWORD' = 'SET_NEW_PASSWORD';

export function setNewPassword(data: TApiRequestUpdatePassword) {
  return function (dispatch: AppDispatch) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SET_NEW_PASSWORD_REQUEST,
      });

      updatePassword(data)
        .then((res) => {
          if (!res?.success) {
            reject(res.message);
            return;
          }
          dispatch({
            type: SET_NEW_PASSWORD_SUCCESS,
          });

          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: SET_NEW_PASSWORD_FAILED,
            error: error.message,
          });

          reject(error.message);
        });
    });
  };
}
