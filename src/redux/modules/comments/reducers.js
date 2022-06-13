import types from '../../../constants/action-types';

const defaultState = {
  data: [],
};

const map = {
  [types.COMMENTS_SET_DATA]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
  [types.DELETE_COMMENT]: (state, { payload }) => ({
    ...state,
    data: state.data.filter(({ id }) => id !== payload),
  }),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) =>
  (map[action.type] && map[action.type](state, action)) ||
  state ||
  defaultState;
