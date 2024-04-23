import {TOKENS_NAMES} from '@/api/constants';

import {setCookie} from '.';

interface SaveCredentialsParams {
  uid?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const saveCredentials = ({accessToken, refreshToken, uid}: SaveCredentialsParams) => {
  accessToken ? setCookie(TOKENS_NAMES.access, accessToken) : '';
  refreshToken ? localStorage.setItem(TOKENS_NAMES.refresh, refreshToken) : '';
  uid ? localStorage.setItem('uid', uid) : '';
};
