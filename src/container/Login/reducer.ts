import { LOGIN_SUCCESS, LOGIN_FAIL } from './actionType';
import { loginSuccess, loginFail, Login_Type } from './action';

interface UserState {
  user?: string;
  msg?: string;
}
export default function reducer(state: UserState, action: Login_Type) {
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
}
