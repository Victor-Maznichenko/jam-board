import {createStore, merge, sample} from 'effector';

import {Document, RequestStatus, User} from '@/api/types';
import {convertFromFields, getRandomEmoji} from '@/utils/helpers';

import {signInFx, signUpFx, updateCredentialsFx} from '../auth/actions';
import {getUserFx, updateUserEmoji, updateUserFx} from './actions';
import {UserState} from './types';

// Store
const initialState: UserState = {
  user: null,
  userEmoji: '🙂',
  status: RequestStatus.Pending,
};

const $userState = createStore(initialState);

// Reducers
const reducers = {
  fail: (state: UserState) => ({
    ...state,
    status: RequestStatus.Fail,
  }),

  loading: (state: UserState) => ({
    ...state,
    status: RequestStatus.Loading,
  }),

  getUserDone: (state: UserState, {fields}: Document) => ({
    ...state,
    user: convertFromFields<User>(fields),
  }),

  updateEmodji: (state: UserState) => ({
    ...state,
    userEmoji: getRandomEmoji(),
  }),
};

// Creating combined effects
const actionsLoad = merge([getUserFx, updateUserFx]);
const actionsFail = merge([getUserFx.failData, updateUserFx.failData]);
const authSuccess = merge([signUpFx.done, signInFx.done, updateCredentialsFx.done]);

// Binding of redusers to effects
$userState.on(actionsFail, reducers.fail);
$userState.on(actionsLoad, reducers.loading);
$userState.on(updateUserEmoji, reducers.updateEmodji);
$userState.on(getUserFx.doneData, reducers.getUserDone);

// Samples
sample({
  clock: authSuccess,
  target: getUserFx,
});

sample({
  clock: getUserFx,
  target: updateUserEmoji,
});

export default $userState;
export * from './actions';
export * from './types';
