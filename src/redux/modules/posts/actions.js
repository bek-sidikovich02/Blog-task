import types from '../../../constants/action-types';

export const setPostData = (payload) => ({
  type: types.POSTS_SET_DATA,
  payload,
});

export const clearState = () => ({
  type: types.CLEAR_STATE,
});

export const deletePost = (id) => ({
  type: types.DELETE_POST,
  payload: Number(id),
});
export const addPost = (payload) => ({
  type: types.ADD_POST,
  payload,
});
export const activePost = (payload) => ({
  type: types.ACTIVE_POST,
  payload,
});
