import { createSlice } from "@reduxjs/toolkit";

const initialState = "test notification";

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

export const setNotification = (message, timeout) => {
  return async (dispatch, getState) => {
    dispatch(_setNotification(message));

    return new Promise((resolve) => setTimeout(resolve, timeout * 1000)).then(
      () => {
        if (Object.is(getState().notification, message)) {
          dispatch(_removeNotification());
        }
      },
    );
  };
};
export default notificationSlice.reducer;
