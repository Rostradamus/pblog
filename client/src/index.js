import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import App from "./components/App";
import reducers from "./reducers";
import "./index.less";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { AUTH_ACTION_TYPES } from "./actions/actionTypes";
window.axios = axios;

const middlewares = process.env.NODE_ENV !== "production" ? [reduxThunk, logger] : [reduxThunk];
const store = createStore(reducers, {}, applyMiddleware(...middlewares));

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch({
        type: AUTH_ACTION_TYPES.SESSION_EXPIRED,
        payload: {}
      });
    }

    return Promise.reject(error);
  });

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector("#root")
);
