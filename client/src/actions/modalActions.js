import { MODAL_ACTION_TYPES } from "./actionTypes";

export default class ModalActions {
  static closeModal() {
    return dispatch => dispatch({
      type: MODAL_ACTION_TYPES.CLOSE_MODAL,
      payload: {content: ""}
    });
  }

  static openModal(content) {
    return dispatch => dispatch({
      type: MODAL_ACTION_TYPES.OPEN_MODAL,
      payload: {content: content}
    });
  }

  static changeContent(content) {
    return dispatch => dispatch({
      type: MODAL_ACTION_TYPES.CHANGE_CONTENT,
      payload: {content: content}
    });
  }
}
