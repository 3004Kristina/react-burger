import { API_URL } from '../utils/consts';
import { getCookie } from '../utils/cookie';

function internalApiRequest(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((fetchResponse) => {
        if (fetchResponse.ok) {
          return fetchResponse.json();
        }

        return fetchResponse.json()
          .then((jsonResponse) => {
            // В данном случае обрабытываются ошибки,
            // полученные с бэка при не 2хх коде ответа сервера
            // и при успешно разобранном JSON-ответе

            reject(new Error(jsonResponse?.message || 'Что-то пошло не так'));
          })
          .catch(() => {
            // В данном случае обрабытываются ошибки,
            // полученные с бэка при не 2хх коде ответа сервера
            // и при неуспешно разобранном JSON-ответе

            reject(new Error('Что-то пошло не так'));
          });
      })
      .then(resolve)
      .catch(() => {
        // В данном случае обрабытываются очень грубые ошибки,
        // например отсутсвие интернета или DNS резолвинга
        // в случае таких ошибок у нас нет никакого JSON-ответа,
        // поэтому возвращаем "Что-то пошло не так"

        reject(new Error('Что-то пошло не так'));
      });
  });
}

function apiRequest(url, options) {
  const accessToken = getCookie('accessToken');
  const optionsWithHeaders = { ...options, headers: options.headers || {} };

  optionsWithHeaders.headers = options.headers || {};

  optionsWithHeaders.headers.Accept = 'application/json';

  if (['POST', 'PUT', 'PATCH'].includes(optionsWithHeaders.method)) {
    optionsWithHeaders.headers['Content-type'] = 'application/json; charset=UTF-8';
  }

  if (accessToken) {
    optionsWithHeaders.headers.Authorization = accessToken;
  }

  return internalApiRequest(url, optionsWithHeaders);
}

export function postOrder(ingredientsListId) {
  const ingredientsId = {
    ingredients: ingredientsListId,
  };

  return apiRequest(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(ingredientsId),
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
    body: JSON.stringify({ token }),
  });
}

export function refreshToken() {
  return apiRequest(`${API_URL}/auth/token`, {
    method: 'POST',
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  });
}
