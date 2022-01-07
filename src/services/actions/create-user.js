import { registrNewUser } from '../../api/apiClient';
import { setCookie } from '../../utils/cookie';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export function registerUser(data) {
  return function (dispatch) {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    registrNewUser(data)
      .then((res) => {
        if (!res?.success) {
          return Promise.reject();
        }
        dispatch({
          type: CREATE_USER_SUCCESS,
        });

        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);

        return Promise.resolve();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        dispatch({
          type: CREATE_USER_FAILED,
          error: error.message,
        });
      });
  };
}
