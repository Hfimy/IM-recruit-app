import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect,Switch,Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { RootState } from 'src/reducer';

interface Props {
  userType: string;
  location: {
    pathname: string;
  };
}

const navList = [
  {
    path: '/boss/list',
    title: '职位列表'
  },
  {
    path: '/expert/lig',
    title: '候选人列表'
  }
];
@(connect(({ user }: RootState) => ({ userType: user.type })) as any)
export default class Dashboard extends React.Component<Props> {
  render() {
    if (localStorage.getItem('hasLogined') !== 'true') {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar>
          {navList.find(item => item.path === this.props.location.pathname)}
        </NavBar>
        <Switch>
            <Route path='/boss/list'></Route>
        </Switch>
      </div>
    );
  }
}
