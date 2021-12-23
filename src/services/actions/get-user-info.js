import {getUserData, refreshToken, updateUserData} from '../../api/apiClient';
import {setCookie} from '../../utils/cookie';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';

export function getUser() {
    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });

        getUserData()
            .then(res => {
                if (!res?.success) {
                    return Promise.reject();
                }
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: res.user
                });
            })
            .catch((res) => {
                if(res?.message === 'jwt expired'){
                    return refreshToken()
                        .then((res) => {
                            if (!res?.success) {
                                return Promise.reject();
                            }
                            setCookie('refreshToken', res.refreshToken);
                            setCookie('accessToken', res.accessToken);

                            getUserData()
                                .then(res => {
                                    dispatch({
                                        type: GET_USER_SUCCESS,
                                        user: res.user
                                    });
                                })
                        })
                        .catch(() => {
                            dispatch({
                                type: GET_USER_FAILED
                            });
                        })
                }
                dispatch({
                    type: GET_USER_FAILED
                });
            });
    };
}

export function updateUser(data) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        updateUserData(data)
            .then(res => {
                if (!res?.success) {
                    return Promise.reject();
                }
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: res.user
                });
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_USER_FAILED
                });
            });
    };
}