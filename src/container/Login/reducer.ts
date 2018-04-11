import { LOGIN_SUCCESS, LOGIN_FAIL } from './actionType';
import { LoginType } from './action';

export interface UserState {
  user?: string;
  msg?: string;
}

export const UserReducer = (state: UserState = {}, action: LoginType) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data.user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        msg: action.msg
      };
    default:
      return state;
  }
};
