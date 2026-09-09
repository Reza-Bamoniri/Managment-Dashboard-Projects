import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import { loginUser } from "../../services/userService";


type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  loading: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const user = await loginUser(email, password);

    if (!user) {
      return rejectWithValue("Invalid email or password");
    }

    return user;
  }
);

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
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userId = action.payload.id;
      })

      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userId = null;
        state.error =
          (action.payload as string) || "Login failed";
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;