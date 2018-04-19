import { LOAD_USER_SUCCESS, UPDATE_USER_SUCCESS } from './actionType';
import { ResponseData, getUserInfo, updateUserInfo } from 'src/api';
import { UserState } from './reducer';

interface LoadUserSuccess {
  type: LOAD_USER_SUCCESS;
  data: UserState;
}

interface UpdateUserSuccess {
  type: UPDATE_USER_SUCCESS;
  data: UserState;
}

export const loadUserSuccess = (data: UserState): LoadUserSuccess => ({
  type: LOAD_USER_SUCCESS,
  data
});

export const updateUserSuccess = (data: UserState): UpdateUserSuccess => ({
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
