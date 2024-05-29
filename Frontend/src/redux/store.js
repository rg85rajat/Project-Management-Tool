import { configureStore } from "@reduxjs/toolkit";
import { taskSlice, userSlice } from "./reducer";

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
