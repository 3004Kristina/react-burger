import { registerNewUser } from '../../api/apiClient';
import { setCookie } from '../../utils/cookie';
import { TApiRequestRegisterNewUser } from '../../types/api';
import { AppDispatch } from '../../types';

export const CREATE_USER_REQUEST: 'CREATE_USER_REQUEST' = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS' = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED: 'CREATE_USER_FAILED' = 'CREATE_USER_FAILED';

export function registerUser(data: TApiRequestRegisterNewUser) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CREATE_USER_REQUEST,
    });

    return new Promise((resolve, reject) => {
      registerNewUser(data)
        .then((res) => {
          if (!res?.success) {
            reject();
            return;
          }
          dispatch({
            type: CREATE_USER_SUCCESS,
          });

          setCookie('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken);

          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: CREATE_USER_FAILED,
            error: error.message,
          });

          reject(error.message);
        });
    });
  };
}
