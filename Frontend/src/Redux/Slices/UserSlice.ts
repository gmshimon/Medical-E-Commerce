import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
    photo: object;
    role: string;
}

// Define the initial state interface
interface UserState {
    userInfo: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userInfo: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        setUser(state, action: PayloadAction<User>) {
            state.userInfo = action.payload;
        },
    }
})