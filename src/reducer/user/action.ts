import { LOAD_USER_SUCCESS, UPDATE_USER_SUCCESS, LOGOUT } from './actionType';
import { ResponseData, getUserInfo, updateUserInfo } from 'src/api';

interface Data {
  _id?: string;
  user?: string;
  type?: string;
  intention?: string;
  city?: string;
  leftSalary?: number;
  rightSalary?: number;
  company?: string;
}
interface LoadUserSuccess {
  type: LOAD_USER_SUCCESS;
  data: Data;
}

interface UpdateUserSuccess {
  type: UPDATE_USER_SUCCESS;
  data: Data;
}

interface Logout {
  type: LOGOUT;
}
export const loadUserSuccess = (data: Data): LoadUserSuccess => ({
  type: LOAD_USER_SUCCESS,
  data
});

export const updateUserSuccess = (data: Data): UpdateUserSuccess => ({
  type: UPDATE_USER_SUCCESS,
  data
});

export const loadUserInfo = (
  fail: (msg: string, duration?: number) => void,
  jump: (path: string) => void
) => {
  return dispatch => {
    getUserInfo(({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        dispatch(loadUserSuccess(data));
        return;
      }
      fail(msg, 1);
      jump('/login');
    });
  };
};

export const saveUserInfo = (
  body: any,
  success: (msg: string, duration?: number) => void,
  fail: (msg: string, duration?: number) => void,
  jump: (path: string) => void
) => {
  return dispacth => {
    updateUserInfo(body, ({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        success('保存成功', 1);
        dispacth(updateUserSuccess(data));
        if (data.type === 'boss') {
          jump('/expert');
        } else if (data.type === 'expert') {
          jump('/boss');
        }
        return;
      }
      fail(msg, 1);
    });
  };
};

export const logout = (): Logout => ({
  type: LOGOUT
});
