import {updatePassword} from '../../api/apiClient';

export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED = 'SET_NEW_PASSWORD';


export function setNewPassword(data) {
    return function(dispatch) {
        dispatch({
            type: SET_NEW_PASSWORD_REQUEST
        });
        updatePassword(data)
            .then(res => {
                if (!res?.success) {
                    return Promise.reject();
                }
                dispatch({
                    type: SET_NEW_PASSWORD_SUCCESS,
                });
            })
            .catch(() => {
                dispatch({
                    type: SET_NEW_PASSWORD_FAILED
                });
            });
    };
}