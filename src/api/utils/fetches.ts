import {getCookie} from '@/utils/helpers';

import {API_KEY, AUTH_URL, BASE_URL, TOKEN_URL, TOKENS_NAMES} from '../constants';
import {SimpleFetch} from './SimpleFetch';

export const baseFetch = new SimpleFetch({
  baseURL: BASE_URL,
  options: {
    headers: {
      Authorization: `Bearer ${getCookie(TOKENS_NAMES.access)}`,
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
