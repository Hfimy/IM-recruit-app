import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { view as Login } from 'container/Login';
import { view as Register } from 'container/Register';

import store from './store';

import './interceptor';
import 'antd-mobile/dist/antd-mobile.css';

const HotApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
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
