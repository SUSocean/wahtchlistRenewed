import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const searchedMoviesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.Year.localeCompare(a.Year)
})

const initialState = searchedMoviesAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    totalpages: 0,
    currentPage: 1,
    query: null
})

export const fetchMovies = createAsyncThunk('searchedMovies/fetchMovies', async ({ movie, page }) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=4ddaaf68&s=${movie}&page=${page}`)
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
                state.query = ''
                state.totalpages = 0
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                if (action.payload.Response === 'False') {
                    state.status = 'failed'
                    state.error = action.payload.Error
                    state.query = ''
                    state.totalpages = 0
                    return
                }
                state.status = 'succeeded'
                state.totalpages = Number(Math.ceil(action.payload.totalResults / 10))
                state.currentPage = action.meta.arg.page
                state.query = action.meta.arg.movie
                const loadedMovies = action.payload.Search.map(movie => {
                    movie.id = movie.imdbID
                    return movie;
                });
                searchedMoviesAdapter.setAll(state, loadedMovies)
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.query = ''
                state.totalpages = 0
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
export const selectSearchedMoviesTotalPages = (state) => state.searchedMovies.totalpages
export const selectSearchedMoviesQuery = (state) => state.searchedMovies.query
export const selectSearchedMoviesCurrentPage = (state) => state.searchedMovies.currentPage

export default searchedMoviesSlice.reducer