import { login } from '../../api/apiClient';
import { setCookie } from '../../utils/cookie';
import { GET_USER_SUCCESS } from './get-user-info';
import { TApiRequestLogin } from '../../types/api';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export function loginUser(data: TApiRequestLogin) {
  return function (dispatch: any) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    login(data)
      .then((res) => {
        if (!res?.success) {
          throw res.message;
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
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        dispatch({
          type: LOGIN_USER_FAILED,
          error: error.message,
        });
      });
  };
}
