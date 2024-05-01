import {createStore, merge, sample} from 'effector';

import {RequestStatus} from '@/api/constants';
import {getErrorMessage} from '@/api/utils/helpers';

import {baseRequestFailed, signInFx, signOutFx, signUpFx, updateCredentialsFx} from './actions';
import {AuthState} from './types';

// State
const initialState: AuthState = {
  isRedirect: false,
  errorMessage: null,
  status: RequestStatus.Pending,
};

const $authState = createStore(initialState);
$authState.watch((state) => console.log(state));

// Reducers
const reducers = {
  loading: (state: AuthState) => ({
    ...state,
    isRedirect: false,
    status: RequestStatus.Loading,
  }),

  fail: (state: AuthState, error: Api.FirebaseError) => ({
    ...state,
    isRedirect: false,
    status: RequestStatus.Fail,
    errorMessage: getErrorMessage(error),
  }),

  failRedirect: (state: AuthState, error: Api.FirebaseError) => {
    if (error.code === 401) return state;
    return {
      ...state,
      isRedirect: true,
      status: RequestStatus.Fail,
      errorMessage: '',
    };
  },

  signUpDone: (state: AuthState) => ({
    ...state,
    isRedirect: false,
    status: RequestStatus.Success,
  }),

  signInDone: (state: AuthState) => ({
    ...state,
    isRedirect: false,
    status: RequestStatus.Success,
  }),

  updateCredentialsDone: (state: AuthState) => ({
    ...state,
    isRedirect: false,
    status: RequestStatus.Success,
  }),
};

// Creating combined effects
const actionsLoad = merge([signUpFx, signInFx, updateCredentialsFx]);
const actionsFail = merge([signUpFx.failData, signInFx.failData, updateCredentialsFx.failData]);

// Binding of redusers to effects
$authState.on(actionsFail, reducers.fail);
$authState.on(actionsLoad, reducers.loading);
$authState.on(actionsFail, reducers.failRedirect);
$authState.on(signUpFx.doneData, reducers.signUpDone);
$authState.on(signInFx.doneData, reducers.signInDone);
$authState.on(updateCredentialsFx.doneData, reducers.updateCredentialsDone);

// Samples
sample({
  clock: baseRequestFailed,
  filter: (error) => error.code === 401,
  target: updateCredentialsFx,
});

$authState.reset(signOutFx);

// Exports
export default $authState;
export * from './actions';
export * from './types';
