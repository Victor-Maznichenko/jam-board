import {createEffect} from 'effector';

import {API_KEY} from '@/api/constants';

import {requestFx} from './request';
import {
  AuthData,
  CreateDocParams,
  FirebaseError,
  GetDocParams,
  UnknownObject,
  UpdateDocParams,
} from './types';

export const signInFx = createEffect((authData: AuthData) =>
  requestFx({
    method: 'POST',
    path: `/accounts:signInWithPassword?key=${API_KEY}`,
    instance: 'auth',
    body: {
      ...authData,
      returnSecureToken: true,
    },
  }),
);

export const signUpFx = createEffect((authData: AuthData) =>
  requestFx({
    method: 'POST',
    path: `/accounts:signUp?key=${API_KEY}`,
    instance: 'auth',
    body: {
      ...authData,
      returnSecureToken: true,
    },
  }),
);

export const updateCredentialsFx = createEffect<void, any, FirebaseError>(() =>
  requestFx({
    method: 'POST',
    instance: 'auth',
    body: {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken'),
    },
    path: `/token?key=${API_KEY}`,
  }),
);

export const createDocFx = createEffect(({accessToken, path, documentId}: CreateDocParams) =>
  requestFx({
    method: 'POST',
    accessToken,
    path: `/documents${path}?documentId=${documentId}`,
  }),
);

export const updateDocFx = createEffect(({accessToken, path, body}: UpdateDocParams) => {
  const fieldsBody: UnknownObject = {};
  let updateMask = '';

  for (const key in body) {
    updateMask += `&updateMask.fieldPaths=${key}`;
    fieldsBody[key] = {[`${typeof body[key]}Value`]: body[key]};
  }

  return requestFx({
    method: 'PATCH',
    accessToken,
    body: {
      fields: fieldsBody,
    },
    path: `/documents${path}?currentDocument.exists=true&${updateMask}`,
  });
});

export const getDocFx = createEffect(({accessToken, path, maskArray}: GetDocParams) => {
  let mask = '';

  if (maskArray) {
    for (let i = 0; i++; i < maskArray.length) mask += `&mask.fieldPaths=${maskArray[i]}`;

    mask = mask.slice(1);
  }

  return requestFx({
    method: 'GET',
    accessToken,
    path: `/documents${path}?${mask}`,
  });
});
