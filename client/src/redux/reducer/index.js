import { combineReducers } from 'redux';

import memoriesReducer from './memoriesReducer';

export default combineReducers({
  memories: memoriesReducer
});
