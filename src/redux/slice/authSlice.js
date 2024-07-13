import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isModalOpen: false,
    modalFormName: 'Login',
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
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },
        setModalFormName: (state, action) => {
            state.modalFormName = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setLoading, setIsModalOpen, setModalFormName, setUser, setAuthError } = authSlice.actions;

export default authSlice.reducer;