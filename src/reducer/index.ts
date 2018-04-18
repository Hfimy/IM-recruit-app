import { combineReducers } from 'redux';

import { UserState, UserReducer } from './user/reducer';

export interface RootState {
  user: UserState;
}
export const RootReducer = combineReducers({
  user: UserReducer
});
