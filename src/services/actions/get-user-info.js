import { getUserData, refreshToken, updateUserData } from '../../api/apiClient';
import { setCookie } from '../../utils/cookie';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

    getUserData()
      .then((getUserDataResponse) => {
        if (!getUserDataResponse?.success) {
          throw getUserDataResponse.message;
        }

        dispatch({
          type: GET_USER_SUCCESS,
          user: getUserDataResponse.user,
        });
      })
      .catch((res) => {
        if (res?.message === 'jwt expired') {
          refreshToken()
            .then((refreshTokenResponse) => {
              if (!refreshTokenResponse?.success) {
                return Promise.reject();
              }
              setCookie('refreshToken', refreshTokenResponse.refreshToken);
              setCookie('accessToken', refreshTokenResponse.accessToken);

              return getUserData()
                .then(() => {
                  dispatch({
                    type: GET_USER_SUCCESS,
                    user: refreshTokenResponse.user,
                  });
                });
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error(error);

              dispatch({
                type: GET_USER_FAILED,
                error: error.message,
              });
            });

          return;
        }

        dispatch({
          type: GET_USER_FAILED,
          error: res?.message,
        });
      });
  };
}

export function updateUser(data) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserData(data)
      .then((res) => {
        if (!res?.success) {
          return Promise.reject();
        }
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user,
        });

        return Promise.resolve();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        dispatch({
          type: UPDATE_USER_FAILED,
          error: error.message,
        });
      });
  };
}
