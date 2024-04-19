import {createEffect, createEvent} from 'effector';

import {getEntity} from '@/api/requests/firebase';
import {User} from '@/api/types';
import {convertToFields} from '@/utils/helpers';

import {updateEntityFx} from '../firebase';

// Effects
export const getUserFx = createEffect(async () => {
  const id = localStorage.getItem('uid');
  if (!id) throw new Error('Unknown uid');
  return await getEntity({path: `/users/${id}`});
});

export const updateUserFx = createEffect(
  async (user: User) =>
    await updateEntityFx({
      path: `/users/${user.uid}`,
      body: {
        fields: convertToFields<User>(user),
      },
    }),
);

// Events
export const updateUserEmoji = createEvent();
