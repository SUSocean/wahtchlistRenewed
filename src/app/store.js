import { configureStore } from "@reduxjs/toolkit";
import searchedMoviesReducer from '../features/searchedMovies/searchedMoviesSlice'
import savedMoviesReducer from "../features/savedMovies/savedMoviesSlice";
import { movieApi } from "../api/movieApi";

export const store = configureStore({
    reducer: {
        searchedMovies: searchedMoviesReducer,
        savedMovies: savedMoviesReducer,
        [movieApi.reducerPath]: movieApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
})