import SearchMovieForm from "./SearchMovieForm";
import SearchedMoviesList from "./SearchedMoviesList";
// import { selectAllSearchedMovies } from "./searchedMoviesSlice";
// import { useSelector } from "react-redux";

const SearhedMoviesPage = () => {

    // const searchedMovies = useSelector(selectAllSearchedMovies)
    return (
        <>
            {/* <SearchMovieForm /> */}
            <SearchedMoviesList />
        </>
    )
}

export default SearhedMoviesPage