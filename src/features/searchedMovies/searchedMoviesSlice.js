import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const searchedMoviesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.Year.localeCompare(a.Year)
})

const initialState = searchedMoviesAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
})

export const fetchMovies = createAsyncThunk('searchedMovies/fetchMovies', async ({ movie }) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=4ddaaf68&s=${movie}`)
    return response.data
})

const searchedMoviesSlice = createSlice({
    name: 'searchedMovies',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log(action.payload)
                const loadedMovies = action.payload.Search.map(movie => {
                    movie.id = movie.imdbID
                    movie.saved = false
                    return movie;
                });
                searchedMoviesAdapter.upsertMany(state, loadedMovies)
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {
    selectAll: selectAllSearchedMovies,
    selectById: selectSearchedMoviesById,
    selectIds: selectSearchedMoviesIds
} = searchedMoviesAdapter.getSelectors(state => state.searchedMovies)

export const selectSearchedMoviesStatus = (state) => state.searchedMovies.status
export const selectSearchedMoviesError = (state) => state.searchedMovies.error

export default searchedMoviesSlice.reducer