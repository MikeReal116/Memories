import { combineReducers } from 'redux';

import memoriesReducer from './memoriesReducer';
import authReducer from './authReducer';

export default combineReducers({
  memories: memoriesReducer,
  auth: authReducer
});
