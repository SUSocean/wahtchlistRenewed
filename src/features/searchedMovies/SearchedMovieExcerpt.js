const SearchedMovieExcerpt = ({ movie }) => {
    return (
        <div className="movie-card">
            <img
                className="movie-card--img"
                src={movie.Poster}
                alt={movie.Title ? `${movie.Title}` : 'movie poster'
                } />
            <h3 className="movie-card--title">{movie.Title}</h3>
        </div>
    )
}

export default SearchedMovieExcerpt