import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { RootReducer } from './reducer';

const storeEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const configureStore = () => {
  const store = createStore(RootReducer, {}, storeEnhancer);
  return store;
};
