import { useSelector } from "react-redux";
import {
    selectAllSearchedMovies,
    selectSearchedMoviesStatus,
    selectSearchedMoviesError,
} from "./searchedMoviesSlice";
import SearchedMovieExcerpt from "./SearchedMovieExcerpt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


const SearchedMoviesList = () => {
    const movies = useSelector(selectAllSearchedMovies)
    const searchedMoviesStatus = useSelector(selectSearchedMoviesStatus)
    const searchedMoviesError = useSelector(selectSearchedMoviesError)
    let content

    if (searchedMoviesStatus === 'loading') {
        content = (
            <FontAwesomeIcon className="status-icon" icon={faSpinner} spinPulse />
        )
    } else if (searchedMoviesStatus === 'succeeded' && movies) {
        content = movies.map(movie => <SearchedMovieExcerpt key={movie.id} movie={movie} />)
    } else if (searchedMoviesError) {
        content = (
            <>
                <FontAwesomeIcon className="status-icon" icon={faCircleXmark} />
                <p className="status-error">{searchedMoviesError}</p>
            </>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default SearchedMoviesList