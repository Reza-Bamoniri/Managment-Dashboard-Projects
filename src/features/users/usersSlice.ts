import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from "../../services/userService";

type UsersState = {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

// GET /users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const users = await getUsers();
    return users;
  }
);

// GET /users/:id
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: string) => {
    const user = await getUserById(id);
    return user;
  }
);

// POST /users
export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async (user: Omit<User, "id">) => {
    const newUser = await createUser(user);
    return newUser;
  }
);

// PUT /users/:id
export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async ({
    id,
    user,
  }: {
    id: string;
    user: Omit<User, "id">;
  }) => {
    const updatedUser = await updateUserApi(id, user);
    return updatedUser;
  }
);

// DELETE /users/:id
export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    await deleteUserApi(id);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      })

      // Fetch User By ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })

      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch user";
      })

      // Create User
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })

      .addCase(createUserThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create user";
      })

      // Update User
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(updateUserThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update user";
      })

      // Delete User
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user.id !== action.payload
        );
      })

      .addCase(deleteUserThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete user";
      });
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;