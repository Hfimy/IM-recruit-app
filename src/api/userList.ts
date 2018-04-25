import { axios, queryString, ResponseData } from 'src/api';

interface Params {
  type: string;
  intention?: string;
  city?: string;
  leftSalary?: number;
  rightSalary?: number;
}

export function getUserList(params: Params, cb: (data: ResponseData) => void) {
  const url = '/user/list?' + queryString.stringify(params);
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
      cb({ code: 1, msg: '获取列表信息失败' });
    });
}
