import { useDispatch, useSelector } from "react-redux";
import {
    selectAllSearchedMovies,
    selectSearchedMoviesStatus,
    selectSearchedMoviesError,
} from "./searchedMoviesSlice";
import SearchedMovieExcerpt from "./SearchedMovieExcerpt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const SearchedMoviesList = () => {
    const movies = useSelector(selectAllSearchedMovies)
    console.log(movies)
    const searchedMoviesStatus = useSelector(selectSearchedMoviesStatus)
    const searchedMoviesError = useSelector(selectSearchedMoviesError)

    let content

    if (searchedMoviesStatus === 'loading') {
        content = (
            <FontAwesomeIcon className="spinner" icon={faSpinner} spinPulse />
        )
    } else if (searchedMoviesStatus === 'succeeded' && movies) {
        content = movies.map(movie => <SearchedMovieExcerpt key={movie.id} movie={movie} />)
    } else if (searchedMoviesError) {
        content = (
            <p>Something went wrong {searchedMoviesError}</p>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default SearchedMoviesList