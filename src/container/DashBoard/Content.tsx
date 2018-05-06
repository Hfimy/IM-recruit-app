import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, TabBar, Toast } from 'antd-mobile';

import BossList from 'container/BossList';
import ExpertList from 'container/ExpertList';
import ChatList from 'container/ChatList';
import UserCenter from 'container/UserCenter';

import { RootState } from 'src/reducer';

// import styled from 'styled-components';
// const Div = styled.div`
//   margin-top: 20px;
// `;
interface Props {
  userId: string;
  userType: string;
  msgList: Array<any>;
  location: {
    pathname: string;
  };
  history: {
    push: (path: string) => void;
  };
}

@(connect(({ user, chat }: RootState) => ({
  userId: user._id,
  userType: user.type,
  msgList: chat.msgList
})) as any)
export default class Content extends React.Component<Props> {
  render() {
    const {
      userType,
      location: { pathname }
    } = this.props;
    const navList = [
      {
        path: '/expert',
        title: '牛人列表',
        text: '牛人',
        icon: 'expert',
        component: ExpertList,
        hide: userType === 'expert'
      },
      {
        path: '/boss',
        title: 'Boss列表',
        text: '职位',
        icon: 'boss',
        component: BossList,
        hide: userType === 'boss'
      },
      {
        path: '/chat',
        title: '聊天',
        text: '消息',
        icon: 'msg',
        component: ChatList
      },
      {
        path: '/usercenter',
        title: '个人中心',
        text: '我的',
        icon: 'user',
        component: UserCenter
      }
    ];
    const current = navList.find(item => item.path === pathname);
    const showNavList = navList.filter(item => item.hide !== true);

    const unread = this.props.msgList.filter(
      item => item.to === this.props.userId && !item.read
    ).length;

    return (
      <div>
        <NavBar mode="dark">{current && current.title}</NavBar>
        <div>
          <Switch>
            {/* 这里使用数组的下标作为key值是错误的 */}
            {showNavList.map(item => (
              <Route
                key={item.path}
                path={item.path}
                exact={true}
                component={item.component}
              />
            ))}
            <Redirect to="/404" />
          </Switch>
        </div>
        <TabBar>
          {showNavList.map((item, key) => (
            <TabBar.Item
              key={item.path}
              title={item.text}
              badge={item.path === '/chat' ? unread : 0}
              icon={{ uri: require(`../../../public/image/${item.icon}.png`) }}
              selected={item.path === pathname}
              selectedIcon={{
                uri: require(`../../../public/image/${item.icon}-active.png`)
              }}
              onPress={() => this.props.history.push(item.path)}
            />
          ))}
        </TabBar>
      </div>
    );
  }
}
