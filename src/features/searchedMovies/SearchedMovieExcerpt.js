import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as filledBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regularBookmar } from '@fortawesome/free-regular-svg-icons'
import { movieToggled } from "../savedMovies/savedMoviesSlice"
import { useDispatch } from "react-redux"
import { selectSavedMovies } from "../savedMovies/savedMoviesSlice"
import { useSelector } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"

const SearchedMovieExcerpt = ({ movie }) => {
    const width = window.innerWidth
    const dispatch = useDispatch()
    const savedMovies = useSelector(selectSavedMovies)
    const [ishovered, setIsHovered] = useState(false)
    const isMovieSaved = Boolean(savedMovies.find(film => film.id == movie.id))
    const saveIcon = <
        FontAwesomeIcon className={`save-icon ${ishovered || isMovieSaved || width < 780 ? '' : 'visually-hidden'}`}
        icon={isMovieSaved ? filledBookmark : regularBookmar}
        onClick={() => {
            let resultMovies
            let currentMovies = localStorage.movies ? JSON.parse(localStorage.getItem('movies')) : []
            if (isMovieSaved) {
                resultMovies = currentMovies.filter(film => film.id !== movie.id)
            } else {
                resultMovies = currentMovies
                resultMovies.push(movie)
            }
            dispatch(movieToggled(movie))
            localStorage.setItem("movies", JSON.stringify(resultMovies))
        }}
    />

    return (
        <>
            <div className="movie-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <Link
                    to={`/movie/${movie.id}`}
                    className="movie-card-link"

                >
                    <img
                        className="movie-card--img"
                        src={movie.Poster}
                        alt={movie.Title ? `${movie.Title}` : 'movie poster'
                        } />
                    <h3 className="movie-card--title">{movie.Title}</h3>
                </Link>
                {saveIcon}
            </div>
        </>
    )
}

export default SearchedMovieExcerpt