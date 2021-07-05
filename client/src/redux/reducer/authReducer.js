import { AUTH, LOGOUT } from '../action/types';

const initialState = {
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
