import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../features/searchedMovies/searchedMoviesSlice'

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
})