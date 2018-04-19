import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import { action } from 'reducer/user';

interface Props {
  history?: {
    push: (path: string) => void;
  };
  onLoadUserInfo?: (
    fail: (msg: string, duration?: number) => void,
    jump: (path: string) => void
  ) => void;
}
@(withRouter as any)
@(connect(null, {
  onLoadUserInfo: action.loadUserInfo
}) as any)
export default class LoadInfo extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoadUserInfo(Toast.fail, this.props.history.push);
  }
  render() {
    return null;
  }
}
