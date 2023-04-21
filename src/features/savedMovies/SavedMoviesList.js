import { useSelector } from "react-redux"
import { selectSavedMovies } from "./savedMoviesSlice"
import SearchedMovieExcerpt from "../searchedMovies/SearchedMovieExcerpt"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

const SavedMoviesList = () => {

    const movies = useSelector(selectSavedMovies)
    let content
    content = movies.length > 0 ?
        movies.map(film => <SearchedMovieExcerpt movie={film} key={film.id} />)
        :
        <>
            <span className="status-error">You Don't Have Any Movies Saved</span>
            <span className="status-error">Let's Find Aome</span>
            <Link className="find-icon-link" to='/'>
                <FontAwesomeIcon className="status-icon MagnifyingGlass" icon={faMagnifyingGlass} />
            </Link>

        </>


    return (
        <>
            <div className="page-list">
                {content}
            </div>
        </>
    )
}

export default SavedMoviesList