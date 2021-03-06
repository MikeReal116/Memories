import {
  DELETE_MEMORY,
  GET_MEMORIES,
  POST_MEMORY,
  UPDATE_MEMORY,
  LIKE,
  GET_MEMORIES_BY_SEARCH,
  LOADING,
  FINISH_LOADING,
  GET_MEMORY
} from '../action/types';

const initialState = {
  memories: [],
  loading: false
};

const memoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case FINISH_LOADING:
      return { ...state, loading: false };
    case GET_MEMORIES:
      return { ...state, memories: action.payload };
    case GET_MEMORY: {
      return { ...state, memory: action.payload };
    }
    case GET_MEMORIES_BY_SEARCH:
      return { ...state, memories: action.payload };
    case POST_MEMORY:
      return { ...state, memories: [...state.memories, action.payload] };
    case UPDATE_MEMORY:
      return {
        ...state,
        memories: state.memories.map((memory) =>
          memory._id === action.payload._id ? action.payload : memory
        )
      };
    case DELETE_MEMORY:
      return {
        ...state,
        memories: state.memories.filter(
          (memory) => memory._id !== action.payload
        )
      };
    case LIKE:
      return {
        ...state,
        memories: state.memories.map((memory) =>
          memory._id === action.payload._id ? action.payload : memory
        )
      };
    default:
      return state;
  }
};

export default memoriesReducer;
