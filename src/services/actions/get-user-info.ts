import { getUserData, refreshToken, updateUserData } from '../../api/apiClient';
import { setCookie } from '../../utils/cookie';
import { TApiRequestUpdateUserData } from '../../types/api';
import { AppDispatch } from '../../types';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';

export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

    return new Promise((resolve) => {
      getUserData()
        .then((getUserDataResponse) => {
          if (!getUserDataResponse?.success) {
            resolve(false);

            return;
          }

          dispatch({
            type: GET_USER_SUCCESS,
            user: getUserDataResponse.user,
          });

          resolve(true);
        })
        .catch((res) => {
          if (res?.message !== 'jwt expired') {
            dispatch({
              type: GET_USER_FAILED,
              error: res?.message,
            });

            resolve(false);

            return;
          }

          refreshToken()
            .then((refreshTokenResponse) => {
              if (!refreshTokenResponse?.success) {
                resolve(false);
                return;
              }

              setCookie('refreshToken', refreshTokenResponse.refreshToken);
              setCookie('accessToken', refreshTokenResponse.accessToken);

              getUserData()
                .then((getUserDataResponse) => {
                  dispatch({
                    type: GET_USER_SUCCESS,
                    user: getUserDataResponse.user,
                  });

                  resolve(true);
                })
                .catch((error) => {
                  dispatch({
                    type: GET_USER_FAILED,
                    error: error.message,
                  });

                  resolve(false);
                });
            })
            .catch((error) => {
              dispatch({
                type: GET_USER_FAILED,
                error: error.message,
              });

              resolve(false);
            });
        });
    });
  };
}

export function updateUser(data: TApiRequestUpdateUserData) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    return new Promise((resolve, reject) => {
      updateUserData(data)
        .then((res) => {
          if (!res?.success) {
            reject();
            return;
          }
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user,
          });

          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: UPDATE_USER_FAILED,
            error: error.message,
          });

          reject(error.message);
        });
    });
  };
}
