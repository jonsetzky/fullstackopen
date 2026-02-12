import { createSlice } from "@reduxjs/toolkit";

/**
 * @type {{message: string, isError: boolean}|null}
 */
const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    _setNotification(state, action) {
      return action.payload;
    },
    _removeNotification() {
      return null;
    },
  },
});

const { _setNotification, _removeNotification } = notificationSlice.actions;

export const setNotification = (message, timeout = 5000, isError = false) => {
  return async (dispatch, getState) => {
    dispatch(_setNotification({ message, isError }));

    return new Promise((resolve) => setTimeout(resolve, timeout)).then(() => {
      if (Object.is(getState().notification.message, message)) {
        dispatch(_removeNotification());
      }
    });
  };
};
export default notificationSlice.reducer;
