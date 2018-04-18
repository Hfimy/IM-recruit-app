import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import { NavBar, TabBar } from 'antd-mobile';
import { RootState } from 'src/reducer';

import BossList from 'container/BossList';
import ExpertList from 'container/ExpertList';
import BossInfo from 'container/BossInfo';
import ExpertInfo from 'container/ExpertInfo';
import Message from 'container/Message';

interface Props {
  userType: string;
  location: {
    pathname: string;
  };
}

const navList = [
  {
    path: '/boss/list',
    title: '职位列表',
    component: BossList
  },
  {
    path: '/expert/list',
    title: '候选人列表',
    component: ExpertList
  },
  {
    path: '/message',
    title: '聊天',
    component: Message
  },
  {
    path: '/boss/info',
    title: '个人中心',
    component: BossInfo
  },
  {
    path: '/expert/info',
    title: '个人中心',
    component: ExpertInfo
  }
];

export default class DashBoard extends React.Component<Props> {
  render() {
    if (localStorage.getItem('hasLogined') !== 'true') {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar>
          {/* {
            navList.find(item => item.path === this.props.location.pathname)
              .title
          } */}
        </NavBar>
        <TabBar>
          <TabBar.Item title="列表" />
          <TabBar.Item title="消息" />
          <TabBar.Item title="我" />
        </TabBar>
      </div>
    );
  }
}
