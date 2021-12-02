import {API_URL} from '../utils/consts';

function apiRequest(url, options) {
    return new Promise(function(resolve, reject) {
        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error('Что-то пошло не так'));
                }
            })
            .then(resolve)
            .catch(reject);
    });
}

export function postOrder(ingredients_list_id) {
    const ingredients_id = {
        'ingredients': ingredients_list_id
    };

    return apiRequest(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(ingredients_id),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
}

export function getIngredients() {
    return apiRequest(`${API_URL}/ingredients`);
}

