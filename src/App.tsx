import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { view as Login } from 'container/Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact={true} component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
