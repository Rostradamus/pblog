import { AUTH_ACTION_TYPES } from "./actionTypes";
import axios from "axios";

export default class AuthActions {
  static fetchUserSession() {
    return async dispatch => {
      let res;
      dispatch(_requestLogin(res));
      try {
        res = await axios.get("/api/user/session");
        dispatch(_resolveLogin(res.data));
      } catch (err) {
        dispatch(_failLogin(err));
      }
    };
  }

  static login(data) {
    return async dispatch => {
      let res;
      dispatch(_requestLogin({ email: data.email }));
      try {
        res = await axios.post("/api/user/session", data);
        dispatch(_resolveLogin(res.data));
      } catch (err) {
        dispatch(_failLogin(err));
        // TODO: shouldn't be hardcoded here in the front-end
        throw new Error("Please check your email address or password");
      }
    };
  }

  static logout() {
    return async dispatch => {
      dispatch(_requestLogout());
      try {
        await axios.delete("/api/user/session");
        dispatch(_resolveLogout());
      } catch (err) {
        dispatch(_failLogout());
        // TODO: shouldn't be hardcoded here in the front-end
        throw new Error("Please check your email address or password");
      }
    };
  }
}
function _requestLogin(data) {
  return { type: AUTH_ACTION_TYPES.LOGIN_REQUEST, payload: data };
}

function _resolveLogin(user) {
  return { type: AUTH_ACTION_TYPES.LOGIN_SUCCESS, payload: user };
}

function _failLogin() {
  return { type: AUTH_ACTION_TYPES.LOGIN_FAILURE, payload: {} };
}

function _requestLogout() {
  return { type: AUTH_ACTION_TYPES.LOGOUT_REQUEST, payload: {}};
}

function _resolveLogout() {
  return { type: AUTH_ACTION_TYPES.LOGOUT_SUCCESS, payload: {}};
}

function _failLogout() {
  return { type: AUTH_ACTION_TYPES.LOGOUT_FAILURE, payload: {}};
}
