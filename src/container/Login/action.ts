import { LOGIN_SUCCESS, LOGIN_FAIL } from './actionType';

interface Login_Success {
  type: LOGIN_SUCCESS;
  data: {
    user: string;
  };
}

interface Login_Fail {
  type: LOGIN_FAIL;
  msg: string;
}

export type Login_Type = Login_Success | Login_Fail;

interface Data {
  user: string;
}
export function loginSuccess(data: Data): Login_Success {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function loginFail(msg: string): Login_Fail {
  return {
    type: LOGIN_FAIL,
    msg
  };
}
