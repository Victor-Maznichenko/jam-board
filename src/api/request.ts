import {buildUrl} from '@/utils/helpers';
import {convertToDocFields} from '@/utils/helpers/convertToDocFields';
import {getCookie} from '@/utils/helpers/cookies';

import {API_KEY, AUTH_URL, BASE_URL, TOKENS_NAMES} from './constants';
import {DocRequestParams, RequestParams} from './types';

export const request = async ({
  baseURL = BASE_URL,
  path,
  body,
  params,
  token,
  method = 'GET',
}: RequestParams) => {
  // Построение URL запроса
  const url = buildUrl({baseURL, path, params});
  console.log(body);

  // Создание авторизационного заголовка
  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // Запрос на сервер
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const {error} = await response.json();
    console.log(error);
    throw error;
  }

  return await response.json();
};

// Запрос на сервер аутентификации
export const authRequest = ({path, body}: RequestParams) =>
  request({
    method: 'POST',
    baseURL: AUTH_URL,
    params: {
      key: API_KEY,
    },
    path,
    body,
  });

// Запрос на сервер с данными [требуется токен]
export const baseRequest = ({path, method, body, params}: RequestParams) =>
  request({
    token: getCookie(TOKENS_NAMES.access),
    baseURL: BASE_URL,
    path,
    params,
    method,
    body,
  });

// Запрос для создания документа Firebase
export const createDocRequest = ({path, documentId}: DocRequestParams) =>
  baseRequest({
    path: `documents${path}`,
    method: 'POST',
    params: {documentId},
  });

// Запрос для обновления документа Firebase
export const updateDocRequest = ({path, documentId, body}: DocRequestParams) =>
  baseRequest({
    path: `documents${path}/${documentId}`,
    method: 'PATCH',
    body: {
      fields: convertToDocFields(body),
    },
  });

// Запрос для получения документа Firebase
export const getDocRequest = ({path, documentId}: DocRequestParams) =>
  baseRequest({
    path: `documents${path}/${documentId}`,
    method: 'GET',
  });

export const deleteDocRequest = ({path, documentId}: DocRequestParams) =>
  baseRequest({
    path: `documents${path}/${documentId}`,
    method: 'DELETE',
    body: null,
  });
