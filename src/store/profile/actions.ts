import {createEffect, createEvent} from 'effector';

import {getEntityFx, writeEntityFx} from '../firebase';

// Effects
export const getUserFx = createEffect(
  async (uid: string) => await getEntityFx({path: `/users/${uid}`}),
);

export const getProfileFx = createEffect(async () => {
  const uid = localStorage.getItem('uid');
  if (!uid) throw new Error('Unknown uid');
  return await getUserFx(uid);
});

export const updateUserFx = createEffect(async (newUser: Api.User) => {
  await writeEntityFx({
    path: `/users/${newUser.uid}`,
    body: {...newUser},
  });
  return newUser;
});

// Events
export const updateUserEmoji = createEvent();
