import * as React from 'react';
import { connect } from 'react-redux';
import Logo from 'component/Logo';

import { loginSuccess, loginFail } from './action';
import { RootState } from 'src/reducer';
// const mapStateToProps = ({ user }) => ({
//   user: user.user,
//   msg: user.msg
// });

// const mapDispatchToProps = (dispatch: Dispatch<LoginType>) => ({
//   onLoginSuccess: () => dispatch(loginSuccess()),
//   onLoginFail: () => dispatch(loginFail())
// });
// const mapDispatchToProps = {
//   onLoginSuccess: loginSuccess,
//   onLoginFail: loginFail
// };
// interface RootState {
//   user: {
//     user?: string;
//     msg?: string;
//   };
// }
interface Props {
  user?: string;
  msg?: string;
  onLoginSuccess?: () => void;
  onLoginFail?: () => void;
}

@(connect(
  ({ user }: RootState) => ({
    user: user.user,
    msg: user.msg
  }),
  {
    onLoginSuccess: loginSuccess,
    onLoginFail: loginFail
  }
) as any)
export default class Login extends React.Component<Props> {
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
