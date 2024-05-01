import {TokensNames} from '@/api/constants';

import {setCookie} from './cookies';

interface SaveCredentials {
  uid: string;
  accessToken: string;
  refreshToken: string;
}

export const updateCredentials = ({accessToken, refreshToken, uid}: SaveCredentials) => {
  setCookie(TokensNames.access, accessToken);
  localStorage.setItem(TokensNames.refresh, refreshToken);
  localStorage.setItem('uid', uid);
  location.reload();
};
