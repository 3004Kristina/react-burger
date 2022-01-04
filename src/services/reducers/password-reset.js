import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
} from '../actions/password-reset';

const emailCheckInitialState = {
  emailCheckFailed: false,
  emailCheckRequest: false,
  emailChecked: false,
  error: null,
};

export default (state = emailCheckInitialState, action = {}) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        emailCheckRequest: true,
        error: null,
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        emailCheckFailed: false,
        emailCheckRequest: false,
        emailChecked: true,
        error: null,
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...emailCheckInitialState,
        emailCheckFailed: true,
        emailCheckRequest: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
