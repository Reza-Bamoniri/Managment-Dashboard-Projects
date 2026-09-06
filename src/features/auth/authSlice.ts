import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userId = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;