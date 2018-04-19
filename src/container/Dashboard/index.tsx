import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoadInfo from './LoadInfo';
import UserInfo from './UserInfo';
import Content from './Content';

export default class DashBoard extends React.Component {
  render() {
    return (
      <div>
        <LoadInfo />
        <Switch>
          <Route path="/userinfo" exact={true} component={UserInfo} />
          <Route component={Content} />
        </Switch>
      </div>
    );
  }
}
