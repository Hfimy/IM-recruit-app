import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Toast,
  List,
  Radio
} from 'antd-mobile';
const RadioItem = Radio.RadioItem;

import Logo from 'component/Logo';

import { register } from 'api/index';

interface Props {
  history: {
    push: (path: string) => void;
  };
}
enum Type {
  Boss = 'boss',
  Expert = 'expert'
}
interface State {
  user: string;
  pwd: string;
  confirmPwd: string;
  type: Type;
}

@(withRouter as any)
export default class Register extends React.Component<Props, State> {
  state = {
    user: '',
    pwd: '',
    confirmPwd: '',
    type: Type.Boss
  };
  onChange = (type, value: string) => {
    this.setState({ [type]: value.trim() });
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      this.onRegister();
    }
  };
  onRegister = () => {
    if (!this.checkBefore(this.state)) {
      return;
    }
    const { user, pwd, type } = this.state;
    register({ user, pwd, type }, ({ code, data, msg }) => {
      if (code === 0) {
        Toast.success('注册成功', 1);
        this.props.history.push(`/${type}/info`);
        return;
      }
      if (msg) {
        Toast.fail(msg, 1);
      } else {
        Toast.fail('注册失败', 1);
      }
    });
  };
  checkBefore = ({ user, pwd, confirmPwd }): boolean => {
    if (!user) {
      Toast.info('用户名不能为空', 1);
      return false;
    }
    if (!pwd) {
      Toast.info('密码不能为空', 1);
      return false;
    }
    if (!confirmPwd) {
      Toast.info('请确认密码', 1);
      return false;
    }
    if (pwd !== confirmPwd) {
      Toast.info('两次输入的密码不一致', 1);
      return false;
    }
    return true;
  };
  render() {
    const { type } = this.state;
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
          <InputItem
            type="password"
            placeholder="请再次输入密码"
            onChange={value => this.onChange('confirmPwd', value)}
            onKeyUp={this.onKeyUp}
          >
            确认：
          </InputItem>
          <WhiteSpace />
          <List>
            <RadioItem
              checked={type === Type.Boss}
              onChange={() => this.onChange('type', Type.Boss)}
            >
              Boss
            </RadioItem>
            <RadioItem
              checked={type === Type.Expert}
              onChange={() => this.onChange('type', Type.Expert)}
            >
              牛人
            </RadioItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.onRegister}>
            点击注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
