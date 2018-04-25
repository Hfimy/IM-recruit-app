import { axios, ResponseData } from 'src/api';

interface Params {
  intention: string;
  city: string;
  leftSalary?: number;
  rightSalary?: number;
  company?: string;
}

export function updateUserInfo(body: Params, cb: (data: ResponseData) => void) {
  const url = '/user/info';
  axios
    .post(url, body)
    .then(res => {
      if (res.status === 200) {
        cb(res.data);
        return;
      }
      throw new Error();
    })
    .catch(err => {
      cb({ code: 1, msg: '编辑失败' });
    });
}

export function getUserInfo(cb: (data: ResponseData) => void) {
  const url = '/user/info';
  axios
    .get(url)
    .then(res => {
      if (res.status === 200) {
        cb(res.data);
        return;
      }
      throw new Error();
    })
    .catch(err => {
      cb({ code: 1, msg: '获取用户信息失败' });
    });
}
