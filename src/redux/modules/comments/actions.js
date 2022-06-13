import types from '../../../constants/action-types';

export const setCommentData = (payload) => {
  console.log('Action: ', payload);
  return {
    type: types.COMMENTS_SET_DATA,
    payload,
  };
};

export const deleteComment = (id) => ({
  type: types.DELETE_COMMENT,
  payload: id,
});
