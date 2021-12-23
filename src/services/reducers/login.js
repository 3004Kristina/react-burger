import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
} from '../actions/login';

const loginInitialState = {
    loginUserFailed: false,
    loginUserRequest: false,
    auth: false
};

export const loginUserReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginUserRequest: true
            };
        }
        case LOGIN_USER_SUCCESS: {
            return {...state, auth: true, loginUserFailed: false, loginUserRequest: false};
        }
        case LOGIN_USER_FAILED: {
            return {...state, loginUserFailed: true, loginUserRequest: false};
        }
        default: {
            return state;
        }
    }
};