import { combineReducers } from 'redux';

import { UserState, UserReducer } from './user';
import { UserListState, UserListReducer } from './userList';
import { ChatState, ChatReducer } from './chat'

export interface RootState {
  user: UserState;
  userList: UserListState;
  chat: ChatState;
}
export const RootReducer = combineReducers({
  user: UserReducer,
  userList: UserListReducer,
  chat: ChatReducer
});
