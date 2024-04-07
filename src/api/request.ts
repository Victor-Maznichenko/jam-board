import {createEffect} from 'effector';

import {AUTH_URL, BASE_URL} from './constants';
import {FirebaseError, Request} from './types';

export const requestFx = createEffect<Request, any, FirebaseError>(async (request) => {
  const selectedURL = request.instance === 'auth' ? AUTH_URL : BASE_URL;

  const headers: HeadersInit = {};
  if (request.accessToken) headers.Authorization = request.accessToken;

  const response = await fetch(new URL(selectedURL + request.path), {
    method: request.method,
    headers,
    body: JSON.stringify(request.body),
  });

  if (!response.ok) {
    const {error} = await response.json();
    throw error;
  }

  return await response.json();
});
