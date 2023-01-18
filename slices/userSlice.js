import { createSlice } from "@reduxjs/toolkit";

import { logout } from "../thunks/userThunk";

export const initialState = {
  jwt: "",
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => initialState);

    builder
      .addMatcher(
        (action) => /\/(login|registration)\/fulfilled$/.test(action.type),
        (state, { payload }) => {
          state.requestState = "fulfilled";
          state.jwt = payload?.jwt;
          state.username = payload?.user?.username;
          state.email = payload?.user?.email;
          state.error = undefined;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.requestState = "pending";
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          const payloadError = payload?.data?.message;
          state.error = payloadError;
          state.requestState = "rejected";
        }
      );
  },
});

export const { actions, reducer } = userSlice;
