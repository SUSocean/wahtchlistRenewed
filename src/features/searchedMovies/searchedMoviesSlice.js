import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const moviesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.Year.localeCompare(a.Year)
})

const initialState = moviesAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
})

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ movie }) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=4ddaaf68&s=${movie}`)
    return response.data
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedMovies = action.payload.Search.map(movie => {
                    movie.id = movie.imdbID
                    return movie;
                });
                moviesAdapter.upsertMany(state, loadedMovies)
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {
    selectAll: selectAllMovies,
    selectById: selectMoviesById,
    selectIds: selectMoviesIds
} = moviesAdapter.getSelectors(state => state.movies)

export default moviesSlice.reducer