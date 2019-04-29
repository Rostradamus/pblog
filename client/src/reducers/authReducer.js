import { AUTH_ACTION_TYPES, USER_ACTION_TYPES } from "Actions/actionTypes";

export default (state = null, action) => {
  switch (action.type) {
  case AUTH_ACTION_TYPES.LOGIN_REQUEST:
  case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
  case AUTH_ACTION_TYPES.LOGIN_FAILURE:
  case USER_ACTION_TYPES.REGISTER_REQUEST:
  case USER_ACTION_TYPES.REGISTER_SUCCESS:
  case USER_ACTION_TYPES.REGISTER_FAILURE: {
    return action.payload || null;
  }
  default:
    return state;
  }
};
