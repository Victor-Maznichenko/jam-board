import {createEffect, createEvent, createStore, sample} from 'effector';

import {User} from '@/api/types';
import {convertFromDocFields} from '@/utils/helpers/convertFromDocFields';

import {signInFx, signUpFx, updateCredentialsFx} from './auth';
import {getDocFx, updateDocFx} from './firebase';

// Stores
export const $user = createStore<User | null>(null);

// Events
export const userClear = createEvent();

// Effects
export const getUserFx = createEffect(
  async () =>
    await getDocFx({
      path: '/users',
      documentId: localStorage.getItem('uid') ?? '',
    }),
);

export const updateUserFx = createEffect(async (user: User) =>
  updateDocFx({
    path: '/users',
    documentId: user.uid,
    body: {
      ...user,
    },
  }),
);

// Samples
sample({
  clock: [signUpFx.done, signInFx.done, updateCredentialsFx.done],
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  fn: ({fields}) => convertFromDocFields<User>(fields),
  target: $user,
});
