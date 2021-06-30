import axios from '../../axios/axios';
import { DELETE_MEMORY, GET_MEMORIES, POST_MEMORY } from './types';

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
    dispatch({ type: GET_MEMORIES, payload: data });
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
