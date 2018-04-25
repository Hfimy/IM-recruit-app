import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoadInfo from './LoadInfo';
import UserInfo from './UserInfo';
import Content from './Content';
import NotFound from 'src/component/NotFound';

export default class DashBoard extends React.Component {
  render() {
    return (
      <div>
        <LoadInfo />
        <Switch>
          <Route path="/userinfo" exact={true} component={UserInfo} />
          <Route path="/404" exact={true} component={NotFound} />
          <Route component={Content} />
        </Switch>
      </div>
    );
  }
}
