import {createEffect} from 'effector';

import {convertFromDoc} from '@/api/utils/helpers';

import {getEntityFx} from '../firebase';

export const getUserFx = createEffect(async ({uid}: Pick<Api.User, 'uid'>) =>
  convertFromDoc<Api.User>(
    await getEntityFx({
      path: `/users/${uid}`,
    }),
  ),
);
