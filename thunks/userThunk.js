import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  httpRegisterUser,
  httpLoginUser,
  httpMeUser,
  httpGetUser,
} from "../requests/auth";

import {
  clearUserInfoFromLocalStorage,
  setupUserInfoToLocalStorage,
} from "../utils/localStorageUtils/userInfo";

const createRequest = async (jwt, loginData) => {
  if (jwt && !(loginData?.identifier && loginData?.password)) {
    return await httpMeUser(jwt);
  }
  if (loginData?.identifier && loginData?.password) {
    return await httpLoginUser(loginData);
  }

  throw Error("Invalid login request!");
};

// Creating a thunk
export const registration = createAsyncThunk(
  "user/registration",
  async (data, { rejectWithValue }) => {
    try {
      const response = await httpRegisterUser(data);

      if (response.status < 200 || response.status >= 300) {
        clearUserInfoFromLocalStorage();
        return rejectWithValue(data);
      }
      setupUserInfoToLocalStorage(response?.data);
      return response?.data;
    } catch (error) {
      clearUserInfoFromLocalStorage();
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    const jwt = localStorage?.getItem("jwt");
    try {
      const response = await createRequest(jwt, loginData);
      if (response.status < 200 || response.status >= 300) {
        clearUserInfoFromLocalStorage();
        return rejectWithValue(response?.data);
      }

      const result = jwt
        ? {
            jwt,
            user: {
              ...response?.data?.user,
            },
          }
        : response?.data;

      setupUserInfoToLocalStorage(result);

      return result;
    } catch (error) {
      clearUserInfoFromLocalStorage();
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () =>
  clearUserInfoFromLocalStorage()
);

export const users = createAsyncThunk("user/users", async () => {
  return await httpGetUser();
});
