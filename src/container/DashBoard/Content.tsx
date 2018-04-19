import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, TabBar } from 'antd-mobile';

import BossList from 'container/BossList';
import ExpertList from 'container/ExpertList';
import Message from 'container/Message';
import UserCenter from 'container/UserCenter';
import NotFound from 'component/NotFound';

import { RootState } from 'src/reducer';

interface Props {
  userType: string;
  location: {
    pathname: string;
  };
  history: {
    push: (path: string) => void;
  };
}

@(connect(({ user }: RootState) => ({ userType: user.type })) as any)
export default class Content extends React.Component<Props> {
  render() {
    const {
      userType,
      location: { pathname }
    } = this.props;
    const navList = [
      {
        path: '/boss',
        title: 'Boss列表',
        text: '职位',
        icon: 'boss',
        component: BossList,
        hide: userType === 'boss'
      },
      {
        path: '/expert',
        title: '牛人列表',
        text: '牛人',
        icon: 'expert',
        component: ExpertList,
        hide: userType === 'expert'
      },
      {
        path: '/message',
        title: '聊天',
        text: '消息',
        icon: 'msg',
        component: Message
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
    return (
      <div>
        <NavBar mode="dark">{current && current.title}</NavBar>
        <div>content</div>
        <TabBar>
          {showNavList.map((item, key) => (
            <TabBar.Item
              key={key}
              title={item.text}
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
