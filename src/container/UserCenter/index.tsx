import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';

import { action } from 'reducer/user';

import cookies from 'browser-cookies';
const cookieToKeep = 'FirstName';
const allCookies = cookies.all();

interface Props {
  history: {
    push: (path: string) => void;
  };
  onLogout: () => void;
}

@(connect(null, {
  onLogout: action.logout
}) as any)
export default class UserCenter extends React.Component<Props> {
  logout = () => {
    for (let cookieName of Object.keys(allCookies)) {
      if (cookieName !== cookieToKeep) {
        cookies.erase(cookieName);
      }
    }
    this.props.onLogout();
    this.props.history.push('/login');
  };
  render() {
    return (
      <div>
        <Button onClick={this.logout}>退出</Button>
      </div>
    );
  }
}
