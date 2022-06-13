import types from '../../../constants/action-types';

const defaultState = {
  data: [],
  activeID: undefined,
};

const map = {
  [types.POSTS_SET_DATA]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [types.ADD_POST]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  }),
  [types.ACTIVE_POST]: (state, { payload }) => ({
    ...state,
    activeID: payload,
  }),
  [types.CLEAR_STATE]: (state) => ({
    ...state,
    data: [],
  }),
  [types.DELETE_POST]: (state, { payload }) => ({
    ...state,
    data: state.data.filter(({ id }) => id !== payload),
  }),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) =>
  (map[action.type] && map[action.type](state, action)) ||
  state ||
  defaultState;
