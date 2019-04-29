import { POST_ACTION_TYPES } from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  items: [],
  selected: {},
  err: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case POST_ACTION_TYPES.FETCH_REQUEST:
  case POST_ACTION_TYPES.ADD_REQUEST:
  case POST_ACTION_TYPES.EDIT_REQUEST:
  case POST_ACTION_TYPES.DELETE_REQUEST: {
    return Object.assign({...state}, {isFetching: true}, action.payload);
  }
  case POST_ACTION_TYPES.FETCH_SUCCESS:
  case POST_ACTION_TYPES.FETCH_FAILURE:
  case POST_ACTION_TYPES.ADD_FAILURE:
  case POST_ACTION_TYPES.EDIT_FAILURE:
  case POST_ACTION_TYPES.DELETE_SUCCESS:
  case POST_ACTION_TYPES.DELETE_FAILURE: {
    return Object.assign({...state}, {isFetching: false}, action.payload);
  }
  case POST_ACTION_TYPES.ADD_SUCCESS:
  case POST_ACTION_TYPES.EDIT_SUCCESS: {
    const selected = Object.assign({...action.payload}, { bIsAuthor: true });
    return Object.assign({...state}, { isFetching: false }, { selected });
  }
  default:
    return state;
  }
};
