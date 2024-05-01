import {createStore} from 'effector';

import {getUserFx} from './actions';
import {UsersState} from './types';

// Store
const initialState: UsersState = {
  users: [],
};

const $usersState = createStore(initialState);

// Reducers
const reducers = {
  getUserDone: (state: UsersState, user: Api.User) => ({
    ...state,
    users: [...state.users, user],
  }),
};

// Binding of redusers to effects
$usersState.on(getUserFx.doneData, reducers.getUserDone);

// Exports
export default $usersState;
export * from './actions';
export * from './types';
