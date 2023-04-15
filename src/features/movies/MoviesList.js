import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectAllMovies } from "./moviesSlice";

const MoviesList = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const onMoviesClicked = () => {
        dispatch(fetchMovies({ movie: input }))
    }

    const movies = useSelector(selectAllMovies)
    console.log(movies)

    return (
        <>
            <h2>Movies List Component</h2>
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
        </>
    )
}

export default MoviesList