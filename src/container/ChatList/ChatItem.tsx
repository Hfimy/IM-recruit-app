import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { List, Badge } from 'antd-mobile';
import { ResponseData, getUserInfoById } from 'src/api';

import styled from 'styled-components';
const Div = styled.div`
  height: 28px;
`;

interface Props {
  userId: string;
  content: string;
  unread: number;
  history?: {
    push: (param: string | object) => void;
  };
}
interface State {
  name: string;
  avatar: string;
}
@(withRouter as any)
export default class ChatItem extends React.PureComponent<Props, State> {
  _isMounted: boolean;
  state = {
    name: '',
    avatar: ''
  };
  componentDidMount() {
    this._isMounted = true;
    getUserInfoById(this.props.userId, ({ code, data }: ResponseData) => {
      if (code === 0) {
        if (this._isMounted) {
          this.setState({ name: data.user, avatar: data.avatar });
        }
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleClick = () => {
    this.props.history.push({
      pathname: `/chat/${this.props.userId}`,
      state: {
        user: this.state.name,
        avatar: this.state.avatar
      }
    });
  };
  render() {
    return (
      <List>
        <List.Item
          thumb={
            <span className="img-wrapper">
              {this.state.avatar && <img src={this.state.avatar} alt="" />}
            </span>
          }
          extra={<Badge text={this.props.unread} overflowCount={99} />}
          //   arrow="horizontal"
          onClick={this.handleClick}
        >
          <Div>{this.state.name && this.state.name}</Div>
          <List.Item.Brief>{this.props.content}</List.Item.Brief>
        </List.Item>
      </List>
    );
  }
}
