
import { UserType } from "@/src/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



type Auth = {
  isAuthenticated: boolean;
  user: UserType | null;
};

type LoginPayload = {
  isAuthenticated: boolean;
  user: UserType | null;
};

let initialState: Auth = {
  isAuthenticated: false,
  user: null,
};



export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addUserProfile: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.icon) {
        state.user.icon = action.payload;
      }
      return state;
    },
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      console.log(action.payload.user)
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

export const { login, logout, isAuthenticated, addUserProfile } = authSlice.actions;

export default authSlice.reducer;