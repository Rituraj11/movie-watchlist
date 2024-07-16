import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CONSTANT } from "../../constants/constants";

export const initialState = {
    searchTerm: null,
    searchResults: null,
    selectedViewDetails: null,
    loading: false,
    error: null
}


export const searchMovies = createAsyncThunk('search/searchMovies', async (searchterm, { rejectWithValue }) => {
    try {
        const result = await axios({
            url: `${CONSTANT.MOVIE_API_ENDPOINT}/?apikey=${CONSTANT.MOVIE_API_KEY}&r=json&s=${searchterm || 'Chris'}`,
        });

        if(result?.data?.Response === 'False'){
            return rejectWithValue(result?.data?.Error)
        }

        return result?.data?.Search;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const viewDetails = createAsyncThunk('search/viewDetails', async (imdbId, { rejectWithValue }) => {
    try {
        const result = await axios({
            url: `${CONSTANT.MOVIE_API_ENDPOINT}/?apikey=${CONSTANT.MOVIE_API_KEY}&r=json&i=${imdbId}&plot=full`,
        });

        if(result?.data?.Response === 'False'){
            return rejectWithValue(result?.data?.Error)
        }

        return result?.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchError: (state, action) => {
            state.error = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedViewDetails: (state, action) => {
            state.selectedViewDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false;
                state.searchResults = null;
                state.error = action.payload;
            })

            .addCase(viewDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(viewDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedViewDetails = action.payload;
            })
            .addCase(viewDetails.rejected, (state, action) => {
                state.loading = false;
                state.selectedViewDetails = null;
                state.error = action.payload;
            })
    }
});

export const { setLoading, setSearchError, setSearchResults, setSearchTerm, setSelectedViewDetails } = searchSlice.actions;

export default searchSlice.reducer;