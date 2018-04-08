import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducer';

const storeEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(reducer, {}, storeEnhancer);
