import { login } from '../../api/apiClient';
import { setCookie } from '../../utils/cookie';
import { GET_USER_SUCCESS } from './get-user-info';
import { TApiRequestLogin } from '../../types/api';
import { AppDispatch } from '../../types';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export function loginUser(data: TApiRequestLogin) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    return new Promise((resolve, reject) => {
      login(data)
        .then((res) => {
          if (!res?.success) {
            reject(res.message);
            return;
          }
          dispatch({
            type: LOGIN_USER_SUCCESS,
          });
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          });

          setCookie('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken);

          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: LOGIN_USER_FAILED,
            error: error.message,
          });

          reject(error.message);
        });
    });
  };
}
