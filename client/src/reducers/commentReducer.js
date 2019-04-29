import { COMMENT_ACTION_TYPES } from "Actions/actionTypes";

const initialState = {
  isFetching: false,
  items: [],
  err: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case COMMENT_ACTION_TYPES.FETCH_REQUEST:
  case COMMENT_ACTION_TYPES.ADD_REQUEST:
  case COMMENT_ACTION_TYPES.DELETE_REQUEST: {
    return Object.assign({... state}, {isFetching: true}, action.payload);
  }
  case COMMENT_ACTION_TYPES.FETCH_SUCCESS:
  case COMMENT_ACTION_TYPES.FETCH_FAILURE:
  case COMMENT_ACTION_TYPES.ADD_SUCCESS:
  case COMMENT_ACTION_TYPES.ADD_FAILURE:
  case COMMENT_ACTION_TYPES.DELETE_SUCCESS:
  case COMMENT_ACTION_TYPES.DELETE_FAILURE: {
    return Object.assign({... state}, {isFetching: false}, action.payload);
  }
  default:
    return state;
  }
};
