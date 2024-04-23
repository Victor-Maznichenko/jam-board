import {createEffect, createEvent} from 'effector';

import {User} from '@/api/types';

import {getEntityFx, updateEntityFx} from '../firebase';

// Effects
export const getUserFx = createEffect(async (uid: string) => {
  return await getEntityFx({path: `/users/${uid}`});
});

export const getProfileFx = createEffect(async () => {
  const uid = localStorage.getItem('uid');
  if (!uid) throw new Error('Unknown uid');
  return await getUserFx(uid);
});

export const updateUserFx = createEffect(async (newUser: User) => {
  await updateEntityFx({
    path: `/users/${newUser.uid}`,
    body: {...newUser},
  });
  return newUser;
});

// Events
export const updateUserEmoji = createEvent();
