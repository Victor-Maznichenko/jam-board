import {TokensNames} from '@/api/constants';

import {setCookie} from './cookies';

interface SaveCredentialsParams {
  uid?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const saveCredentials = ({accessToken, refreshToken, uid}: SaveCredentialsParams) => {
  accessToken ? setCookie(TokensNames.access, accessToken) : '';
  refreshToken ? localStorage.setItem(TokensNames.refresh, refreshToken) : '';
  uid ? localStorage.setItem('uid', uid) : '';
};
