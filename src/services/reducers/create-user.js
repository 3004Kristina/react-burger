import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED
} from '../actions/create-user';

const createUserInitialState = {
    createUserFailed: false,
    createUserRequest: false
};

export const createUserReducer = (state = createUserInitialState, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST: {
            return {
                ...state,
                createUserRequest: true
            };
        }
        case CREATE_USER_SUCCESS: {
            return {...state, createUserFailed: false, createUserRequest: false};
        }
        case CREATE_USER_FAILED: {
            return {...state, createUserFailed: true, createUserRequest: false};
        }
        default: {
            return state;
        }
    }
};