import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import { getUserInfo, ResponseData } from 'src/api';
import { loadUserSuccess } from 'reducer/user/action';
interface Props {
  location?: {
    pathname: string;
  };
  history?: {
    push: (path: string) => void;
  };
  onLoadUserSuccess?: (data: any) => void;
}
@(withRouter as any)
@(connect(null, {
  onLoadUserSuccess: loadUserSuccess
}) as any)
export default class Auth extends React.Component<Props> {
  componentDidMount() {
    const pathname = this.props.location.pathname;
    const pathList = ['/login', '/register'];
    if (pathList.indexOf(pathname) > -1) {
      return;
    }
    getUserInfo(({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        this.props.onLoadUserSuccess(data);
        return;
      }
      Toast.fail(msg);
      this.props.history.push('/login');
    });
  }
  render() {
    return null;
  }
}
