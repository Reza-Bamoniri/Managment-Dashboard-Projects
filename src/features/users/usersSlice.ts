import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";


type UserState = {
    users: User[];
};


const initialState: UserState = {
    users: [],
};


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

        updateUser: (state, action:PayloadAction<User>) => {
             const index = state.users.findIndex(
                (user) => user.id === action.payload.id
            );

            if(index !== -1) {
                state.users[index] = action.payload;
            }
        },

        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        }
    },
});


export const {
    setUsers,
    addUser,
    updateUser,
    deleteUser
} = usersSlice.actions;

export default usersSlice.reducer;