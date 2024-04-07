import * as api from '@/api';
import { requestFx } from '@/api/request';
import {attach, createEvent, createStore, sample} from 'effector';

export type UserRole = 'PROGRAMMGER' | 'TEAM_LEAD' | 'VIEWER' | 'ADMIN';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string;
}

export interface Credentials {
  refreshToken: string;
  accessToken: string;
  displayName: string;
  expiresIn: string;
  localId: string;
  email: string;
  kind: string;
}

// Stores
export const $user = createStore<User | null>(null);
export const $authError = createStore("");
export const $credentials = createStore<Credentials | null>(null);

// Events
export const clearAuthError = createEvent();
$credentials.watch((credentials) => {
  const refreshToken = credentials ? credentials.refreshToken : "";
  return localStorage.setItem("refreshToken", refreshToken)
})

// Effects
export const updateCredentialsFx = attach({effect: api.updateCredentialsFx});
export const signUpFx = attach({effect: api.signUpFx});
export const signInFx = attach({effect: api.signInFx});

export const createUserFx = attach({
  effect: api.createDocFx,
  mapParams: (credentials) => ({
    accessToken: credentials.accessToken,
	  documentId: credentials.localId,
    path: "/users",
  }),
});

export const updateUserFx = attach({
  effect: api.updateDocFx,
  mapParams: (credentials) => {
    const newUser = {
      role: 'VIEWER',
      uid: credentials.localId,
      email: credentials.email,
      displayName: credentials.displayName,
    };

    return {
      accessToken: credentials.accessToken,
    	path: `/users/${credentials.localId}`,
      body: newUser,
    };
  },
});

export const getUserFx = attach({
  effect: api.getDocFx,
  mapParams: (credentials) => ({
    accessToken: credentials.accessToken,
    path: `/users/${credentials.localId}`,
  }),
});


// Samples
sample({
  clock: signUpFx.doneData,
  filter: (credentials) => !!credentials,
  fn: (credentials) => !!credentials,
  target: [$credentials, createUserFx],
});

sample({
  clock: createUserFx.done,
  source: $credentials,
  filter: (credentials) => !!credentials,
  target: updateUserFx,
});

sample({
  clock: [signInFx.doneData, updateCredentialsFx.doneData],
  filter: (credentials) => !!credentials,
  target: [$credentials, getUserFx],
});

sample({
  clock: getUserFx.doneData,
  filter: (response) => response.fields,
  target: $user,
});

sample({
  clock: [signUpFx.failData, signInFx.failData],
  fn: (error: Error) => {
    switch (error.message) {
      case 'EMAIL_EXISTS':
        return 'Пользователь с таким email уже существует';
      case 'INVALID_EMAIL':
        return 'Адрес электронной почты неправильно введен.';
      case 'OPERATION_NOT_ALLOWED':
        return 'Вход по паролю отключен для этого проекта';
      case 'INVALID_LOGIN_CREDENTIALS':
        return 'Неправильный логин или пароль';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Мы заблокировали все запросы с этого устройства из-за необычной активности. Повторите попытку позже.';
    }
    return error.message;
  },
  target: $authError,
});

sample({
  clock: clearAuthError,
  source: $authError,
  filter: (authError) => !!authError,
  target: clearAuthError,
});

sample({
  clock: [updateUserFx.done, signInFx.doneData],
  filter: (credentials) => !!credentials,
  fn: (credentials) => {
    const newUser = {
      role: <UserRole>'VIEWER',
      uid: credentials.localId,
      email: credentials.email,
      displayName: credentials.displayName,
    };

    return newUser;
  },
  target: $user,
});

sample({
  clock: requestFx.failData,
  filter: (error) => error.code === 401 && !!localStorage.getItem("refreshToken"),
  target: updateCredentialsFx
});

sample({
  clock: updateCredentialsFx.failData,
  filter: (error) => error.code === 400,
  fn: () => {
    localStorage.removeItem("refreshToken");
    return null;
  },
  target: $credentials
});