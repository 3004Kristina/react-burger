import { RequestInfo, RequestInit } from 'ts-libs/lib/dom';
import { API_URL } from '../utils/consts';
import { getCookie } from '../utils/cookie';
import {
  TApiRequestLogin,
  TApiRequestPasswordReset,
  TApiRequestRegisterNewUser,
  TApiRequestUpdatePassword,
  TApiRequestUpdateUserData,
  TApiResponseGetUserData,
  TApiResponseIngredients,
  TApiResponseLogin, TApiResponseLogout,
  TApiResponsePasswordReset, TApiResponseRefreshToken,
  TApiResponseRegisterNewUser,
  TApiResponseUpdatePassword, TApiResponseUpdateUserData,
} from '../types/api';

function internalApiRequest(url: RequestInfo, options?: RequestInit): Promise<any> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
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

function apiRequest(url: RequestInfo, options?: RequestInit): Promise<any> {
  // @ts-ignore
  const headers: Headers = new Headers(options?.headers || []);
  const accessToken: string | undefined = getCookie('accessToken');

  headers.set('Accept', 'application/json');

  if (options?.method && ['POST', 'PUT', 'PATCH'].includes(options.method)) {
    headers.set('Content-Type', 'application/json; charset=UTF-8');
  }

  if (accessToken) {
    headers.set('Authorization', accessToken);
  }

  return internalApiRequest(url, { ...options, headers });
}

export function postOrder(ingredientsListId: string[]) {
  const ingredientsId = {
    ingredients: ingredientsListId,
  };

  return apiRequest(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(ingredientsId),
  });
}

export function getIngredients(): Promise<TApiResponseIngredients> {
  return internalApiRequest(`${API_URL}/ingredients`);
}

export function registerNewUser(data: TApiRequestRegisterNewUser)
  : Promise<TApiResponseRegisterNewUser> {
  return apiRequest(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function login(data: TApiRequestLogin)
  : Promise<TApiResponseLogin> {
  return apiRequest(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function passwordReset(data: TApiRequestPasswordReset)
  : Promise<TApiResponsePasswordReset> {
  return apiRequest(`${API_URL}/password-reset`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updatePassword(data: TApiRequestUpdatePassword)
  : Promise<TApiResponseUpdatePassword> {
  return apiRequest(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getUserData(): Promise<TApiResponseGetUserData> {
  return apiRequest(`${API_URL}/auth/user`, {
    method: 'GET',
  });
}

export function updateUserData(data: TApiRequestUpdateUserData)
  : Promise<TApiResponseUpdateUserData> {
  return apiRequest(`${API_URL}/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function logout(): Promise<TApiResponseLogout> {
  const token = getCookie('refreshToken');
  return apiRequest(`${API_URL}/auth/logout`, {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

export function refreshToken(): Promise<TApiResponseRefreshToken> {
  return apiRequest(`${API_URL}/auth/token`, {
    method: 'POST',
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  });
}
