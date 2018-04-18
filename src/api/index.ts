import { login } from './login';
import { register } from './register';
import { saveUserInfo, getUserInfo } from './userInfo';
// 与后端的一种接口约定
export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
}

export { login, register, saveUserInfo, getUserInfo };