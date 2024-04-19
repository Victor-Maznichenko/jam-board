import {TOKENS_NAMES} from '@/api/constants';

import {setCookie} from '.';

interface SaveCredentialsParams {
  uid: string;
  accessToken: string;
  refreshToken: string;
}

export const saveCredentials = ({accessToken, refreshToken, uid}: SaveCredentialsParams) => {
  setCookie(TOKENS_NAMES.access, accessToken);
  localStorage.setItem(TOKENS_NAMES.refresh, refreshToken);
  localStorage.setItem('uid', uid);
};
