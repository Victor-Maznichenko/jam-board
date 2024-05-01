import {createStore, merge, sample} from 'effector';

import {RequestStatus, UserRole} from '@/api/constants';
import {convertFromDoc, getRandomEmoji} from '@/api/utils/helpers';

import {changeEmailFx, signInFx, signUpFx, updateCredentialsFx} from '../auth/actions';
import {getProfileFx, updateUserEmoji, updateUserFx} from './actions';
import {ProfileState} from './types';

// Store
const initialState: ProfileState = {
  user: {
    uid: '',
    email: '',
    role: UserRole.VIEWER,
    displayName: '',
  },
  userEmoji: '🙂',
  status: RequestStatus.Pending,
};

const $profileState = createStore(initialState);

// Reducers
const reducers = {
  fail: (state: ProfileState) => ({
    ...state,
    status: RequestStatus.Fail,
  }),

  loading: (state: ProfileState) => ({
    ...state,
    status: RequestStatus.Loading,
  }),

  getProfileDone: (state: ProfileState, profileDoc: Api.Document) => ({
    ...state,
    user: convertFromDoc<Api.User>(profileDoc),
  }),

  updateUserDone: (state: ProfileState, newUser: Api.User) => ({
    ...state,
    user: newUser,
  }),

  changeEmailDone: (state: ProfileState, email: string) => {
    if (!state.user) return state;
    return {
      ...state,
      user: {
        ...state.user,
        email,
      },
    };
  },

  updateEmodji: (state: ProfileState) => ({
    ...state,
    userEmoji: getRandomEmoji(),
  }),
};

// Creating combined effects
const actionsLoad = merge([getProfileFx, updateUserFx, changeEmailFx]);
const actionsFail = merge([getProfileFx.failData, updateUserFx.failData]);
const authSuccess = merge([signUpFx.done, signInFx.done, updateCredentialsFx.done]);

// Binding of redusers to effects
$profileState.on(actionsFail, reducers.fail);
$profileState.on(actionsLoad, reducers.loading);
$profileState.on(updateUserEmoji, reducers.updateEmodji);
$profileState.on(getProfileFx.doneData, reducers.getProfileDone);
$profileState.on(updateUserFx.doneData, reducers.updateUserDone);
$profileState.on(changeEmailFx.doneData, reducers.changeEmailDone);

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
  source: $profileState,
  fn: (state, email) => {
    const user = {
      ...state.user,
      email,
    };
    return user as Api.User;
  },
  target: updateUserFx,
});

// Exports
export default $profileState;
export * from './actions';
export * from './types';
