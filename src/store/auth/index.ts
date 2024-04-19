import {createStore, merge, sample} from 'effector';

import {FirebaseError, RequestStatus} from '@/api/types';
import {getErrorMessage} from '@/api/utils/helpers';

import {baseRequestFailed, signInFx, signUpFx, updateCredentialsFx} from './actions';
import {AuthState} from './types';

// State
const initialState: AuthState = {
  errorMessage: null,
  status: RequestStatus.Pending,
};

const $authState = createStore(initialState);

// Reducers
const reducers = {
  loading: (state: AuthState) => ({
    ...state,
    status: RequestStatus.Loading,
  }),

  fail: (state: AuthState, error: FirebaseError) => ({
    ...state,
    errorMessage: getErrorMessage(error),
    status: RequestStatus.Fail,
  }),

  signUpDone: (state: AuthState) => ({
    ...state,
    status: RequestStatus.Success,
  }),

  signInDone: (state: AuthState) => ({
    ...state,
    status: RequestStatus.Success,
  }),

  updateCredentialsDone: (state: AuthState) => ({
    ...state,
    status: RequestStatus.Success,
  }),
};

// Creating combined effects
const actionsLoad = merge([signUpFx, signInFx, updateCredentialsFx]);
const actionsFail = merge([signUpFx.failData, signInFx.failData, updateCredentialsFx.failData]);

// Binding of redusers to effects
$authState.on(actionsFail, reducers.fail);
$authState.on(actionsLoad, reducers.loading);
$authState.on(signUpFx.doneData, reducers.signUpDone);
$authState.on(signInFx.doneData, reducers.signInDone);
$authState.on(updateCredentialsFx.doneData, reducers.updateCredentialsDone);

// Samples
sample({
  clock: baseRequestFailed,
  filter: (error) => error.code === 401,
  target: updateCredentialsFx,
});

// Exports
export default $authState;
export * from './actions';
export * from './types';
