import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { view as Login } from 'container/Login';
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact={true} component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);
