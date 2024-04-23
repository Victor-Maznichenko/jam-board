import {createStore, merge, sample} from 'effector';

import {Document, RequestStatus, User} from '@/api/types';
import {convertFromFields, getRandomEmoji} from '@/utils/helpers';

import {changeEmailFx, signInFx, signUpFx, updateCredentialsFx} from '../auth/actions';
import {getProfileFx, updateUserEmoji, updateUserFx} from './actions';
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

  getProfileDone: (state: UserState, {fields}: Document) => ({
    ...state,
    user: convertFromFields<User>(fields),
  }),

  updateUserDone: (state: UserState, newUser: User) => ({
    ...state,
    user: newUser,
  }),

  changeEmailDone: (state: UserState, email: string) => {
    if (!state.user) return state;
    return {
      ...state,
      user: {
        ...state.user,
        email,
      },
    };
  },

  updateEmodji: (state: UserState) => ({
    ...state,
    userEmoji: getRandomEmoji(),
  }),
};

// Creating combined effects
const actionsLoad = merge([getProfileFx, updateUserFx, changeEmailFx]);
const actionsFail = merge([getProfileFx.failData, updateUserFx.failData]);
const authSuccess = merge([signUpFx.done, signInFx.done, updateCredentialsFx.done]);

// Binding of redusers to effects
$userState.on(actionsFail, reducers.fail);
$userState.on(actionsLoad, reducers.loading);
$userState.on(updateUserEmoji, reducers.updateEmodji);
$userState.on(getProfileFx.doneData, reducers.getProfileDone);
$userState.on(updateUserFx.doneData, reducers.updateUserDone);
$userState.on(changeEmailFx.doneData, reducers.changeEmailDone);
// Samples
sample({
  clock: authSuccess,
  target: getProfileFx,
});

sample({
  clock: getProfileFx,
  target: updateUserEmoji,
});

sample({
  clock: changeEmailFx.doneData,
  source: $userState,
  fn: (state, email) => {
    const user = {
      ...state.user,
      email,
    };
    return user as User;
  },
  target: updateUserFx,
});

// Exports
export default $userState;
export * from './actions';
export * from './types';
