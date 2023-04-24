import { useParams } from "react-router-dom"
import { useGetMovieByIdQuery } from "../api/movieApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import {
    selectSavedMovies,
    movieToggled
} from "../features/savedMovies/savedMoviesSlice"
import { getSavedMovieById } from "../features/savedMovies/savedMoviesSlice"
import {
    faSpinner,
    faStar,
} from '@fortawesome/free-solid-svg-icons'
import { faBookmark as filledBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regularBookmar } from '@fortawesome/free-regular-svg-icons'

const SingleMoviePage = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { data, error, isLoading } = useGetMovieByIdQuery(id)
    const savedMovies = useSelector(selectSavedMovies)
    const [ishovered, setIsHovered] = useState(false)
    const isMovieSaved = Boolean(savedMovies.find(film => film.id == id))
    const handleClick = () => {
        const movie = {
            Title: data.Title,
            Poster: data.Poster,
            id: data.imdbID
        }
        let resultMovies
        let currentMovies = localStorage.movies
            ? JSON.parse(localStorage.getItem('movies'))
            : []
        if (isMovieSaved) {
            resultMovies = currentMovies.filter(film => film.id !== movie.id)
        } else {
            resultMovies = currentMovies
            resultMovies.push(movie)
        }
        dispatch(movieToggled(movie))
        localStorage.setItem("movies", JSON.stringify(resultMovies))
    }

    const saveIcon = <FontAwesomeIcon
        icon={isMovieSaved || ishovered ? filledBookmark : regularBookmar}
        className="single-movie-title-saveIcon"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleClick()}
    />


    let content
    if (isLoading) {
        content = <FontAwesomeIcon className="status-icon" icon={faSpinner} spinPulse />
    }
    if (data) {
        content = (
            <div className="single-movie-container">
                <div className="single-movie-title-wrapper">
                    <div className="single-movie-title-saveIcon-wrapper">
                        <h3 className="single-movie-title">
                            {data.Title}
                        </h3>
                        {saveIcon}
                    </div>
                    <div className="single-movie-data-wrapper">
                        {data.Released !== 'N/A' && <span >{data.Released} </span>}
                        {data.Runtime !== 'N/A' && <span>{data.Runtime} </span>}
                        {data.Rated !== 'N/A' && <span>{data.Rated}</span>}
                    </div>
                    {data.imdbRating !== 'N/A' && <div className="single-movie-raiting-wrapper">
                        <FontAwesomeIcon className="star-icon" icon={faStar} />
                        <span>{data.imdbRating}</span>
                    </div>}
                </div>
                {data.Poster !== 'N/A' &&
                    <img
                        className="single-movie-img"
                        alt={data.Title}
                        src={data.Poster}
                    />}
                <div className='single-movie-info'>
                    {data.Genre !== 'N/A' && <span
                        className='single-movie-info-genre'
                    >
                        {data.Genre}
                    </span>}
                    {data.Plot !== 'N/A' && <p className='single-movie-info-plot'>
                        {data.Plot}
                    </p>}
                    {data.Director !== 'N/A' && <div className='single-movie-other-info-wrapper'>
                        <span className='single-movie-other-info-name'>
                            Director
                        </span>
                        <span className='single-movie-other-info-data'>{data.Director}</span>
                    </div>}
                    {data.Writer !== 'N/A' && <div className='single-movie-other-info-wrapper'>
                        <span className='single-movie-other-info-name'>
                            Writers
                        </span>
                        <span className='single-movie-other-info-data'>{data.Writer}</span>
                    </div>}
                    {data.Actors !== 'N/A' && <div className='single-movie-other-info-wrapper'>
                        <span className='single-movie-other-info-name'>
                            Stars
                        </span>
                        <span className='single-movie-other-info-data'>{data.Actors}</span>
                    </div>}
                </div>
            </div>
        )
    }
    if (error) {
        <div>
            <p>something went wrong</p>

        </div>
    }

    return (
        <>
            {content}
        </>
    )
}

export default SingleMoviePage