import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

/**
 * @typedef {{
 *    username: string,
 *    name: string,
 *    blogs: import("./bloglistReducer.js").BloglistState,
 *    id: string,
 *  }} User
 * @typedef {User[]} UsersState
 */
/**
 * @type {UsersState}
 */
const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /**
     * @param {UsersState} state
     * @param {{payload: User[]}} action
     */
    setAll(state, action) {
      return action.payload;
    },

    /**
     * sets a user based on its id
     * @param {UsersState} state
     * @param {{payload: User}} action
     */
    set(state, action) {
      const newUser = action.payload;
      return [...state].map((u) => (u.id === newUser.id ? newUser : u));
    },

    /**
     * @param {UsersState} state
     * @param {{payload: string}} action payload is user's id
     */
    del(state, action) {
      const delUser = action.payload;
      return [...state].filter((u) => u.id !== delUser.id);
    },
  },
});

const { setAll } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const newUsers = await usersService.getAll();
    console.log("initialized users with", newUsers);
    dispatch(setAll(newUsers));
  };
};

export default usersSlice.reducer;
