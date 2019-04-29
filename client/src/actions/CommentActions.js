import { COMMENT_ACTION_TYPES } from "./actionTypes";
import axios from "axios";

export default class CommentActions {
  static addComment(postId, data) {
    return async dispatch => {
      dispatch({
        type: COMMENT_ACTION_TYPES.ADD_REQUEST,
        payload: {
          isFetching: true
        }
      });
      try {
        await axios.post(`/api/posts/${postId}/comments`, data);
        const newItems = (await axios.get(`/api/posts/${postId}/comments`)).data;
        dispatch({
          type: COMMENT_ACTION_TYPES.ADD_SUCCESS,
          payload: {
            items: newItems
          }
        });
      } catch (err) {
        dispatch({
          type: COMMENT_ACTION_TYPES.ADD_FAILURE,
          payload: {
            error: err.message
          }
        });
      }
    };
  }

  static deleteComment(postId, commentId) {
    return async dispatch => {
      dispatch({
        type: COMMENT_ACTION_TYPES.DELETE_REQUEST,
        payload: {
          isFetching: true
        }
      });
      try {
        await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
          validateStatus: status => status === 204
        });
        dispatch({
          type: COMMENT_ACTION_TYPES.DELETE_SUCCESS
        });
      } catch (err) {
        dispatch({
          type: COMMENT_ACTION_TYPES.DELETE_FAILURE,
          payload: {
            error: err.message
          }
        });
      }
    };
  }

  // static getComment() {

  // }

  static getComments(postId) {
    return async dispatch => {
      let res;
      dispatch({
        type: COMMENT_ACTION_TYPES.FETCH_REQUEST,
        payload: {
          isFetching: true
        }
      });
      try {
        res = await axios.get(`/api/posts/${postId}/comments`);
        dispatch({
          type: COMMENT_ACTION_TYPES.FETCH_SUCCESS,
          payload: {
            items: res.data
          }
        });
      } catch (err) {
        dispatch({
          type: COMMENT_ACTION_TYPES.FETCH_FAILURE,
          payload: {
            error: err.message
          }
        });
      }
    };
  }
}
