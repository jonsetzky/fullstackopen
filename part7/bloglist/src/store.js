import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import bloglistReducer from "./reducers/bloglistReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    bloglist: bloglistReducer,
  },
});

export default store;
