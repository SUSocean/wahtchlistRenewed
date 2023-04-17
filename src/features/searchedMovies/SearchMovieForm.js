import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./searchedMoviesSlice";

const SearchMovieForm = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const onMoviesClicked = () => {
        dispatch(fetchMovies({ movie: input }))
    }

    return (
        <form className="searchMovieForm">
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="search movie"
            />
            <button
                type="button"
                onClick={onMoviesClicked}
            >Search!
            </button>
        </form>
    )
}

export default SearchMovieForm