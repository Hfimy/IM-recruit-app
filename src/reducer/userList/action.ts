import {
  SELECT_JOB,
  SELECT_CITY,
  SELECT_SALARY,
  LOAD_USERLIST_SUCCESS,
  REFRESH_USERLIST_SUCCESS
} from './actionType';
import { ResponseData, getUserList } from 'src/api';

interface SelectJob {
  type: SELECT_JOB;
  selectedJob: Array<string>;
}
interface SelectCity {
  type: SELECT_CITY;
  selectedCity: Array<string>;
}
interface SelectSalary {
  type: SELECT_SALARY;
  selectedSalary: Array<string>;
}
interface LoadUserListSuccess {
  type: LOAD_USERLIST_SUCCESS;
  list: Array<object>;
}
interface RefreshUserListSuccess {
  type: REFRESH_USERLIST_SUCCESS;
  list: Array<object>
}

export const selectJob = (jobValue): SelectJob => ({
  type: SELECT_JOB,
  selectedJob: jobValue
});

export const selectCity = (cityValue): SelectCity => ({
  type: SELECT_CITY,
  selectedCity: cityValue
});

export const selectSalary = (salaryValue): SelectSalary => ({
  type: SELECT_SALARY,
  selectedSalary: salaryValue
});

export const loadUserListSuccess = (
  list: Array<object>
): LoadUserListSuccess => ({
  type: LOAD_USERLIST_SUCCESS,
  list
});

export const refreshUserListSuccess = (list: Array<object>): RefreshUserListSuccess => ({
  type: REFRESH_USERLIST_SUCCESS,
  list
})

export const loadUserListInfo = (
  params,
  fail: (msg: string, duration?: number) => void,
) => {
  return dispatch => {
    // 为了避免冗余代码，在真正使用或处理的地方定义类型
    getUserList(params, ({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        dispatch(loadUserListSuccess(data));
        return;
      }
      fail(msg, 1);
    });
  };
};
export const refreshUserListInfo = (
  params,
  fail: (msg: string, duration?: number) => void,
  cb: () => void
) => {
  return dispatch => {
    // 为了避免冗余代码，在真正使用或处理的地方定义类型
    getUserList(params, ({ code, data, msg }: ResponseData) => {
      cb();
      if (code === 0) {
        dispatch(refreshUserListSuccess(data));
        return;
      }
      fail(msg, 1);
    });
  };
};