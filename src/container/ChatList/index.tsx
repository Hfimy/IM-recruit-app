import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from 'src/reducer';
import { UserState } from 'reducer/user';

import ChatItem from './ChatItem';

import { getLastItem } from 'src/util';

interface Props {
  msgList: Array<any>;
  user: UserState;
}

@(connect((state: RootState) => ({
  msgList: state.chat.msgList,
  user: state.user
})) as any)
export default class ChatList extends React.Component<Props> {
  getChatItem = item => {
    const lastMsg = getLastItem(item);
    const userId =
      lastMsg.from === this.props.user._id ? lastMsg.to : lastMsg.from;
    const unread = item.filter(i => i.to === this.props.user._id && !i.read)
      .length;
    return { userId, content: lastMsg.content, unread };
  };
  render() {
    const msgGroup = {};
    for (let item of this.props.msgList) {
      msgGroup[item.chatId] = msgGroup[item.chatId] || [];
      msgGroup[item.chatId].push(item);
    }
    // 注意按照创建时间对消息列表进行排序
    const chatList: Array<any> = Object.values(msgGroup).sort(
      (a: any, b: any) => {
        const aLast = getLastItem(a);
        const bLast = getLastItem(b);
        return bLast.create_time - aLast.create_time;
      }
    );
    const renderChatList: Array<any> = chatList.map(item =>
      this.getChatItem(item)
    );
    return (
      <div className="chatlist-page">
        {renderChatList.map(item => (
          <ChatItem
            key={item.userId}
            userId={item.userId}
            content={item.content}
            unread={item.unread}
          />
        ))}
      </div>
    );
  }
}
