import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
} from '../actions/create-user';
import { TCreateUserInitialState } from '../../types/reducersTypes/createUserReducer';
import { TCreateUserActions } from '../../types/actionTypes/createUserAction';

const createUserInitialState: TCreateUserInitialState = {
  createUserFailed: false,
  createUserRequest: false,
  error: null,
};

export default (state = createUserInitialState, action: TCreateUserActions)
  : TCreateUserInitialState => {
  switch (action.type) {
    case CREATE_USER_REQUEST: {
      return {
        ...state,
        createUserRequest: true,
        error: null,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        createUserFailed: false,
        createUserRequest: false,
        error: null,
      };
    }
    case CREATE_USER_FAILED: {
      return {
        ...createUserInitialState,
        createUserFailed: true,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
