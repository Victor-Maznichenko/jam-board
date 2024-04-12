import {createEffect, createEvent, createStore, sample} from 'effector';

import {signInRequest, signUpRequest, updateCredentials} from '@/api/requests/auth';
import {AuthError, LoginData, RegisterData, UserRole} from '@/api/types';
import {saveCredentials} from '@/utils/helpers';

import {baseRequestFailed, createDocFx, updateDocFx} from './firebase';

// Stores
export const $errorAuth = createStore('');

//Events
export const errorAuthCleared = createEvent();

// Effects
export const signUpFx = createEffect(async (registerData: RegisterData) => {
  // 1. Регистрация в FireAuth
  const {localId, refreshToken, idToken} = await signUpRequest(registerData);
  const uid = localId;
  saveCredentials({
    accessToken: idToken,
    refreshToken,
    uid,
  });

  // 2. Создание документа в FireStore
  await createDocFx({
    path: '/users',
    documentId: uid,
  });

  // 3. Запись данных в документ FireStore
  await updateDocFx({
    path: '/users',
    documentId: uid,
    body: {
      uid,
      ...registerData,
      role: UserRole.VIEWER,
    },
  });

  return uid;
});

export const signInFx = createEffect(async (loginData: LoginData) => {
  const {localId, refreshToken, idToken} = await signInRequest(loginData);
  saveCredentials({
    accessToken: idToken,
    refreshToken,
    uid: localId,
  });
});

export const updateCredentialsFx = createEffect(async () => {
  const {refresh_token, id_token, user_id} = await updateCredentials();
  saveCredentials({
    accessToken: id_token,
    refreshToken: refresh_token,
    uid: user_id,
  });
});

// Samples
sample({
  clock: [signUpFx.failData, signInFx.failData],
  fn: (error) => {
    switch (error.message) {
      case AuthError.EMAIL_EXISTS:
        return 'Пользователь с таким email уже существует';
      case AuthError.INVALID_EMAIL:
        return 'Адрес электронной почты неправильно введен.';
      case AuthError.OPERATION_NOT_ALLOWED:
        return 'Вход по паролю отключен для этого проекта';
      case AuthError.INVALID_LOGIN_CREDENTIALS:
        return 'Неправильный логин или пароль';
      case AuthError.TOO_MANY_ATTEMPTS_TRY_LATER:
        return 'Мы заблокировали все запросы с этого устройства из-за необычной активности. Повторите попытку позже.';
      default:
        return error.message;
    }
  },
  target: $errorAuth,
});

sample({
  clock: baseRequestFailed,
  filter: (error) => error.code === 401,
  target: updateCredentialsFx,
});

// Resets
$errorAuth.reset(errorAuthCleared);
