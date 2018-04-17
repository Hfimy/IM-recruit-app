import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { WingBlank, WhiteSpace, InputItem, Button, Toast } from 'antd-mobile';

import Logo from 'component/Logo';

import { ResponseData, login } from 'src/api';

import { authSuccess } from './action';

interface Props {
  history: {
    push: (path: string) => void;
  };
  onLoginSuccess: (data: string) => void;
}
interface State {
  user: string;
  pwd: string;
}

@(withRouter as any)
@(connect(null, {
  onLoginSuccess: authSuccess
}) as any)
export default class Login extends React.Component<Props, State> {
  state = {
    user: '',
    pwd: ''
  };
  onChange = (type, value: string) => {
    this.setState({ [type]: value.trim() });
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      this.onLogin();
    }
  };
  onLogin = () => {
    if (!this.checkBefore(this.state)) {
      return;
    }
    login(this.state, ({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        this.props.onLoginSuccess(data.type);
        localStorage.setItem('hasLogined', 'true');
        Toast.success('欢迎登录', 1);
        if (data.type === 'boss') {
          if (!data.intention || !data.company || !data.city) {
            this.props.history.push('/user/info');
          } else {
            this.props.history.push('/expert/list');
          }
        } else if (data.type === 'expert') {
          if (!data.intention || !data.city) {
            this.props.history.push('/user/info');
          } else {
            this.props.history.push('/boss/list');
          }
        }
        return;
      }
      if (msg) {
        Toast.fail(msg, 1);
      } else {
        Toast.fail('登录失败', 1);
      }
    });
  };
  checkBefore = ({ user, pwd }): boolean => {
    if (!user) {
      Toast.info('用户名不能为空', 1);
      return false;
    }
    if (!pwd) {
      Toast.info('密码不能为空', 1);
      return false;
    }
    return true;
  };
  skipToRegister = () => {
    this.props.history.push('/register');
  };
  render() {
    return (
      <div>
        <Logo />
        <WingBlank>
          <InputItem
            placeholder="请输入用户名"
            onChange={value => this.onChange('user', value)}
            onKeyUp={this.onKeyUp}
          >
            用户：
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            placeholder="请输入密码"
            onChange={value => this.onChange('pwd', value)}
            onKeyUp={this.onKeyUp}
          >
            密码：
          </InputItem>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button
            type="primary"
            // disabled={!this.checkBefore(this.state)}
            onClick={this.onLogin}
          >
            登录
          </Button>
          <WhiteSpace />
          <Button type="ghost" onClick={this.skipToRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
