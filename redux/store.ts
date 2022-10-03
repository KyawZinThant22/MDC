import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import userReducer from "./features/auth/user";
import alertReducer from "./features/model/alert";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
