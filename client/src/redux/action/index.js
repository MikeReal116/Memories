import axios from '../../axios/axios';
import {
  DELETE_MEMORY,
  GET_MEMORIES,
  AUTH,
  LOGOUT,
  POST_MEMORY,
  UPDATE_MEMORY,
  LIKE
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

export const signup = (values, history) => async (dispatch) => {
  try {
    const { data } = await axios.post('/user/signup', values);
    dispatch({ type: AUTH, payload: data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const login = (values, history) => async (dispatch) => {
  try {
    const { data } = await axios.post('user/login', values);
    dispatch({ type: AUTH, payload: data });
    history.push('/');
  } catch (error) {}
};

export const googleLogin = (data) => {
  return {
    type: AUTH,
    payload: data
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const likeMemory = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/memories/${id}/like_memory`);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {}
};
