import {createEffect} from 'effector';

import {UserRole} from '@/api/constants';
import {signIn, signUp, updateCredentials} from '@/api/requests/auth';
import {FirebaseError, LoginData, RegisterData} from '@/api/types';
import {saveCredentials} from '@/utils/helpers';

import {createDocByIdFx, updateEntityFx} from '../firebase';

export const signUpFx = createEffect<RegisterData, void, FirebaseError>(async (registerData) => {
  // 1. Регистрация в FireAuth
  const {localId, refreshToken, idToken} = await signUp(registerData);
  const uid = localId;
  saveCredentials({
    accessToken: idToken,
    refreshToken,
    uid,
  });

  // 2. Создание документа в FireStore
  await createDocByIdFx({
    path: '/users',
    id: uid,
  });

  // 3. Запись данных в документ FireStore
  await updateEntityFx({
    path: `/users/${uid}`,
    body: {
      uid,
      ...registerData,
      role: UserRole.VIEWER,
    },
  });

  return uid;
});

export const signInFx = createEffect<LoginData, void, FirebaseError>(async (loginData) => {
  const {localId, refreshToken, idToken} = await signIn(loginData);
  saveCredentials({
    accessToken: idToken,
    refreshToken,
    uid: localId,
  });
});

export const updateCredentialsFx = createEffect<void, void, FirebaseError>(async () => {
  const {refresh_token, access_token, user_id} = await updateCredentials();
  saveCredentials({
    accessToken: access_token,
    refreshToken: refresh_token,
    uid: user_id,
  });
  location.reload();
});

export {baseRequestFailed} from '../firebase';
