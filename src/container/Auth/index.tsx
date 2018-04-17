import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { action } from 'container/Login';
import { getUserInfo, ResponseData } from 'src/api';
interface Props {
  location?: {
    pathname: string;
  };
  onGetUserInfo?: (data: string) => void;
}
@(withRouter as any)
@(connect(null, {
  onGetUserInfo: action.authSuccess
}) as any)
export default class Auth extends React.Component<Props> {
  componentWillMount() {
    if (localStorage.getItem('hasLogined') !== 'true') {
      return;
    }
    const pathname = this.props.location.pathname;
    if (pathname === '/login' || pathname === '/register') {
      return;
    }
    getUserInfo(({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        this.props.onGetUserInfo(data.type);
        return;
      }
      if (msg) {
        Toast.fail(msg, 1);
      } else {
        Toast.fail('获取用户信息失败', 1);
      }
    });
  }
  render() {
    return null;
  }
}
