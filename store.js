import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";

export const rootReducer = {
  user: userSlice.reducer,
};

export const storeCreator = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = storeCreator();
