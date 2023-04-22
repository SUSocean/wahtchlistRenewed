import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.movies ? JSON.parse(localStorage.getItem('movies')) : []

const savedMoviesSlice = createSlice({
    name: 'savedMovies',
    initialState,
    reducers: {
        movieToggled(state, action) {
            const currentMovie = action.payload
            if (!state.find(movie => movie.id == currentMovie.id)) {
                state.push(currentMovie)
            } else {
                return state.filter(movie => movie.id !== currentMovie.id)
            }
        }
    }
})

export const { movieToggled } = savedMoviesSlice.actions

export const selectSavedMovies = (state) => state.savedMovies

export default savedMoviesSlice.reducer