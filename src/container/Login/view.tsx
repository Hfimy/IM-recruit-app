import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Logo from 'component/Logo';

import { loginSuccess, loginFail, LoginType } from './action';
import { UserState } from './reducer';

const mapStateToProps = ({ user }) => ({
  user: user.user,
  msg: user.msg
});

const mapDispatchToProps = (dispatch: Dispatch<LoginType>) => ({
  onLoginSuccess: () => dispatch(loginSuccess({ user: 'h' })),
  onLoginFail: () => dispatch(loginFail('err'))
});

interface Props {
  user?: string;
  msg?: string;
  onLoginSuccess?: () => void;
  onLoginFail?: () => void;
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Login extends React.Component<Props, object> {
  render() {
    const { user, msg, onLoginSuccess, onLoginFail } = this.props;
    return (
      <div>
        <h3>{user}</h3>
        <h3>{msg}</h3>
        <Logo />
      </div>
    );
  }
}
