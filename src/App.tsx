import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import { BrowserRouter } from 'react-router-dom';

import { configureStore } from './store';
const store = configureStore();

import AppCommon from './AppCommon';

const AppContainer = () => (
  <BrowserRouter>
    <AppCommon />
  </BrowserRouter>
);

const HotApp = hot(module)(AppContainer);

const App = () => (
  <Provider store={store}>
    <HotApp />
  </Provider>
);

export default App;
