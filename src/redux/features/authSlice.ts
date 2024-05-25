
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuthenticated: boolean;
  username: string;
};

type LoginPayload = {
  isAuthenticated: boolean;
  username: string;
};

let initialState: Auth = {
  isAuthenticated: false,
  username: "",
};



export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      return state;
    },
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.username = action.payload.username
      return state;
    },
    logout: () => {
      return initialState;
    },
    isAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      return state;
    },
  },
});

export const { login, logout, isAuthenticated, addUsername } = authSlice.actions;

export default authSlice.reducer;