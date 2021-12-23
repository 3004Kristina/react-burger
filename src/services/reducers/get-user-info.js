import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,

    LOGOUT_USER
} from '../actions/get-user-info';

const getInitialState = {
    getUserFailed: false,
    getUserRequest: false,
    user: null,
    userIsChecked: false,

    updateUserFailed: false,
    updateUserRequest: false,
};

export const getUserReducer = (state = getInitialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true
            };
        }
        case GET_USER_SUCCESS: {
            return {...state, user: action.user, getUserFailed: false, getUserRequest: false, userIsChecked: true};
        }
        case GET_USER_FAILED: {
            return {...state, getUserFailed: true, getUserRequest: false, userIsChecked: true};
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {...state, user: action.user, updateUserFailed: false, updateUserRequest: false};
        }
        case UPDATE_USER_FAILED: {
            return {...state, updateUserFailed: true, updateUserRequest: false};
        }
        case LOGOUT_USER: {
            return {...state, user: null}
        }
        default: {
            return state;
        }
    }
};