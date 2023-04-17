import { useDispatch, useSelector } from "react-redux";
import {
    selectAllSearchedMovies,
    selectSearchedMoviesStatus,
    selectSearchedMoviesError,
} from "./searchedMoviesSlice";
import SearchedMovieExcerpt from "./SearchedMovieExcerpt";

const SearchedMoviesList = () => {
    const movies = useSelector(selectAllSearchedMovies)
    console.log(movies)
    const searchedMoviesStatus = useSelector(selectSearchedMoviesStatus)
    const searchedMoviesError = useSelector(selectSearchedMoviesError)

    let content

    if (searchedMoviesStatus === 'loading') {
        content = (
            <p>Loading...</p>
        )
    } else if (searchedMoviesStatus === 'succeeded' && movies) {
        content = movies.map(movie => <SearchedMovieExcerpt key={movie.id} movie={movie} />)
    } else if (searchedMoviesError) {
        content = (
            <p>Something went wrong {searchedMoviesError.mesesage}</p>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default SearchedMoviesList