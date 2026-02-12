import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import bloglistReducer from "./reducers/bloglistReducer";
import localUserReducer from "./reducers/localUserReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    bloglist: bloglistReducer,
    localUser: localUserReducer,
  },
});

export default store;
