import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserActions.addUser, (state, { user }) => ({ ...state, users: [...state.users, user] }))
);