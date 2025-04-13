import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  showLoginSuccessToast,
  showLoginErrorToast,
  showRegisterSuccessToast,
  showRegisterErrorToast,
  showLogOutToast,
} from "../../utils/toasts";

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuthHeader(token);
      showRegisterSuccessToast();
      return response.data;
    } catch (error) {
      showRegisterErrorToast();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuthHeader(token);
      showLoginSuccessToast();
      return response.data;
    } catch (error) {
      showLoginErrorToast();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  await axios.post("/users/logout");
  localStorage.removeItem("token");
  setAuthHeader("");
  showLogOutToast();
});



export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }
      setAuthHeader(token);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => thunkAPI.getState().auth.token !== null,
  }
);


