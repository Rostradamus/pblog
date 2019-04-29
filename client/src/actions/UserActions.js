import { USER_ACTION_TYPES } from "./actionTypes";
import axios from "axios";

export default class UserActions {
  static register(oBody) {
    return async dispatch => {
      let res;
      dispatch(this._requestRegister(oBody));
      try {
        res = await axios.post("/api/users", oBody);
        dispatch(this._resolveRegister(res.data));
      } catch (err) {
        dispatch(this._failRegister(err));
        // TODO: shouldn't use err.response.data, instead should use e.message
        throw new Error(err.response.data.errmsg);
      }
    };
  }

  static _requestRegister(data) {
    return { type: USER_ACTION_TYPES.REGISTER_REQUEST, payload: data };
  }

  static _resolveRegister(user) {
    return { type: USER_ACTION_TYPES.REGISTER_SUCCESS, payload: user };
  }

  static _failRegister(error) {
    return { type: USER_ACTION_TYPES.REGISTER_FAILURE, payload: error };
  }
}
