import { axios, ResponseData } from 'src/api';

export function getMsgList(cb: (data: ResponseData) => void) {
  const url = '/api/msg/list';
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
      cb({ code: 1, msg: '获取消息列表失败' });
    });
}
