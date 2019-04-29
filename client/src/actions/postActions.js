import { POST_ACTION_TYPES } from "./actionTypes";
import axios from "axios";

export default class PostActions {
  static fetchPosts() {
    return async dispatch => {
      let res;
      dispatch({
        type: POST_ACTION_TYPES.FETCH_REQUEST,
        payload: {
          isFetching: true
        }
      });
      try {
        res = await axios.get("/api/posts");
        dispatch({
          type: POST_ACTION_TYPES.FETCH_SUCCESS,
          payload: {
            isFetching: false,
            items: res.data
          }
        });
      } catch (err) {
        dispatch({
          type: POST_ACTION_TYPES.FETCH_FAILURE,
          payload: {
            isFetching: false,
            error: err.message
          }
        });
      }
    };
  }

  static selectPost(postId) {
    return async dispatch => {
      let res;
      dispatch({
        type: POST_ACTION_TYPES.FETCH_REQUEST,
        payload: {
          isFetching: true,
          selected: {
            _id: postId
          }
        }
      });
      try {
        res = await axios.get(`/api/posts/${postId}`);
        return dispatch({
          type: POST_ACTION_TYPES.FETCH_SUCCESS,
          payload: {
            isFetching: false,
            selected: res.data
          }
        });
      } catch (err) {
        dispatch({
          type: POST_ACTION_TYPES.FETCH_FAILURE,
          payload: {
            isFetching: false,
            error: err.message
          }
        });
      }
    };
  }

  static createPost(data, history) {
    return async dispatch => {
      let res;
      dispatch({
        type: POST_ACTION_TYPES.ADD_REQUEST,
        payload: {
          isFetching: true
        }
      });
      try {
        res = await axios.post("/api/posts", data);
        dispatch({
          type: POST_ACTION_TYPES.ADD_SUCCESS,
          payload: {
            selected: res.data
          }
        });
        // window.location = "/post/detail/" + res.data._id;
        history.push(`/post/detail/${res.data._id}`);
      } catch (err) {
        dispatch({
          type: POST_ACTION_TYPES.ADD_FAILURE,
          payload: {
            error: err.message
          }
        });
        alert(err);
      }
    };
  }

  static editPost(data, history) {
    return async dispatch => {
      let res;
      dispatch({
        type: POST_ACTION_TYPES.EDIT_REQUEST,
        payload: {
          isFetching: true
        }
      });
      try {
        res = await axios.put("/api/posts", data);
        dispatch({
          type: POST_ACTION_TYPES.EDIT_SUCCESS,
          payload: {
            selected: res.data
          }
        });
        history.push(`/post/detail/${res.data._id}`);
      } catch (err) {
        dispatch({
          type: POST_ACTION_TYPES.EDIT_FAILURE,
          payload: {
            error: err.message
          }
        });
        alert(err);
      }
    };
  }

  static deletePost(postId, history) {
    return async dispatch => {
      dispatch({
        type: POST_ACTION_TYPES.DELETE_REQUEST,
        payload: {
          isFetching: true
        }
      });
      try {
        await axios.delete(`/api/posts/${postId}`, {
          validateStatus: status => status === 204
        });
        dispatch({
          type: POST_ACTION_TYPES.DELETE_SUCCESS,
          payload: {
            selected: {}
          }
        });
        history.push("/post/list/");
      } catch (err) {
        dispatch({
          type: POST_ACTION_TYPES.DELETE_FAILURE,
          payload: {
            error: err.message
          }
        });
        alert(err);
      }
    };
  }
}
