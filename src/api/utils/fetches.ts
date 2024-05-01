import {API_KEY, AUTH_URL, BASE_URL, TOKEN_URL, TokensNames} from '../constants';
import {getCookie} from './helpers';
import {SimpleFetch} from './SimpleFetch';

export const baseFetch = new SimpleFetch({
  baseURL: BASE_URL,
  options: {
    headers: {
      Authorization: `Bearer ${getCookie(TokensNames.access)}`,
    },
  },
});

export const authFetch = new SimpleFetch({
  baseURL: AUTH_URL,
  params: {
    key: API_KEY,
  },
});

export const tokenFetch = new SimpleFetch({
  baseURL: TOKEN_URL,
  params: {
    key: API_KEY,
  },
});
