import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { view as Login } from 'container/Login';

import store from './store';

const HotApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact={true} component={Login} />
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
