import axios from 'axios';
import queryString from 'query-string';

import { login } from './login';
import { register } from './register';
import { updateUserInfo, getUserInfo, getUserInfoById } from './userInfo';
import { getUserList } from './userList';
import { getMsgList } from './chat';

// 与后端的一种接口约定
export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
}

export {
  axios,
  queryString,
  login,
  register,
  updateUserInfo,
  getUserInfo,
  getUserInfoById,
  getUserList,
  getMsgList
};
