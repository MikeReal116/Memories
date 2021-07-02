import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer';

let composeEnhancers = compose;
const middlewares = [thunk];

const loadFromLocal = () => {
  try {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setToLocal = (state) => {
  try {
    const profile = JSON.stringify(state);
    localStorage.setItem('profile', profile);
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  memories: {
    memories: []
  },
  auth: {
    user: loadFromLocal()
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

store.subscribe(() => setToLocal(store.getState().auth.user));

export default store;
