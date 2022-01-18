import { passwordReset } from '../../api/apiClient';
import { TApiRequestPasswordReset } from '../../types/api';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';

export function passwordResetEmailCheck(data: TApiRequestPasswordReset) {
  return function (dispatch: any) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    passwordReset(data)
      .then((res) => {
        if (!res?.success) {
          throw res.message;
        }
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        dispatch({
          type: PASSWORD_RESET_FAILED,
          error: error.message,
        });
      });
  };
}
