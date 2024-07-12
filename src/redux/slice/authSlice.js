import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: null,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;