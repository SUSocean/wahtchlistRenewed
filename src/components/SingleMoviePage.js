import { useParams } from "react-router-dom"
import { useGetMovieByIdQuery } from "../api/movieApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faStar } from '@fortawesome/free-solid-svg-icons'

const SingleMoviePage = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetMovieByIdQuery(id)
    let content
    if (isLoading) {
        content = <FontAwesomeIcon className="status-icon" icon={faSpinner} spinPulse />
    }
    if (data) {
        content = (
            <div className="single-movie-container">
                <div className="single-movie-title-wrapper">
                    <h3 className="single-movie-title">
                        {data.Title}
                    </h3>
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