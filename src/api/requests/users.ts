import {convertFromFields} from '@/utils/helpers';

import {User} from '../types';
import {getEntity} from './firebase';

export const getUser = async (uid: string) => {
  const userDoc = await getEntity({path: `/users/${uid}`});
  return convertFromFields<User>(userDoc.fields);
};
