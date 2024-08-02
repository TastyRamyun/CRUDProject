import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState, initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users: users,
    error: null,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(UserActions.addUser, state => ({ ...state, loading: true })),
  on(UserActions.addUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: [...state.users, user],
    error: null,
  })),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
