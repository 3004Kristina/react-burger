import { passwordReset } from '../../api/apiClient';
import { TApiRequestPasswordReset } from '../../types/api';
import { AppDispatch } from '../../types';

export const PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST' = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS' = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED' = 'PASSWORD_RESET_FAILED';

export function passwordResetEmailCheck(data: TApiRequestPasswordReset) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });

    return new Promise((resolve, reject) => {
      passwordReset(data)
        .then((res) => {
          if (!res?.success) {
            reject(res.message);
            return;
          }
          dispatch({
            type: PASSWORD_RESET_SUCCESS,
          });

          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: PASSWORD_RESET_FAILED,
            error: error.message,
          });

          reject(error.message);
        });
    });
  };
}
