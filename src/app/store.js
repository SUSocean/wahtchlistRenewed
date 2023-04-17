import { configureStore } from "@reduxjs/toolkit";
import searchedMoviesReducer from '../features/searchedMovies/searchedMoviesSlice'

export const store = configureStore({
    reducer: {
        searchedMovies: searchedMoviesReducer
    }
})