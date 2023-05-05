import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
};

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const login = createAsyncThunk(
  "auth/login",
  async (options, { rejectWithValue }) => {
    const { email, password } = options;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1//user/login`,
        { email, password },
        config
      );
      console.log(data);
      const { user } = data;
      const { role } = user;
      const isAdmin = role === "admin" ? true : false;
      return { user, isAdmin };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (options, { rejectWithValue }) => {
    const { password, confirmPassword, id } = options;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/recover/${id}`,
        { confirmPassword, password },
        config
      );
      const { user } = data;
      const { role } = user;
      const isAdmin = role === "admin" ? true : false;
      return { user, isAdmin };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (options) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/user/logout`,
    { withCredentials: true }
  );
});

export const loadUser = createAsyncThunk("auth/loadUser", async (options) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_SERVER}/api/v1/user`,
    { withCredentials: true }
  );
  const { user } = data;
  const { role } = user;
  const isAdmin = role === "admin" ? true : false;
  return { user, isAdmin };
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      })
      .addCase(resetPassword.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      })
      .addCase(logout.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthenticated: false,
        };
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
        };
      });
  },
});

export default itemsSlice.reducer;
