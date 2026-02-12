import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";

/**
 * @type {{id:string, name: string, token: string, username: string}|null}
 */
const initialState = null;

const localUserSlice = createSlice({
  name: "localUser",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear() {
      return null;
    },
  },
});

const { set, clear } = localUserSlice.actions;

export const reloadSession = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(set(user));
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password);
    window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
    return await dispatch(set(user));
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogUser");
    return dispatch(clear());
  };
};

export default localUserSlice.reducer;
