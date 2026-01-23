import {
  removeNotification,
  setNotification,
} from "./reducers/notificationReducer";

let timeout = null;

export const showNotification = (dispatch, message) => {
  clearTimeout(timeout);

  dispatch(setNotification(message));

  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);
};
