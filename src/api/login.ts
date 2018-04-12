import axios from 'axios';
import { ResponseData } from 'src/api';

interface LoginParameter {
  user: string;
  pwd: string;
}

export function login(body: LoginParameter, cb: (data: ResponseData) => void) {
  const url = '/user/login';
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
      cb({ code: 1, msg: '登录失败' });
    });
}
