import { login } from './login';
import { register } from './register';
// 与后端的一种接口约定
export interface ResponseData {
  code: number;
  data?: {};
  msg?: string;
}

export { login, register };
