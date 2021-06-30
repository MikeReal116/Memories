import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer';

let composeEnhancers = compose;
const middlewares = [thunk];
const initialState = {
  memories: {
    memories: []
  }
};

if (process.env.NODE_ENV === 'development') {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true
    });
  }
}

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
