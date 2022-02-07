import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
} from '../actions/password-reset';
import { TResetPasswordInitialState } from '../../types/reducersTypes/passwordResetReducer';
import { TPasswordReset } from '../../types/actionTypes/passwordResetAction';

const resetPasswordInitialState: TResetPasswordInitialState = {
  resetPasswordFailed: false,
  resetPasswordRequest: false,
  resetPassword: false,
  error: null,
};

export default (state = resetPasswordInitialState, action: TPasswordReset)
  : TResetPasswordInitialState => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        error: null,
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPassword: true,
        error: null,
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...resetPasswordInitialState,
        resetPasswordFailed: true,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
