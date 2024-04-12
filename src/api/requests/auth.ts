import {deleteCookie} from '@/utils/helpers';

import {API_KEY, TOKEN_URL, TOKENS_NAMES} from '../constants';
import {authRequest, request} from '../request';
import {LoginData, RegisterData} from '../types';

export const signUpRequest = (registerData: RegisterData) =>
  authRequest({
    path: 'accounts:signUp',
    body: {
      ...registerData,
      returnSecureToken: true,
    },
  });

export const signInRequest = (loginData: LoginData) =>
  authRequest({
    path: 'accounts:signInWithPassword',
    body: {
      ...loginData,
      returnSecureToken: true,
    },
  });

export const signOut = () => {
  localStorage.removeItem(TOKENS_NAMES.refresh);
  deleteCookie(TOKENS_NAMES.access);
};

export const updateCredentials = () =>
  request({
    method: 'POST',
    baseURL: TOKEN_URL,
    path: 'token',
    params: {
      key: API_KEY,
    },
    body: {
      grant_type: TOKENS_NAMES.refresh,
      refresh_token: localStorage.getItem(TOKENS_NAMES.refresh),
    },
  });
