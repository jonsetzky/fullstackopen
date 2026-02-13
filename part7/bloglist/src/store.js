import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import bloglistReducer from "./reducers/bloglistReducer";
import localUserReducer from "./reducers/localUserReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    bloglist: bloglistReducer,
    localUser: localUserReducer,
    users: usersReducer,
  },
});

export default store;
