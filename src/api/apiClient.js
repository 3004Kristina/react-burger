import {API_URL} from '../utils/consts';
import {getCookie} from '../utils/cookie';

function internalApiRequest(url, options) {
    return new Promise(function(resolve, reject) {
        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return res.json()
                    .then(reject)
                    .catch(() => reject({
                        success: false,
                        message: 'Что-то пошло не так'
                    }));
            })
            .then(resolve)
            .catch(() => {
                reject({
                    success: false,
                    message: 'Что-то пошло не так'
                });
            });
    });
}

function apiRequest(url, options) {
    let accessToken = getCookie('accessToken');

    options.headers = options.headers || {};

    options.headers['Accept'] = 'application/json';

    if (['POST', 'PUT', 'PATCH'].includes(options.method)) {
        options.headers['Content-type'] = 'application/json; charset=UTF-8';
    }

    if (accessToken) {
        options.headers['Authorization'] = accessToken;
    }

    return internalApiRequest(url, options);
}

export function postOrder(ingredients_list_id) {
    const ingredients_id = {
        'ingredients': ingredients_list_id
    };

    return apiRequest(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(ingredients_id),
    });
}

export function getIngredients() {
    return internalApiRequest(`${API_URL}/ingredients`);
}

export function registrNewUser(data) {
    return apiRequest(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function login(data) {
    return apiRequest(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function passwordReset(data) {
    return apiRequest(`${API_URL}/password-reset`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function updatePassword(data) {
    return apiRequest(`${API_URL}/password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function getUserData() {
    return apiRequest(`${API_URL}/auth/user`, {
        method: 'GET',
    });
}

export function updateUserData(data) {
    return apiRequest(`${API_URL}/auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}

export function logout() {
    const token = getCookie('refreshToken');
    return apiRequest(`${API_URL}/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({token}),
    });
}

export function refreshToken() {
    return apiRequest(`${API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
    });
}



