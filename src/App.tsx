import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from 'container/Auth';
import { view as Login } from 'container/Login'; // 内部定义了reducer
import Register from 'container/Register'; // 内部未定义reducer
import UserInfo from 'container/UserInfo';
import Dashboard from 'container/Dashboard';

import store from './store';

import './interceptor';
import 'antd-mobile/dist/antd-mobile.css';

const HotApp = () => (
  <BrowserRouter>
    <div>
      <Auth />
      <Switch>
        <Route path="/login" exact={true} component={Login} />
        <Route path="/register" exact={true} component={Register} />
        <Route path="/user/info" exact={true} component={UserInfo} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </div>
  </BrowserRouter>
);

const HotContainer = hot(module)(HotApp);

const App = () => (
  <Provider store={store}>
    <HotContainer />
  </Provider>
);

export default App;
