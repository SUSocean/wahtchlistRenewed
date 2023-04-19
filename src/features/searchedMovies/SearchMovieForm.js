import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectSearchedMoviesStatus } from "./searchedMoviesSlice";

const SearchMovieForm = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const status = useSelector(selectSearchedMoviesStatus)
    const handleSubmit = () => {
        dispatch(fetchMovies({ movie: input, page: 1 }))
    }

    const canClick = Boolean(input) && Boolean(status)

    return (
        <form
            className="searchMovieForm"
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
        >
            <input
                className="searchMovieForm--input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="search movie"
            />
            <button
                className="searchMovieForm--button"
                disabled={!canClick}
            >Search
            </button>
        </form>
    )
}

export default SearchMovieForm