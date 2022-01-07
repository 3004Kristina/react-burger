import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../actions/get-user-info';

const getInitialState = {
  getUserFailed: false,
  getUserRequest: false,
  user: null,
  userIsChecked: false,

  updateUserFailed: false,
  updateUserRequest: false,
  error: null,
};

export default (state = getInitialState, action = {}) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        error: null,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        getUserFailed: false,
        getUserRequest: false,
        userIsChecked: true,
        error: null,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...getInitialState,
        getUserFailed: true,
        userIsChecked: true,
        error: action.error,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        error: null,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...getInitialState,
        updateUserFailed: true,
        updateUserRequest: false,
        error: action.error,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};
