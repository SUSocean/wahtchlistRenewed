import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const movieApi = createApi({
    reducerPath: 'movie',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    endpoints: (builder) => ({
        getMovieById: builder.query({
            query: (id) => `?apikey=4ddaaf68&i=${id}`
        })
    })
})

export const { useGetMovieByIdQuery } = movieApi