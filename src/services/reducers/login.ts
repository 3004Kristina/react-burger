import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../actions/login';
import { TLoginInitialState } from '../../types/reducersTypes/loginReducer';
import { TLoginUser } from '../../types/actionTypes/loginAction';

const loginInitialState: TLoginInitialState = {
  loginUserFailed: false,
  loginUserRequest: false,
  auth: false,
  error: null,
};

export default (state = loginInitialState, action: TLoginUser)
  : TLoginInitialState => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
        error: null,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        auth: true,
        loginUserFailed: false,
        loginUserRequest: false,
        error: null,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...loginInitialState,
        loginUserFailed: true,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
