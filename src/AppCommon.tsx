import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from 'container/Login';
import Register from 'container/Register';
import DashBoard from 'container/DashBoard';

// 抽离出来可供服务端引入便于实现服务端渲染
export default function AppCommon() {
  return (
    <Switch>
      <Route path="/login" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
      <Route component={DashBoard} />
    </Switch>
  );
}
