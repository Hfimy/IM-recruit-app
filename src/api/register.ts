import { axios, ResponseData } from 'src/api';

enum UserType {
  Boss = 'boss',
  Expert = 'expert'
}

interface RegisterParams {
  user: string;
  pwd: string;
  type: UserType;
}

export function register(
  body: RegisterParams,
  cb: (data: ResponseData) => void
) {
  const url = '/user/register';
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
      cb({ code: 1, msg: '注册失败' });
    });
}
