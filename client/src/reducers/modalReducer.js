import { MODAL_ACTION_TYPES } from "Actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
  case MODAL_ACTION_TYPES.CLOSE_MODAL: {
    return Object.assign({... state}, {isModalOpen: false}, action.payload);
  }
  case MODAL_ACTION_TYPES.OPEN_MODAL: {
    return Object.assign({... state}, {isModalOpen: true}, action.payload);
  }
  case MODAL_ACTION_TYPES.CHANGE_CONTENT: {
    return Object.assign({... state}, action.payload);
  }
  default:
    return state;
  }
};
