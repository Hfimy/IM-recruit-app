import { LOGIN_SUCCESS, LOGIN_FAIL } from './actionType';

interface LoginSuccess {
  type: LOGIN_SUCCESS;
  data: {
    user: string;
  };
}

interface LoginFail {
  type: LOGIN_FAIL;
  msg: string;
}

export type LoginType = LoginSuccess | LoginFail;

interface Data {
  user: string;
}

export function loginSuccess(data: Data): LoginSuccess {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function loginFail(msg: string): LoginFail {
  return {
    type: LOGIN_FAIL,
    msg
  };
}
