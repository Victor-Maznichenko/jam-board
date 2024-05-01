import {createEffect} from 'effector';

import {TokensNames, UserRole} from '@/api/constants';
import {changeEmail, signIn, signUp, updateCredentials} from '@/api/requests/auth';
import {deleteCookie, saveCredentials} from '@/api/utils/helpers';

import {writeEntityFx} from '../firebase';

export const signUpFx = createEffect<Api.RegisterData, void, Api.FirebaseError>(
  async (registerData) => {
    // 1. Регистрация в FireAuth
    const {localId, refreshToken, idToken} = await signUp(registerData);
    const uid = localId;
    saveCredentials({
      accessToken: idToken,
      refreshToken,
      uid,
    });

    // 2. Запись данных в документ FireStore
    await writeEntityFx({
      path: `/users/${uid}`,
      body: {
        uid,
        ...registerData,
        role: UserRole.VIEWER,
      },
    });

    return uid;
  },
);

export const signInFx = createEffect<Api.LoginData, void, Api.FirebaseError>(async (loginData) => {
  const {localId, refreshToken, idToken} = await signIn(loginData);
  saveCredentials({
    accessToken: idToken,
    refreshToken,
    uid: localId,
  });
});

export const updateCredentialsFx = createEffect<void, void, Api.FirebaseError>(async () => {
  const {refresh_token, access_token, user_id} = await updateCredentials();
  saveCredentials({
    accessToken: access_token,
    refreshToken: refresh_token,
    uid: user_id,
  });
  location.reload();
});

export const changeEmailFx = createEffect(async (email: string) => {
  const {idToken, localId} = await changeEmail(email);
  saveCredentials({
    accessToken: idToken,
    uid: localId,
  });
  return email;
});

export const signOutFx = createEffect(() => {
  localStorage.removeItem(TokensNames.refresh);
  deleteCookie(TokensNames.access);
});

changeEmailFx.failData.watch((error) => console.log(error));

export {baseRequestFailed} from '../firebase';
