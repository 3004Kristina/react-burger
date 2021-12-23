import {
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED
} from '../actions/password-reset';

const emailCheckInitialState = {
    emailCheckFailed: false,
    emailCheckRequest: false,
    emailChecked: false
};

export const emailCheckReducer = (state = emailCheckInitialState, action) => {
    switch (action.type) {
        case PASSWORD_RESET_REQUEST: {
            return {
                ...state,
                emailCheckRequest: true
            };
        }
        case PASSWORD_RESET_SUCCESS: {
            return {...state, emailCheckFailed: false, emailCheckRequest: false, emailChecked: true};
        }
        case PASSWORD_RESET_FAILED: {
            return {...state, emailCheckFailed: true, emailCheckRequest: false};
        }
        default: {
            return state;
        }
    }
};