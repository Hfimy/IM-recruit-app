import { combineReducers } from 'redux';

import { UserState, UserReducer } from './user';
import { UserListState, UserListReducer } from './userList';

export interface RootState {
  user: UserState;
  userList: UserListState;
}
export const RootReducer = combineReducers({
  user: UserReducer,
  userList: UserListReducer
});
