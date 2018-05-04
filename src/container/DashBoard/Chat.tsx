import * as React from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Toast, List, TextareaItem } from 'antd-mobile';

import { RootState } from 'src/reducer';
import { UserState } from 'reducer/user';
import { action, ChatState } from 'reducer/chat';

import { getStringLength } from 'src/util';

interface Msg {
  from: string;
  to: string;
  content: string;
}

interface Props {
  match: {
    params: {
      id: string;
    };
  };
  history: {
    goBack: () => void;
  };
  location: {
    state: any;
  };
  user: UserState;
  chat: ChatState;
  onSendMsg: ({ from, to, content }: Msg) => void;
}
interface State {
  text: string;
}

@(connect(
  (state: RootState) => ({
    user: state.user,
    chat: state.chat
  }),
  {
    onSendMsg: action.onSendMsg
  }
) as any)
export default class Chat extends React.Component<Props, State> {
  state = {
    text: ''
  };
  goBack = () => {
    this.props.history.goBack();
  };
  handleChange = e => {
    this.setState({ text: e.target.value });
  };
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  };
  handleClick = () => {
    if (!this.state.text) {
      return;
    }
    const from = this.props.user._id;
    // console.log(from);
    const to = this.props.match.params.id;
    // console.log('to', to);
    const content = this.state.text;
    this.props.onSendMsg({ from, to, content });
    this.setState({ text: '' });
  };
  render() {
    return (
      <div className="chat-page">
        <NavBar icon={<Icon type="left" onClick={this.goBack} />}>
          {this.props.location.state.user}
        </NavBar>
        <div className="chat-list">
          {this.props.chat.msgList.map(item => {
            return item.from === this.props.user._id ? (
              <List key={item._id} className="from-me">
                <TextareaItem
                  title={
                    <span className="img-wrapper">
                      <img src={this.props.user.avatar} alt="" />
                    </span>
                  }
                  className={getStringLength(item.content) < 30 ? 'ta-r' : ''}
                  autoHeight={true}
                  value={`我发的${item.content}`}
                />
              </List>
            ) : (
              <List key={item._id}>
                <TextareaItem
                  title={
                    <span className="img-wrapper">
                      <img src={this.props.location.state.avatar} alt="" />
                    </span>
                  }
                  autoHeight={true}
                  value={`你发的${item.content}`}
                />
              </List>
            );
          })}
        </div>
        <div className="bottom-input">
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
          <span onClick={this.handleClick}>发送</span>
        </div>
      </div>
    );
  }
}
