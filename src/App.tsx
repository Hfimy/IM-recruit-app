import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { view as Login } from 'container/Login';
import { view as Register } from 'container/Register';
import { view as BossInfo } from 'container/BossInfo';
import { view as ExpertInfo } from 'container/ExpertInfo';

import store from './store';

import './interceptor';
import 'antd-mobile/dist/antd-mobile.css';

const HotApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
      <Route path="/boss/info" exact={true} component={BossInfo} />
      <Route path="/expert/info" exact={true} component={ExpertInfo} />
    </Switch>
  </BrowserRouter>
);

const HotContainer = hot(module)(HotApp);

const App = () => (
  <Provider store={store}>
    <HotContainer />
  </Provider>
);

export default App;
