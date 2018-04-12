import axios from 'axios';
import { Toast } from 'antd-mobile';

axios.interceptors.request.use(config => {
  Toast.loading('Loading ...', 0);
  return config;
});

axios.interceptors.response.use(response => {
  Toast.hide();
  return response;
});
