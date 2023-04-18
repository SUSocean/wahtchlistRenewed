import SearchedMoviesList from "./SearchedMoviesList";
// import { selectSearchedMoviesTotalResult, selectSearchedMoviesQuery } from "./searchedMoviesSlice";
// import { useSelector } from "react-redux";
// import { fetchPage } from "./searchedMoviesSlice";
// import { useDispatch } from "react-redux";

const SearhedMoviesPage = () => {
    // const dispatch = useDispatch()
    // const handleClick = () => {
    //     dispatch(fetchPage(index, page))
    // }
    // const querie = useSelector(selectSearchedMoviesQuery)
    // const pages = useSelector(selectSearchedMoviesTotalResult)
    // const pageSelector = [...Array(pages)].map (add every page a click function to fetchPages, think how to make it 1-10... may be move it to separate file)
    return (
        <>
            {/* {pageSelector} */}
            <SearchedMoviesList />
        </>
    )
}

export default SearhedMoviesPage