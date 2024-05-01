import {API_KEY, TokensNames} from '@/api/constants';
import {authFetch, tokenFetch} from '@/api/utils/fetches';
import {getCookie} from '@/api/utils/helpers';

export const signUp = async (registerData: Api.RegisterData) =>
  await authFetch.post({
    path: 'accounts:signUp',
    body: {
      ...registerData,
      returnSecureToken: true,
    },
  });

export const signIn = async (loginData: Api.LoginData) =>
  await authFetch.post({
    path: 'accounts:signInWithPassword',
    body: {
      ...loginData,
      returnSecureToken: true,
    },
  });

export const updateCredentials = async () =>
  await tokenFetch.post({
    path: 'token',
    body: {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem(TokensNames.refresh),
    },
  });

export const changeEmail = async (email: string) =>
  await authFetch.post({
    path: 'accounts:update',
    params: {
      key: API_KEY,
    },
    body: {
      idToken: getCookie(TokensNames.access),
      email,
      returnSecureToken: true,
    },
  });
