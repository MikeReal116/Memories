import axios from '../../axios/axios';
import {
  DELETE_MEMORY,
  GET_MEMORIES,
  GOOGLE_AUTH,
  LOGOUT,
  POST_MEMORY,
  UPDATE_MEMORY
} from './types';

export const PostMemory = (memories) => async (dispatch) => {
  try {
    const { data } = await axios.post('/memories', memories);
    dispatch({ type: POST_MEMORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getMemories = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/memories');
    dispatch({ type: GET_MEMORIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateMemory = (id, update) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/memories/${id}`, update);
    dispatch({ type: UPDATE_MEMORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMemory = (id) => async (dispatch) => {
  try {
    await axios.delete(`/memories/${id}`);
    dispatch({ type: DELETE_MEMORY, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const gooleLogin = (data) => {
  return {
    type: GOOGLE_AUTH,
    payload: data
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
