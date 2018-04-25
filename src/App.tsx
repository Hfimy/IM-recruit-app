import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from 'container/Login';
import Register from 'container/Register';
import DashBoard from 'container/DashBoard';

import store from './store';

const HotApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
      <Route component={DashBoard} />
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
