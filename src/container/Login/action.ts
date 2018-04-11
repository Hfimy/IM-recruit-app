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

export const loginSuccess = (data: Data): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  data
});

export const loginFail = (msg: string): LoginFail => ({
  type: LOGIN_FAIL,
  msg
});
