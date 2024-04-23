import {API_KEY, TOKENS_NAMES} from '@/api/constants';
import {LoginData, RegisterData} from '@/api/types';
import {authFetch, tokenFetch} from '@/api/utils/fetches';
import {deleteCookie, getCookie} from '@/utils/helpers';

export const signUp = async (registerData: RegisterData) =>
  await authFetch.post({
    path: 'accounts:signUp',
    body: {
      ...registerData,
      returnSecureToken: true,
    },
  });

export const signIn = async (loginData: LoginData) =>
  await authFetch.post({
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

export const updateCredentials = async () =>
  await tokenFetch.post({
    path: 'token',
    body: {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem(TOKENS_NAMES.refresh),
    },
  });

export const changeEmail = async (email: string) =>
  await authFetch.post({
    path: 'accounts:update',
    params: {
      key: API_KEY,
    },
    body: {
      idToken: getCookie(TOKENS_NAMES.access),
      email,
      returnSecureToken: true,
    },
  });
