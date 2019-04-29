import { USER_ACTION_TYPES } from '../actions/actionTypes';

export default (state = null, action) => {
    switch (action.type) {
    case USER_ACTION_TYPES.REGISTER_REQUEST: {
        return action.payload || null;
    }
    case USER_ACTION_TYPES.REGISTER_SUCCESS: {
        return action.payload || null;
    }
    case USER_ACTION_TYPES.REGISTER_FAILURE: {
        return action.payload || null;
    }
    default:
        return state;
    }
};
