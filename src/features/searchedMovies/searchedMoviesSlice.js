import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const searchedMoviesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.Year.localeCompare(a.Year)
})

const initialState = searchedMoviesAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    totalpages: 0,
    query: null
})

export const fetchMovies = createAsyncThunk('searchedMovies/fetchMovies', async ({ movie }) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=4ddaaf68&s=${movie}`)
    return response.data
})

export const fetchPage = createAsyncThunk('searchedMovies/fetchPage', async ({ query, page }) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=4ddaaf68&s=${query}page=${page}`)
    return response.data
})

const searchedMoviesSlice = createSlice({
    name: 'searchedMovies',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetchMovies
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.totalpages = Number(Math.ceil(action.payload.totalResults / 10))
                console.log(action.payload.totalResults)
                state.query = action.meta.arg.movie
                const loadedMovies = action.payload.Search.map(movie => {
                    movie.id = movie.imdbID
                    movie.saved = false
                    return movie;
                });
                searchedMoviesAdapter.setAll(state, loadedMovies)
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // fetch page
            .addCase(fetchPage.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPage.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedMovies = action.payload.Search.map(movie => {
                    movie.id = movie.imdbID
                    movie.saved = false
                    return movie;
                });
                searchedMoviesAdapter.setAll(state, loadedMovies)
            })
            .addCase(fetchPage.rejected, (state, action) => {
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
export const selectSearchedMoviesTotalResult = (state) => state.searchedMovies.totalpages
export const selectSearchedMoviesQuery = (state) => state.searchedMovies.query

export default searchedMoviesSlice.reducer