import {
    SET_NEW_PASSWORD_REQUEST,
    SET_NEW_PASSWORD_SUCCESS,
    SET_NEW_PASSWORD_FAILED
} from '../actions/set-new-password';

const updatePasswordInitialState = {
    updatePasswordFailed: false,
    updatePasswordRequest: false,
    updatePassword: false
};

export const updatePasswordReducer = (state = updatePasswordInitialState, action) => {
    switch (action.type) {
        case SET_NEW_PASSWORD_REQUEST: {
            return {
                ...state,
                updatePasswordRequest: true
            };
        }
        case SET_NEW_PASSWORD_SUCCESS: {
            return {...state, updatePasswordFailed: false, updatePasswordRequest: false, updatePassword: true};
        }
        case SET_NEW_PASSWORD_FAILED: {
            return {...state, updatePasswordFailed: true, updatePasswordRequest: false};
        }
        default: {
            return state;
        }
    }
};