import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import { action as chatAction } from 'reducer/chat';
import { action as userAction } from 'reducer/user';

interface Props {
  history?: {
    push: (path: string) => void;
  };
  onLoadUserInfo?: (
    fail: (msg: string, duration?: number) => void,
    jump: (path: string) => void
  ) => void;
  onGetMsgList?: (fail: (msg: string, duration?: number) => void) => void;
  onRecMsg?: () => void;
}
@(withRouter as any)
@(connect(null, {
  onLoadUserInfo: userAction.loadUserInfo,
  onGetMsgList: chatAction.onGetMsgList,
  onRecMsg: chatAction.onRecMsg
}) as any)
export default class LoadInfo extends React.Component<Props> {
  // 注意：只执行一次
  componentDidMount() {
    this.props.onLoadUserInfo(Toast.fail, this.props.history.push);
    this.props.onGetMsgList(Toast.fail);
    this.props.onRecMsg();
  }
  render() {
    return null;
  }
}
