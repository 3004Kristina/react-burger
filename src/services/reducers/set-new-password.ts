import {
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED,
} from '../actions/set-new-password';
import { TUpdatePasswordInitialState } from '../../types/reducersTypes/setNewPasswordReducer';
import { TSetNewPasswordActions } from '../../types/actionTypes/setNewPasswordAction';

const updatePasswordInitialState: TUpdatePasswordInitialState = {
  updatePasswordFailed: false,
  updatePasswordRequest: false,
  updatePassword: false,
  error: null,
};

export default (state = updatePasswordInitialState, action: TSetNewPasswordActions)
  : TUpdatePasswordInitialState => {
  switch (action.type) {
    case SET_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        updatePasswordRequest: true,
        error: null,
      };
    }
    case SET_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        updatePasswordFailed: false,
        updatePasswordRequest: false,
        updatePassword: true,
        error: null,
      };
    }
    case SET_NEW_PASSWORD_FAILED: {
      return {
        ...updatePasswordInitialState,
        updatePasswordFailed: true,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
